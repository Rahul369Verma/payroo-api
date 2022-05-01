import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;

var hotelSchema = new Schema(
  {
    userID: {
      type: SchemaTypes.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    ownerName: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    rating: {
      type: String,
      required: true
    },
    description: {
      type: String,
    },
    images: {
      type: Array
      // {
      //   url: {
      //     type: String
      //   }
      // }
    }
  },
  {
    timestamps: true,
  }
);
// the schema is useless so far
export const Hotel = model("hotels", hotelSchema);
