const ProfileModel = require("../models/ProfileModel");
const jwt = require("jsonwebtoken");

// CRUD Operation

// Create user
exports.CreateProfile = (req, res) => {
  let reqBody = req.body;
  ProfileModel.create(reqBody, (err, data) => {
    if (err) {
      res.status(401).json({ status: "failed", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};

//  login user
exports.UserLogin = (req, res) => {
  let UserName = req.body["UserName"];
  let Password = req.body["Password"];

  // User find

  ProfileModel.find({ UserName: UserName, Password: Password }, (err, data) => {
    if (err) {
      res.status(400).json({ status: "failed", data: err });
    } else {
      if (data.length > 0) {
        // Create auth token
        let PayLoad = {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: data[0],
        };

        var Token = jwt.sign(PayLoad, "SecretKey");

        res
          .status(200)
          .json({ status: "success", token: Token, data: data[0] });
      } else {
        res.status(401).json({ status: "Unauthorized" });
      }
    }
  });
};

// Select user profile
exports.SelectProfile = (req, res) => {
  let UserName = req.headers["username"];
  ProfileModel.find({ UserName: UserName }, (err, data) => {
    if (err) {
      res.status(401).json({ status: "Failed", data: err });
    } else {
      res.status(200).json({ status: "Success", data: data });
    }
  });
};

// Update user profile
exports.UpdateProfile = (req, res) => {
  let UserName = req.headers["username"];
  let reqBody = req.body;

  ProfileModel.updateOne(
    { UserName: UserName },
    { $set: reqBody },
    { upsert: true },
    (err, data) => {
      if (err) {
        res.status(401).json({ status: "Failed", data: err });
      } else {
        res.status(200).json({ status: "Success", data: data });
      }
    }
  );
};
