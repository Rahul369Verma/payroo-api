import { Bookings } from "../resources/booking/booking-model.js";
import { newToken, verifyToken } from "./jwt.js";

const signup = async (req, res) => {
  const Model = req.model;
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.firstName ||
    !req.body.lastName
  ) {
    return res.status(400).send({
      message: "Required fields missing",
    });
  }
  try {
    const booking = await Bookings.create({})
    const user = await Model.create(
      {
        ...req.body,
        bookingID: booking._id
      }
    );
    const token = newToken(user);
    return res.status(201).send({ status: "OK", token: token });
  } catch (e) {
    console.log(e.message);
    if (e.toString().includes("E11000 duplicate key error collection")) {
      return res.status(400).send({ status: "Already Exists" });
    }
    return res.status(400).send({ status: "Error Communicating with server" });
  }
};

const signin = async (req, res) => {
  const Model = req.model;

  if (!req.body.email || !req.body.password)
    return res.status(400).send({ message: "Email and password required" });
  const user = await Model.findOne({ email: req.body.email }).exec();
  if (!user) {
    return res.status(400).send({ message: "Invalid Email or Password" });
  }

  try {
    const match = await user.checkPassword(req.body.password);
    if (!match) {
      return res.status(401).send({ message: "Invalid Credentials" });
    }
    const token = newToken(user);
    return res.status(201).send({ status: "ok", token: token });
  } catch (e) {
    console.log(e);
    return res.status(401).send({ message: "Not Authorized" });
  }
};

const protect = async (req, res, next) => {
  const Model = req.model;
  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  let token = req.headers.authorization.split("Bearer ")[1];
  if (!token) {
    return res.status(401).end();
  }
  try {
    const payload = await verifyToken(token);
    console.log(payload);
    const user = await Model.findById(payload.id)
      .select("-password")
      .exec();
    req.user = user;
    next();
  } catch (e) {
    console.log(e.message);
    return res.status(401).end();
  }
};


export { signup, signin, protect };
