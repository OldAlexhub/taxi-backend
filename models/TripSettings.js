// models/TripSettings.js
import mongoose from "mongoose";

const TripSettingsSchema = new mongoose.Schema({
  baseFare: { type: Number, required: true }, // e.g. $3.00
  costPerMile: { type: Number, required: true }, // e.g. $2.50 per mile
  costPerMinute: { type: Number, default: 0 }, // Optional for wait time
  currency: { type: String, default: "USD" },
  lastUpdated: { type: Date, default: Date.now },
  updatedBy: { type: String }, // Admin email/ID
});

export default mongoose.model("TripSettings", TripSettingsSchema);
