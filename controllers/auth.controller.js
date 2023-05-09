const crypto = require("node:crypto");
const DB = require("../models");
const User = DB.User;

module.exports.signin = async (req, res) => {
  const page = "signin";
  if (req.body.inp_username === "" || req.body.inp_password === "") {
    res.send(
      `<script>alert('Content can not be empty!'); window.location.href = ${page};</script> `
    );

    return;
  }

  const resultData = await User.findOne({
    where: { username: req.body.inp_username },
  });

  if (resultData === null) {
    res.send(
      `<script>alert('Username Or Password is incorrect!'); window.location.href = ${page};</script> `
    );
  } else {
    const isVertify = verifyPassword(
      req.body.inp_password,
      resultData.salt,
      resultData.password
    );

    if (isVertify) {
      req.session._id = resultData.id;
      req.session.username = resultData.username;
      req.session.save(function (err) {
        if (err) return next(err);
      });
      res.send(
        `<script>alert('Login is successfuly');`
      );
      res.redirect("/");
    } else {
      res.send(
        `<script>alert('Username Or Password is incorrect!'); window.location.href = ${page};</script> `
      );
    }
  }
};
module.exports.signup = async (req, res) => {
  const page = "signup";
  if (
    req.body.inp_username === "" ||
    req.body.inp_password === "" ||
    req.body.td_confirmpassword === ""
  ) {
    if (req.body.password !== req.body.td_confirmpassword) {
      res.send(
        `<script>alert('Password Not Match'); window.location.href = ${page};</script> `
      );
    }

    // Check input
    res.send(
      `<script>alert('Content can not be empty!'); window.location.href = ${page};</script> `
    );
    return;
  }
  const salt = crypto.randomBytes(16).toString("hex"); // Random salt
  const password_hashed = hashPassword(req.body.inp_password, salt);

  const { user, created } = await User.findOrCreate({
    where: { username: req.body.inp_username },
    defaults: {
      password: password_hashed,
      salt: salt,
    },
  });

  if (user) {
    res.send(
      `<script>alert('Username is exist!'); window.location.href = ${page};</script> `
    );
  } else {
    res.redirect("/signin");
  }
};
module.exports.signout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
module.exports.delete = (req, res) => {
  User.destroy({
    where: {
      username: req.session.username,
    },
  }).then((count) => {
    if (!count) {
      return res.status(404).send({ error: "No user" });
    }

    req.session.destroy(() => {
      res.redirect("/");
    });
  });
};

function verifyPassword(password, salt, hashedPassword) {
  const hash = crypto.createHmac("sha256", salt);
  hash.update(password);
  const hashedPasswordToVerify = hash.digest("hex");
  return hashedPasswordToVerify === hashedPassword;
}

function hashPassword(password, salt) {
  const hash = crypto.createHmac("sha256", salt);
  hash.update(password);
  const hashedPassword = hash.digest("hex");
  return hashedPassword;
}
