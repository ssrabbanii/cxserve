import mongoose from "mongoose";

const mealInfoSchema = new mongoose.Schema({
  meal_id: { type: String, required: true, unique: true },
  meal_name: { type: String, required: true },
  meal_description: { type: String },
  meal_image: { type: String },
  ingredients: { type: String },
});

export default mongoose.model("Meal_Info", mealInfoSchema);
