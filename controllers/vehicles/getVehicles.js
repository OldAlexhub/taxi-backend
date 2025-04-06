import VehicleModel from "../../models/vehicles.js";

const getVehicles = async (req, res) => {
  try {
    const allVehicles = await VehicleModel.find();
    res.status(200).json({ message: "Vehicles", vehicles: allVehicles });
  } catch (error) {
    console.error("Get vehicles error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export default getVehicles;
