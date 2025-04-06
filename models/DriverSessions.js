// models/DriverSessions.js
import mongoose from "mongoose";

const DriverSessionsSchema = new mongoose.Schema({
  driver_id: { type: Number, required: true },
  vehicle_id: { type: Number, required: true },
  cabNumber: { type: String },
  loginTime: { type: Date, default: Date.now },
  logoutTime: { type: Date },
  sessionStatus: {
    type: String,
    enum: ["active", "ended"],
    default: "active",
  },
});

export default mongoose.model("DriverSessions", DriverSessionsSchema);
