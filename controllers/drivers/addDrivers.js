import DriverModel from "../../models/Drivers.js";
import bcrypt from "bcrypt";

const AddDriver = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      dob,
      dot_expiry,
      cbi_expiry,
      puc_expiry,
      dl_number,
      dl_expiry,
      signedContract,
      ein_number,
      llc_name,
      llc_expiry,
    } = req.body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !dob ||
      !dot_expiry ||
      !cbi_expiry ||
      !puc_expiry ||
      !dl_number ||
      !dl_expiry ||
      !ein_number ||
      !llc_name ||
      !llc_expiry
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields." });
    }

    // Check if email already exists
    const existingDriver = await DriverModel.findOne({ email });
    if (existingDriver) {
      return res
        .status(400)
        .json({ message: "Driver with this email already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new driver
    const newDriver = new DriverModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dob,
      dot_expiry,
      cbi_expiry,
      puc_expiry,
      dl_number,
      dl_expiry,
      signedContract: signedContract || "no",
      ein_number,
      llc_name,
      llc_expiry,
    });

    await newDriver.save({ validateBeforeSave: false });

    res.status(201).json({
      message: "Driver added successfully",
      driver_id: newDriver.driver_id,
    });
  } catch (error) {
    console.error("Add driver error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default AddDriver;
