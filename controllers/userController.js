import fs from "fs";
import bcrypt from "bcryptjs";

import { singleImageUpload } from "../utils/diskStorage.js";
import User from "../models/User.js";
import { createUserAvatar } from "../utils/avatarCreator.js";
import { generateToken, verifyPass } from "../utils/user.js";
import { errorGenerator, messages } from "../utils/errors.js";
import {
  forgotPasswordSchema,
  signInSchema,
  signUpSchema,
} from "../validators/authValidator.js";
import { sendMail } from "../utils/mail.js";
import jwt from "jsonwebtoken";
import { PRIVATE_KEY, randomNum, SMTP_EMAIL } from "../utils/config.js";
import { stripe } from "../stripe.js";

let profileImageUpload = singleImageUpload.fields([
  { name: "profileImage", maxCount: 1 },
]);

/**
 * @route POST /api/v1/auth/user/verify-login
 * @desc  Verifies Login for 2FA
 * @access Public
 **/
export const getProfile = async (req, res) => {
  try {
    const authUser = req.authUser;

    const user = await User.findById(authUser.userId);

    if (!user) {
      return res.status(404).send({ error: { message: "User not found" } });
    }

    return res.json({ data: user });
  } catch (error) {
    return res.status(500).json({ error: { message: error.message } });
  }
};

/**
 * @route  POST /api/v1/auth/user/sign-up
 * @desc   Registers new user
 * @access Public
 **/
export const signUpUser = async (req, res) => {
  //Validation
  let { error, value } = signUpSchema.validate(req.body);
  if (error)
    return errorGenerator(messages.INVALID_INPUT, res, error.message, 400);

  try {
    const { email, password } = value;

    // Check if a user with this email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return errorGenerator(
        messages.USER_ALREADY_EXISTS,
        res,
        "User Already Exists",
        400
      );
    }

    // Generate Hashed password with salt
    let salt = await bcrypt.genSalt(15);
    let hashedPassword = await bcrypt.hash(password, salt);

    if (!hashedPassword) {
      if (errorGenerator("INTERNAL_ERROR", 500, res)) return null;
    }

    // Create a new User
    const result = await User.create({
      ...value,
      password: hashedPassword,
    });

    let user = { ...result?._doc, role: "user", password: undefined };
    if (!user) {
      if (errorGenerator("INTERNAL_ERROR", 500, res)) return null;
    }

    // Generate OTP for verify email
    let jwtToken = generateToken(user, "user");

    res.status(201).json({
      user: user,
      jwtToken,
    });

    let customer = await stripe.customers.create({
      description: "Company customer",
      email: result.email,
    });

    result.stripe.customerId = customer.id;
    return result.save();
  } catch (error) {
    // res.status(500).send({ error: { message: error.message } });
    return errorGenerator("INTERNAL_ERROR", res, error.message, 500);
  }
};

// /**
//  * @route  POST /api/v1/auth/user/verify-email
//  * @desc   Verifies user after sign up
//  * @access Public
//  **/
// export const verifyEmail = async (req, res) => {
//   const { token } = req.body;

//   try {
//     // Validate the token
//     const decodedToken = jwt.verify(token, PRIVATE_KEY);
//     // Find the user with user id in token
//     const userProfile = await TempUser.findById(decodedToken?.userId).select(
//       "+password"
//     );

//     if (!userProfile) {
//       return res
//         .status(400)
//         .send({ error: { message: "User is unauthorized" } });
//     }

//     // If everything's correct, Create a new User
//     const { firstName, lastName, email, timezoneId, password } = userProfile;
//     const result = await User.create({
//       firstName,
//       lastName,
//       email,
//       timezoneId,
//       password,
//     });

//     let user = { ...result?._doc, role: "organizer" };

//     // If the user is created, delete the Temp user
//     if (result) {
//       userProfile.delete();
//     }

//     // Jwt token is created and sent
//     let jwtToken = jwt.sign({ userId: user?._id }, PRIVATE_KEY, {
//       expiresIn: "24h",
//       algorithm: "HS512",
//     });

//     res.send({
//       message: "User is verified successfully",
//       jwtToken,
//     });
//   } catch (error) {
//     res.status(500).send({ error: { message: error.message } });
//   }
// };

/**
 * @route POST /api/v1/auth/user/sign-in
 * @desc  Login the user
 * @access Public
 **/
