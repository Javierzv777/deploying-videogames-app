require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  // API_KEY,
  DB_USER, DB_PASSWORD, DB_HOST, 
} = process.env;
const API_KEY=bfd29d37511148239afcde82e03dd71b
// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`, {
const sequelize = new Sequelize(`postgres://jxipckscjvjntz:3dff5544770711c5183fed05611f6cd17a68a6ff3a98a37390c4b9bf6813a346@ec2-34-231-221-151.compute-1.amazonaws.com/da8sfbua2fe6lm`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame } = sequelize.models;
const {Genre}=sequelize.models;
const {Platform}=sequelize.models;
const {Rating}=sequelize.models


Videogame.belongsToMany(Genre,{ as: 'genres',through:'Videogame_Genre'})
Genre.belongsToMany(Videogame,{through:'Videogame_Genre'})
Videogame.belongsToMany(Platform,{ as: 'platforms',through:'Videogame_Platform'})
Platform.belongsToMany(Videogame,{through:'Videogame_Platform'})
Videogame.hasMany(Rating,{ as: 'rating'});
Rating.belongsTo(Videogame);
// Aca vendrian las relaciones
// Product.hasMany(Reviews);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, 
  API_KEY    // para importart la conexión { conn } = require('./db.js');
};
