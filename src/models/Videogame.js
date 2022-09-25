const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description:{
      type: DataTypes.TEXT,
      allowNull:false,
      defaultValue:'sin descripción'
    },
    released :{
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW   
    },
    score: {
      type: DataTypes.FLOAT(2),
      validate:{max:5},
      defaultValue:0

    },
    image: {
      type:DataTypes.TEXT,
      defaultValue:"https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  },{ timestamps: false });
};
// ID: * No puede ser un ID de un videojuego ya existente en la API rawg
// Nombre *
// Descripción *
// Fecha de lanzamiento
// Rating
// Plataformas *