import AssignedModel from "../../models/AssignedDriverVehicle.js";

const GetAssignments = async (req, res) => {
  try {
    const assignments = await AssignedModel.find().sort({ assignedAt: -1 });

    res.status(200).json({
      message: "Assigned driver-vehicle records",
      assignments,
    });
  } catch (error) {
    console.error("Get assignments error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default GetAssignments;
