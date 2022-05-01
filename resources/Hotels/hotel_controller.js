import { Hotel } from "./hotel-model.js";

const add_hotel = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({ message: "User not Found" });
    }

    const hotel = await Hotel.create(
      {
        ...req.body.hotel,
        images: req.body.images
      }
    );

    res.json({ status: "OK", data: hotel });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

const get_hotels = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({ message: "User not Found" });
    }

    const hotels = await Hotel.find({});

    res.json({ status: "OK", data: hotels });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

const get_hotel = async (req, res) => {

  const { id } = req.params
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({ message: "User not Found" });
    }

    const hotel = await Hotel.findById(id);

    res.json({ status: "OK", data: hotel });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};


export { add_hotel, get_hotels, get_hotel };
