const { user,contact, educations, contactUser, sequelize, image, video, comment, tag, tagTables} = require("../database/connection");

const addUser = async (req, res) => {
  try {
    const result = await user.bulkCreate(req.body);
    if (result) {
      res.json({
        data: result,
        status: "success",
        statusCode: 200,
        message: "user added successfully",
      });
    }
  } catch (error) {
    res.json({
      status: error,
      statusCode: error.statusCode,
      error: error.message,
      message: "user hasn't added",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await user.findAll({
      // group: "age",
      // limit: 10,
      // offset: 5*4
      // order: [
      //   // ["age", "DESC"];
      //   // sequelize.fn('max', sequelize.col('age'))

      //   ["firstName"],
      //   // will return `username` DESC
      //   // ["age", "DESC"],
      // ],

      // attributes: {
      //   // exclude:["firstName"],
      //   include:['id']
      // },
      // where:{
      //   // id:2
      //   // id :{
      //   //   [Op.eq] :2
      //   // }
      //   // id: {
      //   //   [Op.eq]: 2
      //   // }
      //   // id:3,
      //   // firstName:"rohan4"

      //   [Op.or]: [
      //     { id:3 },
      //     { firstName :"rohan3" }
      //   ]
      // }
    });
    // [sequelize.fn("COUNT", sequelize.col("age")), "ageCount"]
    if (result) {
      res.json({
        data: result,
        status: "success",
        statusCode: 200,
        message: `user found successfully with item count ${result.length}`,
      });
    }
  } catch (error) {
    res.json({
      status: error,
      statusCode: error.statusCode,
      error: error.message,
      message: "user hasn't found",
    });
  }
};

const getUser = async (req, res) => {

  try {
    // const result = user.increment({age: 5}, { where: { id: req?.params?.id } })
    // const result = await user.findOne({ where: { id: req?.params?.id } });
    const result = await user.findByPk(req?.params?.id,{ paranoid: false })
    // const result = await user.findOrCreate({ where: { firstName: req?.params?.id }})
    console.log(result)
    if (result) {
      res.json({
        data: result,
        status: "success",
        statusCode: 200,
        message: "user found",
      });
    }
  } catch (error) {
    res.json({
      status: error,
      statusCode: error.statusCode,
      error: error.message,
      message: "user hasn't found",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await user.destroy({
      where: {
        id: req.params.id,
      },
      // force: true
      // truncate:true
    });
    // const result  = await user.restore()
    if (result) {
      res.json({
        data: result,
        status: "success",
        statusCode: 200,
        message: "user deleted successfully",
      });
    }
  } catch (error) {
    res.json({
      status: error,
      statusCode: error.statusCode,
      error: error.message,
      message: "user hasn't deleted",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const result = await user.create(req.body);
    if (result) {
      res.json({
        data: result,
        status: "success",
        statusCode: 200,
        message: "user added successfully",
      });
    }
  } catch (error) {
    res.json({
      status: error,
      statusCode: error.statusCode,
      error: error.message,
      message: "user hasn't added",
    });
  }
};


const oneToManyUserContact = async (req, res) => {
  let result = null;
  try {
    const newUser = await user.create(req.body.userDetails);
    const userId = await user.findOne({
      order: [["id", "DESC"]],
    });

    if(newUser && newUser?.id){

    const userConatact =  await contact.create({
        ...req?.body?.contactDetails,
        UserId: userId?.dataValues?.id,
      });


      const userEducations =  await educations.create({
        ...req?.body?.educationsDetails,
        // UserId: userId?.dataValues?.id,
        ContactId :userId?.dataValues?.id
      });
    

      result = { userDetails: newUser, contactDetails: userConatact, educationsDetails : userEducations};
    }


    if (result) {
      res.json({
        data: result,
        status: "success",
        statusCode: 200,
        message: "user added successfully",
      });
    }
  } catch (error) {
    res.json({
      status: error,
      statusCode: error.statusCode,
      error: error.message,
      message: "user hasn't added",
    });
  }
};

const userContactAsociationAtOneTime = async (req, res) => {

  try {
    const result = await contact.create(req.body,{
      include :[contactUser]
    });

    if (result) {
      res.json({
        data: result,
        status: "success",
        statusCode: 200,
        message: "user added successfully",
      });
    }
  } catch (error) {
    res.json({
      status: error,
      statusCode: error.statusCode,
      error: error.message,
      message: "user hasn't added",
    });
  }
};


const getoneToManyUserContactLazyLoading = async (req, res) => {
let result = null 
  try {
    const userData = await user.findOne({
      where: { id: req?.params?.id },
      // include: [contact,educations]

      // include: [{
      //   model: contact,
      //   required : false,
      //   right:true
      // },{
      //   model : educations
      // }],

      // include :{
      //   model :contact,
      //   include :{
      //     model :educations
      //   }
      // }

      include : {all:true, nested:true}
    });

    // const contactDetails = await userData.getContacts()
    result = {
      userData,
      // contactDetails
    }
    if (result) {
      res.json({
        data: result,
        status: "success",
        statusCode: 200,
        message: "user found",
      });
    }
  } catch (error) {
    res.json({
      status: error,
      statusCode: error.statusCode,
      error: error.message,
      message: "user hasn't found",
    });
  }
};


const addAssociationScope = async (req,res)=>{
  try {
    const result = await user.bulkCreate(req.body);
    if (result) {
      res.json({
        data: result,
        status: "success",
        statusCode: 200,
        message: "user added successfully",
      });
    }
  } catch (error) {
    res.json({
      status: error,
      statusCode: error.statusCode,
      error: error.message,
      message: "user hasn't added",
    });
  }
}
const getAssociationScope = async (req,res)=>{
  user.addScope("whereClause",{
    where:{
      id:2,
      firstName:"ROHAN1"
    }
  })

  user.addScope("includeMethod", {
    include: {
      model: contact,
      attributes :["currentAddress"]
    },
  });
  try {
    const result = await user
      .scope(["whereClause", "includeMethod"])
      .findAll({});
    if (result) {
      res.json({
        data: result,
        status: "success",
        statusCode: 200,
        message: "user added successfully",
      });
    }
  } catch (error) {
    res.json({
      status: error,
      statusCode: error.statusCode,
      error: error.message,
      message: "user hasn't added",
    });
  }
}
const addTransaction = async (req,res)=>{
  // method first
  //   const transaction = await sequelize.transaction();
  //   let result= null
  //   let userId
  //   try {
  //     const newUser = await user.create(req.body.userDetails);
  //  userId = await user.findOne({
  //   order: [["id", "DESC"]],
  // });
  //     if(newUser && newUser?.id){
  // const userConatact = await contact.create({
  //   ...req?.body?.contactDetails,
  //   UserId: userId?.dataValues?.id,
  // });
  //       result = {userDetails : newUser, contactDetails : userConatact}
  //     }
  // if (result) {
  //   await transaction.commit();
  //   res.json({
  //     data: result,
  //     status: "success",
  //     statusCode: 200,
  //     message: "user added successfully",
  //   });
  // }
  // } catch (error) {
  //   transaction?.rollback();
  //   await user.destroy({
  //     where: {
  //       id : userId.dataValues.id
  //     }
  //   })
  //   res.json({
  //     status: error,
  //     statusCode: error.statusCode,
  //     error: error.message,
  //     message: "user hasn't added",
  //   });
  // }

  // second methods

  let result = null;
  const newUser = await user.create(req.body.userDetails);
  const userId = await user.findOne({
    order: [["id", "DESC"]],
  });
  try {
    await sequelize.transaction(async (t) => {
      const userConatact = await contact.create(
        {
          ...req?.body?.contactDetails,
          UserId: userId?.dataValues?.id,
        },
        { transaction: t }
      );

      result = { userDetails: newUser, contactDetails: userConatact };
    });

    if (result) {
      res.json({
        data: result,
        status: "success",
        statusCode: 200,
        message: "user added successfully",
      });
    }
  } catch (error) {
    await user.destroy({
      where: {
        id: userId.dataValues.id,
      },
    });
    res.json({
      status: error,
      statusCode: error.statusCode,
      error: error.message,
      message: "user hasn't added",
    });
  }
}
const getTransaction = async (req,res)=>{
  user.addScope("whereClause",{
    where:{
      id:2,
      firstName:"ROHAN1"
    }
  })

  user.addScope("includeMethod", {
    include: {
      model: contact,
      attributes :["currentAddress"]
    },
  });
  try {
    const result = await user
      .scope(["whereClause", "includeMethod"])
      .findAll({});
    if (result) {
      res.json({
        data: result,
        status: "success",
        statusCode: 200,
        message: "user added successfully",
      });
    }
  } catch (error) {
    res.json({
      status: error,
      statusCode: error.statusCode,
      error: error.message,
      message: "user hasn't added",
    });
  }
}


const addPolymorphicOnetoMany = async (req,res)=>{
let result = null;
let commentOnImage = null;
let commentOnVideo = null;
  try {
    const imageData = await image.create(req.body.imageData)
    const videoData = await video.create(req.body.videoData)

    if(imageData && imageData?.id){
      commentOnImage = await comment.create({
        ...req.body.commentOnImage,
        commentableId: imageData?.id,
      });  
    }

    if(videoData && videoData?.id){
      commentOnVideo = await comment.create({
        ...req.body.commentOnVideo,
        commentableId: videoData?.id,
      });
    }
    result = {
      imageData,
      videoData,
      commentOnImage,
      commentOnVideo,
    };
    if (result) {
      res.json({
        data: result,
        status: "success",
        statusCode: 200,
        message: "user added successfully",
      });
    }
  } catch (error) {
    res.json({
      status: error,
      statusCode: error.statusCode,
      error: error.message,
      message: "user hasn't added",
    });
  }
}
const getPolymorphicOnetoMany = async (req,res)=>{
  let result = null;
  try {

    const imageData = await image.findAll({
      include: {
        model: comment,
      },
    });
    const videoData = await video.findAll({
      include :{
        model :comment
      }
    })

    result = {imageData, videoData}
    if (result) {
      res.json({
        data: result,
        status: "success",
        statusCode: 200,
        message: "user added successfully",
      });
    }
  } catch (error) {
    res.json({
      status: error,
      statusCode: error.statusCode,
      error: error.message,
      message: "user hasn't added",
    });
  }
}
const addPolymorphicManytoMany = async (req,res)=>{
let result = null;
let taggableOnImage = null;
let taggableOnVideo = null;
  try {
    const imageData = await image.create(req.body.imageData)
    const videoData = await video.create(req.body.videoData)
    const tagData = await tag.create(req.body.tagData);
    if( tagData && tagData?.id &&imageData && imageData?.id){
      taggableOnImage = await tagTables.create({
        tagId :tagData?.id,
        taggableId : imageData?.id,
        taggableType :"image"
      });  
    }
    
    if (tagData && tagData?.id && videoData && videoData?.id) {
      taggableOnVideo = await tagTables.create({
        tagId: tagData?.id,
        taggableId: videoData?.id,
        taggableType: "video",
      });
    }
    result = {
      imageData,
      videoData,
      taggableOnImage,
      taggableOnVideo,
    };
    if (result) {
      res.json({
        data: result,
        status: "success",
        statusCode: 200,
        message: "user added successfully",
      });
    }
  } catch (error) {
    res.json({
      status: error,
      statusCode: error.statusCode,
      error: error.message,
      message: "user hasn't added",
    });
  }
}
const getPolymorphicManytoMany = async (req, res) => {
  let result = null;
  try {
    const imageData = await image.findAll({
      include: {
        model: comment,
      },
    });
    const videoData = await video.findAll({
      include: {
        model: comment,
      },
    });

    result = { imageData, videoData };
    if (result) {
      res.json({
        data: result,
        status: "success",
        statusCode: 200,
        message: "user added successfully",
      });
    }
  } catch (error) {
    res.json({
      status: error,
      statusCode: error.statusCode,
      error: error.message,
      message: "user hasn't added",
    });
  }
};


module.exports = {
  addUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  oneToManyUserContact,
  getoneToManyUserContactLazyLoading,
  userContactAsociationAtOneTime,
  addAssociationScope,
  getAssociationScope,
  addTransaction,
  getTransaction,
  addPolymorphicOnetoMany,
  getPolymorphicOnetoMany,

  addPolymorphicManytoMany,
  getPolymorphicManytoMany
};
