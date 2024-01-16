const express = require("express");
const {
  getSingelUser,
  updateSingelUser,
  deleteSingelUser,
  createUser,
  getAllUsres,
} = require("../controller/user");

const router = express.Router();

router.get("/all", getAllUsres);
router
  .route("/:id")
  .get(getSingelUser)
  .patch(updateSingelUser)
  .delete(deleteSingelUser);

router.route("/").post(createUser);

module.exports = router;
