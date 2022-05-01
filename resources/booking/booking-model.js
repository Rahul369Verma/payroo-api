import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;

var bookingSchema = new Schema(
  {
    bookHistory: [
      {
        // will return an array of booking history of user
        hotelID: {
          type: SchemaTypes.ObjectId,
          ref: "hotels",
        },
        from: {
          type: Date,
          required: true
        },
        to: {
          type: Date,
          required: true
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);
// the schema is useless so far
export const Bookings = model("bookings", bookingSchema);
