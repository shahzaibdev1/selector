export const messages = {
  WRONG_CREDENTIALS: "WRONG_CREDENTIALS",
  INVALID_INPUT: "INVALID_INPUT",
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
  SOMETHING_WENT_WRONG: "SOMETHING_WENT_WRONG",
};

export const errorGenerator = (type, res, message, status) => {
  if (message) {
    res.status(status).json({ error: { message, type } });
    return true;
  }

  switch (type) {
    case 500:
      return res
        .status(500)
        .send({ error: { message: "Something went wrong!", type } });

    case messages.WRONG_CREDENTIALS:
      return res
        .status(500)
        .send({ error: { message: "Invalid Input!", type } });
  }

  return false;
};
