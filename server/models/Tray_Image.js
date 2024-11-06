import mongoose from "mongoose";

const trayImageSchema = new mongoose.Schema({
  image_id: { type: String, required: true, unique: true },
  meal_id: { type: String, ref: "Meal_Info", required: true },
  flight_id: { type: String, ref: "Flight_Info", required: true },
  image_type: {
    type: String,
    enum: ["pre_consumption", "post_consumption"],
    required: true,
  },
  image_url: { type: String, required: true },
  upload_timestamp: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("Tray_Image", trayImageSchema);
