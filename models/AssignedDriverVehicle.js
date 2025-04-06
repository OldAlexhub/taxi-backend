import mongoose from "mongoose";

const AssignedSchema = new mongoose.Schema({
  driver_id: {
    type: Number,
    required: true,
  },
  vehicle_id: {
    type: Number,
    required: true,
  },
  cabNumber: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  lic_plate: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  assignedAt: {
    type: Date,
    default: Date.now,
  },
  added_to_insurance: {
    type: Date,
    required: true,
  },
  weekly_balance: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  editHistory: [
    {
      editedAt: { type: Date, default: Date.now },
      editedBy: { type: String },
      changes: { type: Object },
    },
  ],
});
AssignedSchema.index({ driver_id: 1, vehicle_id: 1 }, { unique: true });

export default mongoose.model("AssignedDriverVehicle", AssignedSchema);
