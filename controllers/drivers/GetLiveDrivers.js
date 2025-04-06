import LiveDriverStatus from "../../models/LiveDriverStatus.js";

export const getLiveDriverStatuses = async (req, res) => {
  try {
    const drivers = await LiveDriverStatus.find();
    res.status(200).json(drivers);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
