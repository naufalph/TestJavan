const Controller = require("../controllers/member");

const router = require("express").Router();
const { router: memberRoute } = require("./CRUDmember");
const { router: assetRoute } = require("./CRUDasset");

router.get("/syncAll", Controller.updateAllAsset);

router.use("/members", memberRoute);
router.use("/assets", assetRoute);

module.exports = router;
