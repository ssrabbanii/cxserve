import mongoose from "mongoose";

const wasteAnalysisSchema = new mongoose.Schema({
  analysis_id: { type: String, required: true, unique: true },
  image_id_pre: { type: String, ref: "Tray_Image", required: true },
  image_id_post: { type: String, ref: "Tray_Image", required: true },
  meal_id: { type: String, ref: "Meal_Info", required: true },
  flight_id: { type: String, ref: "Flight_Info", required: true },
  waste_percentage: { type: mongoose.Schema.Types.Decimal128, required: true },
  analysis_timestamp: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("Waste_Analysis", wasteAnalysisSchema);
