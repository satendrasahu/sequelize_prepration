const { Sequelize,DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize("sequelizePractice", "root", "1234", {
  host: "localhost",
  logging : true ,
  dialect:
    "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user =require("../models/userModel")(sequelize,DataTypes, Model)
db.contact =require("../models/contactModel")(sequelize,DataTypes)
db.educations =require("../models/educationsModel")(sequelize,DataTypes,Model)
db.customer =require("../models/customerModel")(sequelize,DataTypes,Model)
db.profile =require("../models/profilesModel")(sequelize,DataTypes)

db.image = require("../models/imageModel")(sequelize, DataTypes, Model);
db.video = require("../models/videoModel")(sequelize, DataTypes, Model);
db.comment = require("../models/commentModel")(sequelize, DataTypes, Model);
db.tag = require("../models/tagModel")(sequelize,DataTypes,Model)
db.tagTables = require("../models/Tag_TaggableModel")(
  sequelize,
  DataTypes,
  Model
);



db.user.hasMany(db.contact);
db.contact.belongsTo(db.user)
// db.contactUser = db.contact.belongsTo(db.user,{foreignKey :"UserId", as: "users"})

db.contact.hasMany(db.educations)
db.educations.belongsTo(db.contact)


db.image.hasMany(db.comment, {
  foreignKey: 'commentableId',
  constraints: false,
  scope: {
    commentableType: 'image'
  }
});
db.comment.belongsTo(db.image, { foreignKey: 'commentableId', constraints: false });

db.video.hasMany(db.comment, {
  foreignKey: "commentableId",
  constraints: false,
  scope: {
    commentableType: "video",
  },
});
db.comment.belongsTo(db.video, {
  foreignKey: "commentableId",
  constraints: false,
});

db.image.belongsToMany(db.tag, {
  through: {
    model: db.tagTables,
    unique: false,
    scope: {
      taggableType: 'image'
    }
  },
  foreignKey: 'taggableId',
  constraints: false
});
db.tag.belongsToMany(db.image, {
  through: {
    model: db.tagTables,
    unique: false
  },
  foreignKey: 'tagId',
  constraints: false
});

db.video.belongsToMany(db.tag, {
  through: {
    model: db.tagTables,
    unique: false,
    scope: {
      taggableType: 'video'
    }
  },
  foreignKey: 'taggableId',
  constraints: false
});
db.tag.belongsToMany(db.video, {
  through: {
    model: db.tagTables,
    unique: false
  },
  foreignKey: 'tagId',
  constraints: false
});

const User_Profile = sequelize.define(
  "User_Profile",
  {
    selfGranted: DataTypes.BOOLEAN,
  },
  { timestamps: false }
);

db.customer.belongsToMany(db.profile, { through: User_Profile });
db.profile.belongsToMany(db.customer, { through: User_Profile });

db.sequelize.sync({ force: true });
module.exports = db;
