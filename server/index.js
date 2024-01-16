require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const { default: mongoose } = require("mongoose");
const PORT = process.env.PORT;
const app = express();

mongoose
  .connect(process.env.MONGO_KEY)
  .then(() => console.log(`Database is connected `))
  .catch(() => console.log(`Database error`));

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
