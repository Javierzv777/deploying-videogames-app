const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Rating', {
    id_score: {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
       
    },
    score: {
        type: DataTypes.FLOAT(2),
        defaultValue:0,
        validate: {max:5
        }
  }},{ timestamps: false });
};


