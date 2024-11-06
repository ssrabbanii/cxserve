import mongoose from "mongoose";

const mealRecommendationSchema = new mongoose.Schema({
  recommendation_id: { type: String, required: true, unique: true },
  meal_id: { type: String, ref: "Meal_Info", required: true },
  flight_id: { type: String, ref: "Flight_Info", required: true },
  recommended_meal: { type: String, required: true },
  recommendation_details: { type: String },
  recommendation_timestamp: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("Meal_Recommendation", mealRecommendationSchema);
