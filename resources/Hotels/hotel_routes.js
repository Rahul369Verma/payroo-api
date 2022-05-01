import { Router } from "express";
import { add_hotel, get_hotel, get_hotels } from "./hotel_controller";

const router = Router();

router
  .post("/", add_hotel)
  .get("/", get_hotels)

router
  .get("/:id", get_hotel)

// router.delete("/remove_watchlist/:vid", remove_watchlist);
// router.get("/viewWatchlist", viewWatchlist);

export default router;
