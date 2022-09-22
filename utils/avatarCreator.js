export const createUserAvatar = (req, user) => {
  const protocol = req.protocol;
  const host = req.hostname;
  const port = process.env.PORT;

  if (user.picture) {
    avatarUrl = `${protocol}://${host}:${port}/images/${user.picture}`;
    return avatarUrl;
  } else return "";
};
