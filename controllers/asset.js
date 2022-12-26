const { Member, Product, Asset, Nucleus, sequelize } = require("../models");
const Controller = require("./member");
class AssetController {
  static async addAsset(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const memberId = +req.params.memberId;
      const { productId } = req.body;
      await Asset.create(
        {
          memberId,
          productId,
        },
        {
          transaction: t,
        }
      );
      Controller.updateOneAsset(memberId);
      await t.commit();
      // res.json({ message: "asset has been added" });
      res.redirect(`/members/${memberId}`);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
  static async delAsset(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const assetId = +req.params.id;
      const asset = await Asset.findOne({
        where: { id: assetId },
        returning: true,
      });
      console.log(asset);
      await asset.destroy({
        transaction: t,
      });
      Controller.updateOneAsset(asset.dataValues.memberId);
      await t.commit();
      // res.json({ message: "asset has been deleted" });
      res.redirect(`/members/${asset.dataValues.memberId}`);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
  static async fetchProducts(req, res, next) {
    try {
      const productData = await Product.findAll();
      // res.json(productData);
      res.render("assets-add",{id:+req.params.memberId, products : productData})
    } catch (error) {
      next(error);
    }
  }
  static async putAsset(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const assetId = +req.params.id;
      const { productId, memberId } = req.body;
      let payload = {};
      if (!productId && memberId) {
        payload = { memberId };
      } else if (productId && !memberId) {
        payload = { productId };
      } else if (productId && memberId) {
        payload = { productId, memberId };
      }
      const asset = await Asset.update(payload, {
        where: { id: assetId },
        transaction: t,
        returning: true,
      });
      console.log(asset[1], "??Asset");
      Controller.updateOneAsset(asset[1][0].dataValues.memberId);
      await t.commit();
      // res.json({ message: "asset has been updated" });
      res.redirect(`/members/${asset[1][0].dataValues.memberId}`);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
  static async getAsset(req, res, next) {
    try {
      const asset = await Asset.findOne({
        where: { id: +req.params.id },
        include : Product
      });
      const products = await Product.findAll();
      // res.json(asset)
      res.render("assets-edit", { asset, products });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AssetController;
