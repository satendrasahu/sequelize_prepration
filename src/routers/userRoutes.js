const express = require("express")
const router = express.Router()
const {
  addUser,
  getAllUsers,
  updateUser,
  getUser,
  deleteUser,
  oneToManyUserContact,
  getoneToManyUserContactLazyLoading,
  userContactAsociationAtOneTime,
  addAssociationScope,
  getAssociationScope,
  getTransaction,
  addTransaction,
  addPolymorphicOnetoMany,
  getPolymorphicOnetoMany,
  addPolymorphicManytoMany,
  getPolymorphicManytoMany
} = require("../controllers/userController");
router.get("/all",getAllUsers)
router.get("/user/:id",getUser)
router.post("/add",addUser);
router.patch("/update",updateUser)
router.delete("/delete/:id",deleteUser)

router.post("/lazyLoding/add",oneToManyUserContact)
router.post("/lazyLodingAssociationAtOneTime/add",userContactAsociationAtOneTime)
router.get("/lazyLoding/user/:id",getoneToManyUserContactLazyLoading)


router.post("/associationScope/add",addAssociationScope)
router.get("/associationScope/get",getAssociationScope)
router.post("/addTransaction/add",addTransaction)
router.get("/getTransaction/get",getTransaction)


router.post("/polymorphicOnetoMany/add",addPolymorphicOnetoMany)
router.get("/polymorphicOnetoMany/get", getPolymorphicOnetoMany);


router.post("/polymorphicManytoMany/add",addPolymorphicManytoMany)
router.get("/polymorphicManytoMany/get", getPolymorphicManytoMany);

module.exports = router