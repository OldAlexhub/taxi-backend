import VehicleModel from "../../models/vehicles.js";

const EditVehicle = async (req, res) => {
  try {
    const { vehicle_id } = req.params;
    const updates = req.body;
    const editedBy = req.user?.userId || "system"; // if auth is implemented

    if (!vehicle_id) {
      return res.status(400).json({ message: "Vehicle ID is required" });
    }

    const vehicle = await VehicleModel.findOne({ vehicle_id });
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const allowedFields = [
      "cabNumber",
      "vinNumber",
      "regis_expriry",
      "lic_plate",
      "color",
      "make",
      "model",
      "year",
      "status",
    ];

    const changes = {};
    allowedFields.forEach((field) => {
      if (updates[field] !== undefined && updates[field] !== vehicle[field]) {
        changes[field] = {
          old: vehicle[field],
          new: updates[field],
        };
        vehicle[field] = updates[field];
      }
    });

    if (Object.keys(changes).length > 0) {
      vehicle.editHistory.push({
        editedAt: new Date(),
        editedBy,
        changes: Object.fromEntries(
          Object.entries(changes).map(([k, v]) => [k, v.new])
        ),
      });
    }

    await vehicle.save();
    res.status(200).json({ message: "Vehicle updated successfully" });
  } catch (error) {
    console.error("Edit vehicle error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default EditVehicle;
