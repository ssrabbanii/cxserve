import mongoose from "mongoose";

const adminLogSchema = new mongoose.Schema({
  log_id: { type: String, required: true, unique: true },
  admin_id: { type: String, required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("Admin_Log", adminLogSchema);
