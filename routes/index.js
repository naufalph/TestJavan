const Controller = require("../controllers/member");

const router = require("express").Router();
const { router: memberRoute } = require("./CRUDmember");

router.get("/syncAll", Controller.updateAllAsset);

router.use("/members",memberRoute);


module.exports = router;
