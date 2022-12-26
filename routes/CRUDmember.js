const router = require("express").Router();
const Controller = require("../controllers/member")

router.get("/", Controller.findAllMember);
router.post("/add", Controller.postMember);
router.get("/add", Controller.fetchPostMember);
router.get("/delete/:id", Controller.deleteMember);
router.get("/edit/:id", Controller.getEditMember);
router.post("/edit/:id", Controller.editMember);
router.get("/:id", Controller.findOneMember);

module.exports = {router};
