import express from "express";
import dotenv from "dotenv";
import contactRouter from "./routes/contactsRouter.js";
import userRouter from "./routes/userRouter.js";
import errorHandler from "./middlewares/errorHandler.js";
import connectDb from "./config/dbConnect.js";

dotenv.config();
connectDb();
const app = express();
const port = process.env.PORT || 3001;

// MIDDLEWARES
app.use(express.json());
app.use("/api/contacts", contactRouter);
app.use("/api/users", userRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
