// controllers/tripLogController.js
import TripLog from "../../models/TripLog.js";

// Create a new trip log
export const createTripLog = async (req, res) => {
  try {
    const {
      driver_id,
      vehicle_id,
      cabNumber,
      startTime,
      pickupLocation,
      dropoffLocation,
      distanceMiles,
      fare,
    } = req.body;

    const newTrip = new TripLog({
      driver_id,
      vehicle_id,
      cabNumber,
      startTime,
      pickupLocation,
      dropoffLocation,
      distanceMiles,
      fare,
    });

    // If trip has ended, calculate the duration and end time
    if (req.body.endTime) {
      newTrip.endTime = req.body.endTime;
      newTrip.durationMinutes =
        (new Date(req.body.endTime) - new Date(startTime)) / 60000;
    }

    await newTrip.save();
    res.status(201).json({ message: "Trip log created successfully", newTrip });
  } catch (err) {
    console.error("Error creating trip log:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Fetch all trip logs
export const getTripLogs = async (req, res) => {
  try {
    const tripLogs = await TripLog.find().sort({ createdAt: -1 });

    if (!tripLogs.length) {
      return res.status(404).json({ message: "No trip logs found" });
    }

    res.status(200).json(tripLogs);
  } catch (err) {
    console.error("Error fetching trip logs:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update an existing trip (e.g., on Stop Trip)
export const updateTripLog = async (req, res) => {
  try {
    const { id } = req.params;
    const { endTime, dropoffLocation, distanceMiles, fare } = req.body;

    const trip = await TripLog.findById(id);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    trip.endTime = new Date(endTime);
    trip.dropoffLocation = dropoffLocation;
    trip.distanceMiles = distanceMiles;
    trip.fare = fare;
    trip.tripStatus = "completed";

    if (trip.startTime && endTime) {
      const duration = (new Date(endTime) - new Date(trip.startTime)) / 60000;
      trip.durationMinutes = Math.round(duration);
    }

    await trip.save();
    res.status(200).json({ message: "Trip log updated", trip });
  } catch (err) {
    console.error("Error updating trip log:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
