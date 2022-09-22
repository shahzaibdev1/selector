import checkAuth from "../utils/checkAuth.js";

export const roles = {
  admin: "admin",
  subAdmin: "sub-admin",
  user: "user",
};

const authMiddleware = (mainRoles = []) => {
  // mainRoles param can be a single role string (e.g. Role.User or 'User')
  // or an array of mainRoles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof mainRoles === "string") {
    mainRoles = [mainRoles];
  } else if (mainRoles.length === 0) mainRoles = Object.values(roles);

  return (req, res, next) => {
    try {
      const authUser = checkAuth(req.headers.authorization);

      if (mainRoles.includes(authUser.role)) {
        req.authUser = authUser;
        next();
      } else {
        return res.status(401).json({ error: { message: "Unauthorized" } });
      }
    } catch (error) {
      return res.status(401).json({ error: { message: error.message } });
    }
  };
};

export default authMiddleware;
