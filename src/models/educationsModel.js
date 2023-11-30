module.exports = (sequelize,DataTypes, Model)=>{
    class Education extends Model {}
    
    Education.init(
      {
        // Model attributes are defined here
        qualification: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        year: {
          type: DataTypes.STRING,
        },
        organisation: {
          type : DataTypes.STRING
        },
        // UserId : DataTypes.INTEGER
        ContactId : DataTypes.INTEGER
      },
      {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: "Educations", // We need to choose the model name
    
      }
    );
    
    return Education;
    }
    