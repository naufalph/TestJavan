const router = require("express").Router();
const AssetController = require("../controllers/asset");

router.post("/add/:memberId", AssetController.addAsset);
router.get("/add/:memberId", AssetController.fetchProducts);
router.get("/delete/:id", AssetController.delAsset);
router.post("/edit/:id", AssetController.putAsset);
router.get("/:id", AssetController.getAsset);
module.exports = { router };
