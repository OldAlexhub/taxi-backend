import mongoose from "mongoose";
import validator from "validator";

const UsersSchema = new mongoose.Schema({
  user_id: {
    type: String,
    unique: true,
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
    validate: {
      validator: validator.isEmail,
      message: "Invalid email address",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    default: undefined,
    select: false,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Passwords do not match",
    },
  },
});

// Generate unique 5-digit ID
async function generateUniqueUserId() {
  let userId;
  let exists = true;

  while (exists) {
    userId = Math.floor(10000 + Math.random() * 90000).toString();
    exists = await UserModel.findOne({ user_id: userId });
  }

  return userId;
}

// Pre-save hook
UsersSchema.pre("save", async function (next) {
  if (!this.user_id) {
    this.user_id = await generateUniqueUserId();
  }
  next();
});

const UserModel = new mongoose.model("users", UsersSchema);

export default UserModel;
