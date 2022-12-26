const router = require("express").Router();
const Controller = require("../controllers/member")

router.get("/", Controller.findAllMember);
router.post("/add", Controller.postMember);
router.get("/:id", Controller.findOneMember);
router.delete("/:id", Controller.deleteMember);
router.put("/:id", Controller.editMember);

module.exports = {router};
