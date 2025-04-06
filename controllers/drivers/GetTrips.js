import TripLog from "../../models/TripLog.js";

export const getTripLogsByDriver = async (req, res) => {
  try {
    const { driver_id } = req.query;

    if (!driver_id) {
      return res
        .status(400)
        .json({ message: "driver_id is required in query params." });
    }

    const tripLogs = await TripLog.find({ driver_id: Number(driver_id) }).sort({
      createdAt: -1,
    });

    if (!tripLogs.length) {
      return res
        .status(404)
        .json({ message: "No trips found for this driver." });
    }

    res.status(200).json(tripLogs);
  } catch (err) {
    console.error("Error fetching trips by driver:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
