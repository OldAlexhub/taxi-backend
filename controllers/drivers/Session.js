// controllers/driverSessionsController.js
import DriverSessions from "../../models/DriverSessions.js";

// Create a new driver session
export const createDriverSession = async (req, res) => {
  try {
    const { driver_id, vehicle_id, cabNumber } = req.body;

    const newSession = new DriverSessions({
      driver_id,
      vehicle_id,
      cabNumber,
      loginTime: new Date(),
    });

    await newSession.save();
    res
      .status(201)
      .json({ message: "Driver session created successfully", newSession });
  } catch (err) {
    console.error("Error creating driver session:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Fetch all driver sessions
export const getDriverSessions = async (req, res) => {
  try {
    const sessions = await DriverSessions.find().sort({ loginTime: -1 });

    if (!sessions.length) {
      return res.status(404).json({ message: "No driver sessions found" });
    }

    res.status(200).json(sessions);
  } catch (err) {
    console.error("Error fetching driver sessions:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// End active driver session
export const endDriverSession = async (req, res) => {
  try {
    const { driver_id } = req.body;

    const session = await DriverSessions.findOne({
      driver_id,
      sessionStatus: "active",
    }).sort({ loginTime: -1 });

    if (!session) {
      return res.status(404).json({ message: "No active session found" });
    }

    session.logoutTime = new Date();
    session.sessionStatus = "ended";

    await session.save();

    res.status(200).json({ message: "Session ended successfully", session });
  } catch (err) {
    console.error("Error ending driver session:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
