//Schema's
import Joi from "joi";

export const signUpSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "co"] } })
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])?(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])?.{6,}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be greater then 8 letter and must contain at least one lowercase, one uppercase, one special character and one digit",
    }),

  confirmPassword: Joi.string()
    .equal(Joi.ref("password"))
    .messages({ "string.all": "{{#label}} does not match" })
    .required()
    .label("Confirm password"),
});

export const signInSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "co"] } })
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])?(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])?.{6,}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "New Password must be greater then 8 letter and must contain at least one lowercase, one uppercase, one special character and one digit",
    }),
});

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),

  newPassword: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "New Password must be greater then 8 letter and must contain at least one lowercase, one uppercase, one special character and one digit",
    }),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "co"] } })
    .required(),
});

export const verifyRecoverySchema = Joi.object({
  key: Joi.string().required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "New Password must be greater then 8 letter and must contain at least one lowercase, one uppercase, one special character and one digit",
    }),
  confirmPassword: Joi.string()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .options({ messages: { "string.ref": "{{#label}} does not match" } }),
});

export const validatePagetypeInput = ({ pageType, country }) => {
  const errors = {};
  console.log(pageType);
  console.log(country);

  // Validate name
  if (!pageType || pageType.trim() === "") {
    errors.pageType = "PageType shouldn't be empty";
  }

  if (!country || country.trim() === "") {
    errors.country = "Country shouldn't be empty";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
    values: { pageType, country },
  };
};

export const validateCountryInput = ({ countryCode, country, marketplace }) => {
  const errors = {};

  // Validate name
  if (!countryCode || countryCode.trim() === "") {
    errors.countryCode = "Code shouldn't be empty";
  }

  if (!country || country.trim() === "") {
    errors.country = "Country shouldn't be empty";
  }

  if (!marketplace || marketplace.trim() === "") {
    errors.marketplace = "Marketplace shouldn't be empty";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
    values: { countryCode, country, marketplace },
  };
};

export const validateMarketplaceInput = ({ marketplace, url }) => {
  const errors = {};

  // Validate name
  if (!url || url.trim() === "") {
    errors.url = "URL shouldn't be empty";
  }

  if (!marketplace || marketplace.trim() === "") {
    errors.marketplace = "Marketplace shouldn't be empty";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
    values: { url, marketplace },
  };
};

export const validateSelectorsInput = ({
  marketplace,
  country,
  pageType,
}) => {
  const errors = {};

  if (!marketplace || marketplace.trim() === "") {
    errors.marketplace = "Marketplace shouldn't be empty";
  }

  // if (!selectorName || selectorName.trim() === "") {
  //     errors.selectorName = "selectorName shouldn't be empty";
  // }

  // if (!selector || selector.trim() === "") {
  //     errors.selector = "Selector shouldn't be empty";
  // }

  if (!country || country.trim() === "") {
    errors.country = "Country shouldn't be empty";
  }

//   if (!pageType || pageType.trim() === "") {
//     errors.pageType = "PageType shouldn't be empty";
//   }

  // if (!nodeType || nodeType.trim() === "") {
  //     errors.nodeType = "nodeType shouldn't be empty";
  // }

  // if (!nodeValue || nodeValue.trim() === "") {
  //     errors.nodeValue = "nodeValue shouldn't be empty";
  // }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
    values: {
      marketplace,
      country,
      pageType,
    //   selectorName,
    //   selector,
    //   nodeType,
    //   nodeValue,
    },
  };
};
