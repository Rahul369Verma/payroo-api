import { Router } from "express";
import { get_booking, post_booking } from "./booking_controller";
const router = Router();

router.post("/", post_booking);
router.get("/", get_booking);

// router.delete("/remove_watchlist/:vid", );
// router.get("/viewWatchlist");

export default router;
