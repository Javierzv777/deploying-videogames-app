//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const {Genre, Platform, conn, API_KEY } = require('./src/db.js');
const axios=require('axios');




// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
//   try{const query= await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`).then(response=>response.data.results).catch(e=>console.log(e))
//   let genres= query.map((genre)=>{return {name:genre.name,
//       id:genre.id
//   }})
//   Genre.bulkCreate(genres)
// }catch(e){
//   console.log('No se creo la tabla "Genres"')
// }
// axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`).then(response=>response.data.results)
// .then((response)=>response.map(e=> {return {name:e.name}}))
// .then(response=> Platform.bulkCreate(response) )
// .catch(()=>console.log('no se creo la tabla "platforms"'))
  
  

  // const query=await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`).then(response=>response.data.results).catch(e=>console.log(e))
});
