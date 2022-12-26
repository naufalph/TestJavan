const router = require("express").Router();
const Controller = require("../controllers/member")

router.get("/", Controller.findAllMember);
router.post("/add", Controller.postMember);
router.get("/delete/:id", Controller.deleteMember);
router.get("/:id", Controller.findOneMember);
router.post("/edit/:id", Controller.editMember);

module.exports = {router};
