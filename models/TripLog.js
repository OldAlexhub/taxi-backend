// models/TripLog.js
import mongoose from "mongoose";

const TripLogSchema = new mongoose.Schema({
  driver_id: { type: Number, required: true },
  vehicle_id: { type: Number, required: true },
  cabNumber: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  durationMinutes: { type: Number },
  pickupLocation: {
    lat: Number,
    lng: Number,
  },
  dropoffLocation: {
    lat: Number,
    lng: Number,
  },
  distanceMiles: { type: Number }, // if calculated
  fare: { type: Number },
  tripStatus: {
    type: String,
    enum: ["in_progress", "completed", "cancelled"],
    default: "in_progress",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("TripLog", TripLogSchema);
