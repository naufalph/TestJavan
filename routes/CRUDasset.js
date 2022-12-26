const router = require("express").Router();
const AssetController = require("../controllers/asset");

router.post("/add/:memberId", AssetController.addAsset);
router.delete("/:id", AssetController.delAsset);
router.put("/:id", AssetController.putAsset);
module.exports = { router };
