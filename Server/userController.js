import User from "./userModel.js";

const userController = {};

userController.findUser = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username, password })
    .then((user) => {
      if (user) {
        res.locals.user = user;
        return next();
      } else {
        return next();
      }
    })
    .catch((error) => {
      console.log("error: ", error);
      res.status(500).json("Internal Server Error");
    });
};

userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        User.create({ username, password })
          .then((newUser) => {
            res.locals.newUser = newUser;
            console.log("new user", newUser, res.locals.newUser);
            next(); // Move next() here
          })
          .catch((error) => {
            console.log("error: ", error);
            res.status(500).json("Internal Server Error");
          });
      } else {
        next();
      }
    })
    .catch((error) => {
      console.log("error: ", error);
      res.status(500).json("Internal Server Error");
    });
};

userController.setStreak = (req, res, next) => {
  const { username, streak, date } = req.body;
  User.findOneAndUpdate({ username }, { consecutiveClickDays: streak + 1 }, { new: true })
    .then((updatedUser) => {
      res.locals.newStreak = updatedUser.consecutiveClickDays;
      return next();
    })
    .catch((error) => {
      console.log("error: ", error);
      res.status(500).json("internal Server Error with Updating Streak");
    });
};

export default userController;
