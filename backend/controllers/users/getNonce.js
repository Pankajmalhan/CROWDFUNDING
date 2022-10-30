const User = require("../../models/user");

const getNonce = async (req, res) => {
  try {
    const user = await User.findOne({ publicAddress: req.body.publicAddress });
    delete user.password;
    res.json({
      status: 200,
      data: user,
    });
  } catch (err) {
    res.json({
      status: 422,
      data: err,
    });
  }
};

module.exports = { getNonce };
