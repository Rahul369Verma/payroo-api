import mongoose from "mongoose";
import { Bookings } from "./booking-model";
const ObjectId = mongoose.Types.ObjectId;



const post_booking = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({ message: "User not Found" });
    }
    console.log(req.body.hotelID);

    // const check = await Bookings.aggregate([
    //   {
    //     $match: {
    //       "_id": new mongoose.Types.ObjectId(user.bookingID)
    //     }
    //   },
    //   {
    //     $match: {
    //       "bookHistory.hotelID": new mongoose.Types.ObjectId(req.body.hotelID)
    //     }
    //   }
    // ]);
    let check;
    check = await Bookings.findById(user.bookingID);
    var foundIndex = await check.bookHistory.findIndex(x => x.hotelID == req.body.hotelID);

    console.log(foundIndex);

    if (foundIndex !== -1) {
      check.bookHistory[foundIndex].from = req.body.from;
      check.bookHistory[foundIndex].to = req.body.to;
      await check.save();
      console.log(check);
    } else {
      check = await Bookings.findByIdAndUpdate(user.bookingID, { $push: { bookHistory: { ...req.body } } });
    }
    console.log(check);

    res.json({ status: "OK", data: check });
  } catch (e) {
    console.log(e);
    res.send("can't add booking");
  }
}

const get_booking = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({ message: "User not Found" });
    }
    const bookings = await Bookings.findById(user.bookingID).populate("bookHistory.hotelID")

    console.log(bookings);
    res.json({ status: "OK", data: bookings });
  } catch (e) {
    console.log(e);
    res.send("can't add booking");
  }
}

export { post_booking, get_booking };
