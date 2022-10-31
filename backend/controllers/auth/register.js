const { registerUser } = require("./helpers");
const User = require("../../models/user");

const register = async (req, res) => {
  try {
    let user = await User.findOne({ publicAddress: req.body.publicAddress });
    if (!user) {
       user = await registerUser(req.body);
    }
    res.json({
      status: 201,
      data: user,
    });
  } catch (err) {
    res.json({
      status: 422,
      data: null,
    });
  }
};

module.exports = { register };
