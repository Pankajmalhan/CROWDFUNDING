const { registerUser } = require("./helpers");

const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.json({
      status: 201,
      data: user,
    });
  } catch (err) {
    res.json({
      status: 422,
      data: err,
    });
  }
};

module.exports = { register };
