import mongoose from "mongoose";

// Helper to generate unique 5-digit vehicle ID
const generateUniqueVehicleId = async () => {
  let id;
  let exists = true;

  while (exists) {
    id = Math.floor(10000 + Math.random() * 90000); // 5-digit number
    exists = await mongoose.models.Vehicle.findOne({ vehicle_id: id });
  }

  return id;
};

const VehicleSchema = new mongoose.Schema({
  vehicle_id: {
    type: Number,
    unique: true,
    max: 99999,
    required: true,
  },
  cabNumber: {
    type: String,
    required: true,
    maxlength: 4,
  },
  vinNumber: {
    type: String,
    required: true,
  },
  regis_expriry: {
    type: Date,
    required: true,
  },
  lic_plate: {
    type: String,
    required: true,
  },
  color: {
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
  year: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  editHistory: [
    {
      editedAt: { type: Date, default: Date.now },
      editedBy: { type: String }, // optionally store admin/user ID or name
      changes: { type: Object }, // store changed fields and their new values
    },
  ],
});

// Pre-save hook to assign unique vehicle_id
VehicleSchema.pre("save", async function (next) {
  if (!this.vehicle_id) {
    this.vehicle_id = await generateUniqueVehicleId();
  }
  next();
});

export default mongoose.model("Vehicle", VehicleSchema);
