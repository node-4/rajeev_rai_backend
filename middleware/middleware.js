const jwt = require("jsonwebtoken")
require("dotenv").config()
const User = require("../model/userCreate");

exports.verifyToken = (req, res, next) => {
    const token =
        req.get("Authorization")?.split("Bearer ")[1] ||
        req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "no token provided! Access prohibited",
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).send({
                message: "UnAuthorised !",
            });
        }

        console.log(decoded);
        const user = await User.findOne({ _id: decoded.id});

        if (!user) {
            return res.status(400).send({
                message: "The user that this token belongs to does not exist",
            });
        }
        req.user = user;
        next();
    });
};

// exports.authorizeRoles = (...roles) => {
//     return (req, res, next) => {
//       if (!roles.includes(req.user.role)) {
//         return next(
//           new ErrorHander(
//             `Role: ${req.user.role} is not allowed to access this resouce `,
//             403
//           )
//         );
//       }
  
//       next();
//     };
//   };

