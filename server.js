// packages
import express, { urlencoded, json } from "express";
import morgan from "morgan";
import { config } from "dotenv";
import cors from "cors";
import expressListRoutes from "express-list-routes";

// modules
import userRouter from "./resources/user/user.router.js"
import hotelRouter from "./resources/Hotels/hotel_routes"
import bookingRouter from './resources/booking/booking_routes.js'

import { connect } from "./util/db.js";
import { protect, signin, signup } from "./util/auth.js";
import { User } from "./resources/user/user.model.js";


config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;


const userModel = (req, res, next) => {
  req.model = User;
  next();
};


//const cognitoAuthMiddleware = await getVerifyMiddleware();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));





app.get("/", (req, res) => {
  res.json("Server is Running");
});
app.post("/api/signup", userModel, signup);
app.post("/api/signin", userModel, signin);

app.use("/api/user", userModel, protect, userRouter);
app.use("/api/hotel", userModel, protect, hotelRouter);
app.use("/api/booking", userModel, protect, bookingRouter);


// app.get("/admin_users", getall_users);

// app.get("/profile/:username", ProfileDataController);



// app.use(express.json())
// app.use(express.urlencoded())




export const start = async () => {
  try {
    await connect();
    app.listen(PORT, () => {
      if (process.env.NODE_ENV === "development") {
        expressListRoutes(app);
      }
      console.log(`REST API on http://localhost:${PORT}/`);
    });
  } catch (e) {
    console.error(e);
  }
};
