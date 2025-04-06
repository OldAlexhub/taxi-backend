import AssignedModel from "../../models/AssignedDriverVehicle.js";

const AssignDriverVehicle = async (req, res) => {
  try {
    const payload = req.body;

    const driver_id = Number(payload.driver_id);
    const vehicle_id = Number(payload.vehicle_id);

    // Check if assignment already exists
    const existing = await AssignedModel.findOne({ driver_id, vehicle_id });

    if (existing) {
      // Update the existing one instead of creating duplicate
      const allowedFields = [
        "cabNumber",
        "make",
        "model",
        "lic_plate",
        "email",
        "firstName",
        "lastName",
        "added_to_insurance",
        "weekly_balance",
        "status",
      ];

      const changes = {};
      allowedFields.forEach((field) => {
        const newValue = payload[field];
        const oldValue = existing[field];

        const isStatus = field === "status";
        const isDifferent = newValue !== undefined && newValue !== oldValue;

        if (isStatus || isDifferent) {
          changes[field] = { old: oldValue, new: newValue };
          existing[field] = newValue;
        }
      });

      if (Object.keys(changes).length > 0) {
        existing.editHistory.push({
          editedAt: new Date(),
          editedBy: req.user?.userId || "system",
          changes: Object.fromEntries(
            Object.entries(changes).map(([k, v]) => [k, v.new])
          ),
        });
        await existing.save();
      }

      return res.status(200).json({ message: "Assignment updated" });
    }

    // If not found, create new assignment
    const newAssignment = new AssignedModel({
      ...payload,
      driver_id,
      vehicle_id,
    });

    await newAssignment.save();
    return res.status(201).json({ message: "Driver assigned successfully" });
  } catch (err) {
    console.error("Assignment failed:", err);
    res.status(500).json({ message: "Server error during assignment" });
  }
};

export default AssignDriverVehicle;
