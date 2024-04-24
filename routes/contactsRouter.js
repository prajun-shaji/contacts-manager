import express from "express";
import {
  getAllContacts,
  createContact,
  deleteContact,
  getOneContact,
  updateContact,
} from "../controllers/contactsController.js";
import validateToken from "../middlewares/validateToken.js";

const router = express.Router();

router.route("/").get(getAllContacts).post(createContact);

router.use(validateToken);
router
  .route("/:id")
  .get(getOneContact)
  .put(updateContact)
  .delete(deleteContact);

export default router;
