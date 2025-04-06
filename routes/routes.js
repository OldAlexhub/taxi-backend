import { Router } from "express";

// Admin
import AdminLogin from "../controllers/adminslogin.js";
import AdminSignup from "../controllers/adminsignup.js";

// Drivers
import addDrivers from "../controllers/drivers/addDrivers.js";
import editDrivers from "../controllers/drivers/editDrivers.js";
import getDrivers from "../controllers/drivers/getDrivers.js";
import {
  createDriverSession,
  getDriverSessions,
  endDriverSession,
} from "../controllers/drivers/Session.js";
import {
  createTripLog,
  getTripLogs,
  updateTripLog,
} from "../controllers/drivers/tripLogController.js";
import { updateDriverStatus } from "../controllers/drivers/liveDriverStatusController.js";
import { getTripLogsByDriver } from "../controllers/drivers/GetTrips.js";
import { getAllTrips } from "../controllers/drivers/GetAllTrips.js";
import { getLiveDriverStatuses } from "../controllers/drivers/GetLiveDrivers.js";

// Vehicles
import addVehicles from "../controllers/vehicles/addVehicles.js";
import editVehicles from "../controllers/vehicles/editVehicles.js";
import getVehicles from "../controllers/vehicles/getVehicles.js";

// Assignments
import AssignDriverVehicle from "../controllers/Assigment/AssignDriverVehicle.js";
import EditAssignment from "../controllers/Assigment/EditAssignment.js";
import GetAssignments from "../controllers/Assigment/GetAssignments.js";
import DriverLogin from "../controllers/drivers/DriverLogin.js";

//Live
import {
  createTripSettings,
  getTripSettings,
  updateTripSettings,
} from "../controllers/Live/TripSettings.js";

const router = Router();

// Admin auth
router.post("/admin/login", AdminLogin);
router.post("/admin/signup", AdminSignup);

// Drivers
router.post("/add-drivers", addDrivers);
router.put("/drivers/:driver_id", editDrivers);
router.get("/drivers", getDrivers);
router.post("/drivers/login", DriverLogin);
router.post("/driver-sessions", createDriverSession);
router.get("/driver-sessions", getDriverSessions);
router.post("/trip-logs", createTripLog);
router.get("/trip-logs", getTripLogs);
router.post("/update-driver-status", updateDriverStatus);
router.put("/trip-logs/:id", updateTripLog);
router.get("/trip-logs", getTripLogsByDriver);
router.put("/driver-sessions/logout", endDriverSession);
router.get("/alltrips", getAllTrips);
router.get("/live-drivers", getLiveDriverStatuses);

// Vehicles
router.post("/add-vehicles", addVehicles);
router.put("/vehicles/:vehicle_id", editVehicles);
router.get("/vehicles", getVehicles);

// Assignments
router.post("/assign", AssignDriverVehicle);
router.put("/assignments/:driver_id/:vehicle_id", EditAssignment);
router.get("/assignments", GetAssignments);

//Live
router.post("/trip-settings", createTripSettings);
router.get("/settings", getTripSettings);
router.put("/trip-settings/:id", updateTripSettings);

export default router;
