import AssignedModel from "../../models/AssignedDriverVehicle.js";

const EditAssignment = async (req, res) => {
  try {
    const driver_id = Number(req.params.driver_id);
    const vehicle_id = Number(req.params.vehicle_id);
    const updates = req.body;
    const editedBy = req.user?.userId || "system";

    if (!driver_id || !vehicle_id) {
      return res
        .status(400)
        .json({ message: "Driver ID and Vehicle ID are required" });
    }

    const assignment = await AssignedModel.findOne({ driver_id, vehicle_id });

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

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
      "status", // always consider
    ];

    const changes = {};

    allowedFields.forEach((field) => {
      const newValue = updates[field];
      const currentValue = assignment[field];

      const isStatus = field === "status";
      const isDifferent = newValue !== undefined && newValue !== currentValue;

      if (isStatus || isDifferent) {
        changes[field] = {
          old: currentValue,
          new: newValue,
        };
        assignment[field] = newValue;
      }
    });

    if (Object.keys(changes).length > 0) {
      assignment.editHistory.push({
        editedAt: new Date(),
        editedBy,
        changes: Object.fromEntries(
          Object.entries(changes).map(([k, v]) => [k, v.new])
        ),
      });
    }

    await assignment.save();
    res.status(200).json({ message: "Assignment updated successfully" });
  } catch (error) {
    console.error("Edit assignment error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default EditAssignment;
