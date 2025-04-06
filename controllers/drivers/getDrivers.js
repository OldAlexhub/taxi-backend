import DriverModel from "../../models/Drivers.js";

const getDrivers = async (req, res) => {
  try {
    const allDrivers = await DriverModel.find().select("-password -__v");
    res.status(200).json({ message: "Drivers", drivers: allDrivers });
  } catch (error) {
    console.error("Get drivers error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export default getDrivers;
