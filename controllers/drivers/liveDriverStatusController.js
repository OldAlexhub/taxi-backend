// controllers/liveDriverStatusController.js
import LiveDriverStatus from "../../models/LiveDriverStatus.js";

// Update or create new record for the driver (updating the current status and location)
export const updateDriverStatus = async (req, res) => {
  try {
    const { driver_id, cabNumber, vehicle_id, lat, lng, online } = req.body;

    // Find if the driver status record already exists
    const existingDriver = await LiveDriverStatus.findOne({ driver_id });

    // If the driver status exists, update it, otherwise create a new one
    if (existingDriver) {
      existingDriver.cabNumber = cabNumber;
      existingDriver.vehicle_id = vehicle_id;
      existingDriver.lat = lat;
      existingDriver.lng = lng;
      existingDriver.online = online;
      existingDriver.updatedAt = new Date();

      await existingDriver.save();
      res
        .status(200)
        .json({ message: "Driver status updated", driver: existingDriver });
    } else {
      // If no record exists, create a new one
      const newDriverStatus = new LiveDriverStatus({
        driver_id,
        cabNumber,
        vehicle_id,
        lat,
        lng,
        online,
      });

      await newDriverStatus.save();
      res
        .status(201)
        .json({ message: "Driver status created", driver: newDriverStatus });
    }
  } catch (error) {
    console.error("Error updating driver status:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