export const getUser = async (req, res) => {
  try {
    const { userId } = req.authUser;

    // Check if the user exists with given email
    const checkUser = await User.findById(userId);

    if (!checkUser) {
      if (errorGenerator(messages.WRONG_CREDENTIALS, res)) return null;
    }

    return res.status(200).send({ checkUser });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

/**
 * @route POST /api/v1/auth/user/sign-in
 * @desc  Login the user
 * @access Public
 **/
export const signInUser = async (req, res) => {
  // Validation
  let { error, value } = signInSchema.validate(req.body);
  if (error)
    return errorGenerator("WRONG_CREDENTIALS", res, error.message, 400);

  try {
    const { email, password } = value;

    // Check if the user exists with given email
    const checkUser = await User.findOne({ email }).select("+password");

    if (!checkUser) {
      if (errorGenerator(messages.WRONG_CREDENTIALS, res)) return null;
    }

    // Validate password
    const isMatch = await verifyPass(checkUser._doc, password);
    if (!isMatch) {
      if (errorGenerator(messages.WRONG_CREDENTIALS, res)) return null;
    }

    let user = { ...checkUser._doc, password: null };

    // Generate proper picture url
    let picture = createUserAvatar(req, user);

    const token = generateToken(checkUser._id, checkUser.role);

    return res
      .status(200)
      .send({ data: { user: { ...user, picture }, token } });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// /**
//  * @route POST /api/v1/auth/user/verify-login
//  * @desc  Verifies Login for 2FA
//  * @access Public
//  **/
// export const verifyLogin = async (req, res) => {
//   const { token } = req.body;
//   try {
//     const protocol = req.protocol;
//     const host = req.hostname;
//     const port = process.env.PORT;

//     const decodedToken = jwt.verify(token, PRIVATE_KEY);
//     const user = await User.findById(decodedToken.userId, "-__v");
//     if (!user)
//       return res
//         .status(403)
//         .send({ error: { message: "Could not find user with this token" } });

//     if (decodedToken) {
//       let avatarUrl = "";
//       if (user.picture) {
//         avatarUrl = `${protocol}://${host}:${port}/images/${user.picture}`;
//       }

//       let fullAccount = { ...user._doc, role: "organizer" };

//       let jwtToken = jwt.sign(
//         { userId: user?._id, role: "organizer" },
//         PRIVATE_KEY,
//         {
//           expiresIn: "24h",
//           algorithm: "HS512",
//         }
//       );

//       return res.send({
//         data: { user: { ...fullAccount, picture: avatarUrl }, jwtToken },
//       });
//     } else {
//       return res.send({ error: { message: "Invalid token" } });
//     }
//   } catch (error) {
//     res.status(500).send({ error: { message: error.message } });
//   }
// };

/**
 * @route POST /api/v1/auth/user/forget-password
 * @desc  Forgot password
 * @access Public
 **/
export const forgetPassword = async (req, res) => {
  let { error } = forgotPasswordSchema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    let otp = randomNum(100000, 999999);

    if (user) {
      let key = jwt.sign({ userId: user._id, otp }, PRIVATE_KEY, {
        expiresIn: "2h",
        algorithm: "HS512",
      });

      user.otp = otp;
      user.save();
      setTimeout(() => {
        user.otp = undefined;
        user.save();
      }, 200000);

      let url = `http://localhost:3000/verify-key?key=${key}`;
      sendMail({
        from: `"Technisia" <${SMTP_EMAIL}>`, // sender address
        to: email, // list of receivers
        subject: "Reset your password", // Subject line
        html: `<div><h3>This is your verification key </h3><a>${url}</a></div>`, // html body
      });

      return res.send({
        data: { message: "Email is  sent to your email address" },
      });
    } else {
      return res
        .status(400)
        .send({ error: { message: "User not found with this email address" } });
    }
  } catch (error) {
    return res.status(500).send({ error: { message: error.message } });
  }
};

/**
 * @route POST /api/v1/auth/user/recover-password
 * @desc  Recover password
 * @access Public
 **/
export const recoverPassword = async (req, res) => {
  const { key, password } = req.body;

  const { error } = verifyRecoverySchema.validate(req.body);
  if (error) return res.status(400).send({ error: { message: error.message } });
  else {
    try {
      // validate jwt token and Decode it
      let decoded = jwt.verify(key, PRIVATE_KEY);

      // If the token is valid change the user
      if (decoded) {
        let salt = await bcrypt.genSalt(15);
        let hashedPassword = await bcrypt.hash(password, salt);
        if (!hashedPassword)
          return res
            .status(500)
            .send({ error: { message: "Something went wrong!" } });

        const user = await User.findByIdAndUpdate(
          decoded.userId,
          { password: hashedPassword },
          { new: true }
        ).select("+password");

        if (user) {
          user.otp = undefined;
          await user.save();
          return res.send({ message: "Password changed successfully" });
        } else
          return res
            .status(400)
            .send({ error: { message: "Key is not valid" } });
      } else
        return res.status(400).send({ error: { message: "Key is expired" } });
    } catch (error) {
      return res
        .status(500)
        .send({ error: { message: "Something went wrong." } });
    }
  }
};

// /**
//  * @route POST /api/v1/auth/user/edit-profile
//  * @desc  Edit profile
//  * @access Private
//  **/
// export const updateProfile = async (req, res) => {
//   try {
//     const authUser = checkAuth(req.headers.authorization);
//     const protocol = req.protocol;
//     const host = req.hostname;
//     const port = process.env.PORT;

//     const {
//       firstName,
//       lastName,
//       email,
//       timezoneId,
//       isEmailTwoStepAuthenticate,
//     } = req.body;

//     let validEmail = Joi.string().email();

//     const profile = await User.findById(authUser.userId);

//     if (!profile)
//       return res.status(401).send({ error: { message: "profile not found" } });

//     if (firstName && firstName?.trim?.() !== "") {
//       profile.firstName = firstName.trim();
//     }

//     if (lastName && lastName.trim?.() !== "") {
//       profile.lastName = lastName.trim();
//     }

//     if (email && !Boolean(validEmail.validate(email)?.error)) {
//       profile.email = email;
//     }

//     if (timezoneId) {
//       profile.timezoneId = timezoneId;
//     }

//     let avatarUrl = "";
//     if (req.file) {
//       if (profile.picture) {
//         await fs.unlink("./public/images/" + profile.picture, () => {});
//       }
//       avatarUrl = `${protocol}://${host}:${port}/images/${profile.picture}`;
//       profile.picture = req.file.filename;
//     }

//     if (isEmailTwoStepAuthenticate || isEmailTwoStepAuthenticate === false) {
//       profile.isEmailTwoStepAuthenticate = isEmailTwoStepAuthenticate;
//     }

//     profile.save();

//     return res.send({ ...profile._doc, picture: avatarUrl });
//   } catch (error) {
//     return res.send({ error: { message: error.message } });
//   }
// };

// /**
//  * @route POST /api/v1/auth/user/change-password
//  * @desc  Change password
//  * @access Private
//  **/
// export const changePassword = async (req, res) => {
//   try {
//     const authUser = req.authUser;
//     const { currentPassword, newPassword } = req.body;
//     const { error } = changePasswordSchema.validate(req.body);

//     if (error) {
//       return res.status(400).send({ error: { message: error.message } });
//     }

//     const user = await User.findById(authUser.userId).select("+password");

//     if (!user) {
//       return res.status(401).send({ error: { message: "Unauthenticated" } });
//     }

//     const verifyPass = await comparePassword(currentPassword, user.password); // compare current password against db password

//     if (!verifyPass) {
//       return res
//         .status(401)
//         .send({ error: { message: "Password does not match" } });
//     }

//     let salt = await bcrypt.genSalt(15);
//     let hashedPassword = await bcrypt.hash(newPassword, salt); // make hash of new password

//     user.password = hashedPassword; // set new password
//     await user.save();

//     return res.send({ message: "password changed successfully" });
//   } catch (error) {
//     return res
//       .status(500)
//       .send(
//         error?.message
//           ? { error: { message: error.message } }
//           : { error: { message: "Something went wrong." } }
//       );
//   }
// };

/**
 * @route Delete /api/v1/auth/user/delete-account
 * @desc  Delete Account
 * @access Private
 **/
export const deleteAccount = async (req, res) => {
  try {
    const authUser = req.authUser;
    const { password } = req.body;

    const user = await User.findById(authUser.userId).select("+password");

    if (user) {
      const pass = await comparePassword(password, user.password);
      if (pass?.isValid) {
        let deleteUser = await user.delete();
        if (deleteUser) {
          if (deleteUser.picture) {
            await fs.unlink("./public/images/" + profile.picture, () => {});
          }

          return res.status(200).send({
            message: "user deleted successfully",
            user: { ...deleteUser._doc, password: null },
          });
        }
        return res
          .status(404)
          .send({ error: { message: "Could not delete user" } });
      } else {
        return res.status(401).send({ error: { message: "Invalid password" } });
      }
    }

    return res.status(401).send({ error: { message: "Invalid password" } });
  } catch (error) {
    return res.status(500).send({ error: { message: error.message } });
  }
};
