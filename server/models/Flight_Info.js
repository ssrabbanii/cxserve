import mongoose from "mongoose";

const flightInfoSchema = new mongoose.Schema({
  flight_id: { type: String, required: true, unique: true },
  flight_number: { type: String, required: true },
  departure_date: { type: Date, required: true },
  arrival_date: { type: Date, required: true },
  route: { type: String, required: true },
});

export default mongoose.model("Flight_Info", flightInfoSchema);
