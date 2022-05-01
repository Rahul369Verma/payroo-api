import mongoose from "mongoose";
const { Types } = mongoose;


const getUserProfile = (req, res) => {
  if (!req.user) {
    return res.status(400).json({ message: "User not Found" });
  }
  res.json({ status: "ok", data: req.user });
};


export {
  getUserProfile,
};
