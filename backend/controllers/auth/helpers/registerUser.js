const User = require("../../../models/user");

const registerUser = (p) => {
  return new Promise((resolve, reject) => {
    (userName = p.userName),
      (email = p.email),
      (password = p.password),
      (publicAddress = p.publicAddress);
    const user = new User({
      userName,
      email,
      password,
      publicAddress,
    });
    user.save((err, item) => {
      if (err) {
        return reject(err);
      }
      item = JSON.parse(JSON.stringify(item));
      console.log(item);
      delete item.password;
      resolve(item);
    });
  });
};
module.exports = { registerUser };
