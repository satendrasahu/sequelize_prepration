module.exports = (sequelize, DataTypes, Model) => {
  class Comment extends Model {}
  Comment.init(
    {
      title: DataTypes.STRING,
      commentableId: DataTypes.INTEGER,
      commentableType: DataTypes.STRING,
    },
    { sequelize, modelName: "comment" }
  );
  return Comment;
};
