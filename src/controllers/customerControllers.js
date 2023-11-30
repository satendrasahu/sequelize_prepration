const { customer,profile} = require("../database/connection");

const addCustomerMNAssociations = async (req, res) => {
    try {
      const amidala = await customer.create({ username: 'p4dm3', points: 1000 });
      const queen = await profile.create({ name: 'Queen' });
      await amidala.addProfile(queen, { through: { selfGranted: false } });
      const result = await customer.findOne({
        where: { username: 'p4dm3' },
        include: profile
      });
      console.log(result);
      if (result) {
        res.json({
          data: result,
          status: "success",
          statusCode: 200,
          message: "customer added successfully",
        });
      }
    } catch (error) {
      res.json({
        status: error,
        statusCode: error.statusCode,
        error: error.message,
        message: "customer hasn't added",
      });
    }
  };

  module.exports = {addCustomerMNAssociations}