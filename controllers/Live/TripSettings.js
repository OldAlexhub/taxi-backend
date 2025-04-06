// controllers/trips/tripSettings.js
import TripSettings from "../../models/TripSettings.js";

// ➕ POST: Create new settings
export const createTripSettings = async (req, res) => {
  try {
    const { baseFare, costPerMile, costPerMinute, currency, updatedBy } =
      req.body;

    const newSettings = new TripSettings({
      baseFare,
      costPerMile,
      costPerMinute,
      currency,
      updatedBy,
    });

    await newSettings.save();
    res.status(201).json({ message: "Trip settings created", newSettings });
  } catch (err) {
    console.error("Create TripSettings error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// 🧾 GET: Get latest settings
export const getTripSettings = async (req, res) => {
  try {
    const settings = await TripSettings.findOne().sort({ lastUpdated: -1 });

    if (!settings) {
      return res.status(404).json({ message: "No trip settings found" });
    }

    res.status(200).json(settings);
  } catch (err) {
    console.error("Get TripSettings error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✏️ PUT: Edit settings by ID
export const updateTripSettings = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = await TripSettings.findByIdAndUpdate(
      id,
      {
        ...updates,
        lastUpdated: new Date(),
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Trip settings not found" });
    }

    res.status(200).json({ message: "Trip settings updated", updated });
  } catch (err) {
    console.error("Update TripSettings error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
