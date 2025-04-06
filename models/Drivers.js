import mongoose from "mongoose";

// Helper to generate unique 5-digit driver ID
const generateUniqueDriverId = async () => {
  let id;
  let exists = true;

  while (exists) {
    id = Math.floor(10000 + Math.random() * 90000);
    exists = await mongoose.models.Driver.findOne({ driver_id: id });
  }

  return id;
};

const DriverSchema = new mongoose.Schema({
  driver_id: {
    type: Number,
    unique: true,
    max: 99999,
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
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  dob: {
    type: Date,
    required: true,
  },
  dot_expiry: {
    type: Date,
    required: true,
  },
  cbi_expiry: {
    type: Date,
    required: true,
  },
  puc_expiry: {
    type: Date,
    required: true,
  },
  dl_number: {
    type: String,
    required: true,
  },
  dl_expiry: {
    type: Date,
    required: true,
  },
  signedContract: {
    type: String,
    enum: ["yes", "no"],
    default: "no",
  },
  ein_number: {
    type: String,
    required: true,
  },
  llc_name: {
    type: String,
    required: true,
  },
  llc_expiry: {
    type: Date,
    required: true,
  },
  editHistory: [
    {
      editedAt: { type: Date, default: Date.now },
      editedBy: { type: String },
      changes: { type: Object },
    },
  ],
});

// Auto-generate driver_id before saving
DriverSchema.pre("save", async function (next) {
  if (!this.driver_id) {
    this.driver_id = await generateUniqueDriverId();
  }
  next();
});

export default mongoose.model("Driver", DriverSchema);
