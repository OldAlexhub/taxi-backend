import DriverModel from "../../models/Drivers.js";

const EditDriver = async (req, res) => {
  try {
    const { driver_id } = req.params;
    const updates = req.body;
    const editedBy = req.user?.userId || "system"; // From JWT auth, if available

    if (!driver_id) {
      return res.status(400).json({ message: "Driver ID is required" });
    }

    const driver = await DriverModel.findOne({ driver_id });
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    const allowedFields = [
      "firstName",
      "lastName",
      "email",
      "dob",
      "dot_expiry",
      "cbi_expiry",
      "puc_expiry",
      "dl_number",
      "dl_expiry",
      "signedContract",
      "ein_number",
      "llc_name",
      "llc_expiry",
    ];

    const changes = {};
    allowedFields.forEach((field) => {
      if (updates[field] !== undefined && updates[field] !== driver[field]) {
        changes[field] = {
          old: driver[field],
          new: updates[field],
        };
        driver[field] = updates[field];
      }
    });

    if (Object.keys(changes).length > 0) {
      driver.editHistory.push({
        editedAt: new Date(),
        editedBy,
        changes: Object.fromEntries(
          Object.entries(changes).map(([k, v]) => [k, v.new])
        ),
      });
    }

    await driver.save();

    res.status(200).json({ message: "Driver updated successfully" });
  } catch (error) {
    console.error("Edit driver error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default EditDriver;
