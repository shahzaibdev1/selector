import bcrypt from "bcryptjs";

import User from "../models/User.js";
import { errorGenerator, messages } from "../utils/errors.js";
import { signUpSchema } from "../validators/authValidator.js";
import { generateToken } from "../utils/user.js";
import { stripe } from "../stripe.js";
import { roles } from "../middlewares/authMiddleware.js";

/**
 * @route  POST /api/v1/admin/add-user
 * @desc   Registers new user by adming
 * @access Super Private
 **/
export const addSubAdmin = async (req, res) => {
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
      role: roles.subAdmin,
    });

    let user = { ...result?._doc, role: roles.subAdmin, password: undefined };
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
    console.log(customer);
    result.stripe.customerId = customer.id;
    result.save();
  } catch (error) {
    console.log(error);
    // res.status(500).send({ error: { message: error.message } });
    return errorGenerator("INTERNAL_ERROR", res, error.message, 500);
  }
};
