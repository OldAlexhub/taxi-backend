import mongoose from "mongoose";

const LiveDriverStatusSchema = new mongoose.Schema({
  driver_id: { type: Number, required: true, unique: true },
  cabNumber: { type: String, required: true },
  vehicle_id: { type: Number, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  online: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("LiveDriverStatus", LiveDriverStatusSchema);
