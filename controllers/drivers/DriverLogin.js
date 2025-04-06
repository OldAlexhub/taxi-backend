import DriverModel from "../../models/Drivers.js";
import jwt from "jsonwebtoken";

const DriverLogin = async (req, res) => {
  try {
    const { cabNumber, driver_id } = req.body;

    if (!cabNumber || !driver_id) {
      return res
        .status(400)
        .json({ message: "Cab number and driver ID are required." });
    }

    const driver = await DriverModel.findOne({ driver_id });

    if (!driver) {
      return res
        .status(400)
        .json({ message: "Login failed. Driver not found." });
    }

    // Match cab assignment and pull vehicle_id
    const assignment = await import(
      "../../models/AssignedDriverVehicle.js"
    ).then((module) =>
      module.default.findOne({ driver_id, cabNumber, status: "active" })
    );

    if (!assignment) {
      return res
        .status(400)
        .json({ message: "Invalid cab number or inactive assignment." });
    }

    // Create token
    const token = jwt.sign(
      { driverId: driver.driver_id, cabNumber },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      driver: {
        firstName: driver.firstName,
        lastName: driver.lastName,
        driver_id: driver.driver_id,
        cabNumber,
        vehicle_id: assignment.vehicle_id, // ✅ include vehicle_id here
      },
      token,
    });
  } catch (error) {
    console.error("Driver login error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default DriverLogin;
