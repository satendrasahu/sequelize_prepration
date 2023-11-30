const express = require("express");
const { addCustomerMNAssociations } = require("../controllers/customerControllers");
const router = express.Router()
router.post("/addCustomerMNAssociations/add", addCustomerMNAssociations);
module.exports = router