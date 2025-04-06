import VehicleModel from "../../models/vehicles.js";

const AddVehicle = async (req, res) => {
  try {
    const {
      cabNumber,
      vinNumber,
      regis_expriry,
      lic_plate,
      color,
      make,
      model,
      year,
      status, // optional: active/inactive
    } = req.body;

    // Basic validation
    if (
      !cabNumber ||
      !vinNumber ||
      !regis_expriry ||
      !lic_plate ||
      !color ||
      !make ||
      !model ||
      !year
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Create new vehicle
    const newVehicle = new VehicleModel({
      cabNumber,
      vinNumber,
      regis_expriry,
      lic_plate,
      color,
      make,
      model,
      year,
      status, // optional
    });

    await newVehicle.save({ validateBeforeSave: false });

    res.status(201).json({
      message: "Vehicle added successfully",
      vehicle_id: newVehicle.vehicle_id,
    });
  } catch (error) {
    console.error("Add vehicle error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default AddVehicle;
