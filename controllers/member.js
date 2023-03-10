const { Member, Product, Asset, Nucleus, sequelize } = require("../models");

class Controller {
  static async updateAllAsset(req, res, next) {
    try {
      const memberData = await Member.findAll();
      const members = memberData.map((el) => el.dataValues);
      for (let i = 0; i < members.length; i++) {
        const assetData = await Asset.findAll({
          where: { memberId: members[i].id },
          include: [Product],
        });
        let totalAsset = 0;
        for (let j = 0; j < assetData.length; j++) {
          totalAsset += assetData[j].dataValues.Product.price;
        }
        await Member.update({ totalAsset }, { where: { id: members[i].id } });
      }
      // res.json(await Member.findAll());
      res.redirect("/members")
    } catch (error) {
      next(error);
    }
  }
  static async updateOneAsset(memberId) {
    try {
      // console.log(memberId, "<< memberId");
      const assetData = await Asset.findAll({
        where: { memberId },
        include: [Product],
      });
      // console.log(assetData, "<< assetData");
      let totalAsset = 0;
      for (let j = 0; j < assetData.length; j++) {
        totalAsset += assetData[j].dataValues.Product.price;
      }
      const updated = await Member.update(
        { totalAsset },
        { where: { id: memberId }, returning: true }
      );
      console.log(updated);
      return { message: `member with id ${memberId} has been updated` };
    } catch (error) {
      console.log(error);
    }
  }
  static async findAllMember(req, res, next) {
    try {
      const memberData = await Member.findAll({
        include: [
          {
            model: Asset,
            include: [Product],
          },
          {
            model: Nucleus,
            as: "Children",
            include: ["Parents", "Children"],
          },
        ],
      });
      if (!memberData) {
        throw { name: "NotFound" };
      }
      // res.json(memberData);
      // console.log()
      res.render("members", { data: memberData });
    } catch (error) {
      next(error);
    }
  }
  static async findOneMember(req, res, next) {
    try {
      const memberId = +req.params.id;
      const member = await Member.findOne({
        where: {
          id: memberId,
        },
        include: [
          {
            model: Asset,
            include: [Product],
          },
          {
            model: Nucleus,
            as: "Parents",
            include: ["Parents", "Children"],
          },
          {
            model: Nucleus,
            as: "Children",
            include: ["Parents", "Children"],
          },
        ],
      });
      if (!member) {
        throw { name: "NotFound" };
      }
      // res.json(member);
      res.render("members-detail", { data: member });
    } catch (error) {
      next(error);
    }
  }
  static async fetchPostMember(req, res, next) {
    try {
      const products = await Product.findAll();
      const members = await Member.findAll();
      res.render("members-add", { products, members });
    } catch (error) {
      next(error);
    }
  }
  static async postMember(req, res, next) {
    const t = await sequelize.transaction();
    /**
     * Body format:
     * {
     *   name: "somename",
     *   parentId: parentId,
     *   products:[
     *     1,null,8
     *   ]
     * }
     */
    try {
      // const form = req.body;
      const { name } = req.body;
      const newMember = await Member.create(
        { name },
        { returning: true, transaction: t }
      );
      const { parentId } = req.body;

      await Nucleus.create(
        {
          parentId,
          childId: newMember.id,
        },
        {
          transaction: t,
        }
      );

      const { firstProductId } = req.body;

      await Asset.create(
        {
          memberId: newMember.id,
          productId: firstProductId,
        },
        {
          transaction: t,
        }
      );

      Controller.updateOneAsset(newMember.id);
      await t.commit();
      // res.json({ message: "new member has been created" });
      res.redirect("/members")
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
  static async deleteMember(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const memberId = +req.params.id;
      await Asset.destroy({
        where: { memberId },
        transaction: t,
      });
      await Member.destroy({
        where: { id: memberId },
        transaction: t,
      });
      await t.commit();
      // res.json({ message: "member has been deleted" });
      res.redirect(`/members`);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
  static async editMember(req, res, next) {
    const t = await sequelize.transaction();
    try {
      // const form = req.body;
      const memberId = +req.params.id;
      const { name } = req.body;
      await Member.update(
        { name },
        {
          where: { id: memberId },
          returning: true,
          transaction: t,
        }
      );
      const { parentId } = req.body;

      if (parentId) {
        await Nucleus.update(
          {
            parentId,
          },
          {
            where: { childId: memberId },
            transaction: t,
          }
        );
      }

      await t.commit();
      // res.json({ message: "member has been updated" });
      res.redirect(`/members/${memberId}`);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
  static async getEditMember(req,res,next){
    try {
      const memberId = +req.params.id;
      const memberData = await Member.findOne({
        where: { id: memberId },
        include: {
          model: Nucleus,
          as: "Children",
          include: ["Parents", "Children"],
        },
      });
      const members = await Member.findAll()
      const products = await Product.findAll({
        
      });
      // res.json({ products, members, memberData });
      res.render("members-edit", { products, members , memberData });
    } catch (error) {
      next(error)
    }
  }
}
module.exports = Controller;
