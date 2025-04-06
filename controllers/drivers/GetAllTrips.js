import TripLog from "../../models/TripLog.js";

export const getAllTrips = async (req, res) => {
  try {
    const trips = await TripLog.find().sort({ startTime: -1 });

    if (!trips.length) {
      return res.status(404).json({ message: "No trips found." });
    }

    res.status(200).json(trips);
  } catch (error) {
    console.error("Error fetching trips:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
