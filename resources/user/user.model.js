import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;
import bcrypt from "bcrypt";
import { Bookings } from "../booking/booking-model.js";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    bookingID: {
      type: SchemaTypes.ObjectId,
      ref: "bookings",
    }
  },
  { timestamps: true }
);



UserSchema.pre("save", async function (next) {
  if (
    !this.isModified("password")
  ) {
    return next();
  }
  try {
    const hash = await bcrypt.hash(this.password, 8);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.pre(
  "findOneAndDelete",
  { document: true, query: true },
  async function (next) {
    const userID = this.getFilter()["_id"];
    console.log("DELETING USER", userID);
    await Bookings.findOneAndDelete({ _id: this.booking });
    next();
  }
);

UserSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }

      resolve(same);
    });
  });
};

UserSchema.methods

export const User = model("users", UserSchema);
