module.exports = (sequelize,DataTypes, Model)=>{
class User extends Model {}

User.init(
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      // get(){
      //   const data = this.firstName;
      //   return data?data.toUpperCase() :null
      // }
      get() {
        const rawValue = this.getDataValue('firstName');
        return rawValue ? rawValue.toUpperCase() : null;
      }
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
      set(values){
          this.setDataValue('lastName', values.toUpperCase()+'$' );
        
      }
    },
    fullName: {
      type : DataTypes.VIRTUAL,
      get(){
        return `${this.firstName} ${this.lastName}`
      },
      set(value){
        throw new Error('Do not try to set the `fullName` value!')
      }

    },
    age: {
      type: DataTypes.SMALLINT,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "User", // We need to choose the model name
    // paranoid: true,
    // deletedAt: 'soft_delete'

    hooks: {
      beforeValidate: (User, options) => {
        User.firstName="Mr.";
      },
      afterValidate: (User, options) => {
        User.lastName = 'Toni';
      }
    },

  }
);

// the defined model is the class itself
// console.log(User === sequelize.models.User);


return User;
}
