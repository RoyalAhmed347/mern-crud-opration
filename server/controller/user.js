const USER = require("../model/user");

const getSingelUser = async (req, res) => {
  const id = req.params.id;
  const user = await USER.findOne({ _id: id });
  res.send(user);
};

const updateSingelUser = async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  await USER.findOneAndUpdate({ _id: id }, { ...user });
  res.send("success update");
};

const deleteSingelUser = async (req, res) => {
  const id = req.params.id;
  await USER.deleteOne({ _id: id });
  res.send("success deleted");
};

const createUser = async (req, res) => {
  const user = req.body;
  if (!user) {
    res.status(400).send("something is wrong");
  }
  const createdUser = await USER.create({
    ...user,
  });
  res.status(201).send(createdUser);
};

const getAllUsres = async (req, res) => {
  const allUser = await USER.find({});
  res.send(allUser);
};

module.exports = {
  getSingelUser,
  updateSingelUser,
  deleteSingelUser,
  createUser,
  getAllUsres
};
