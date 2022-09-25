const { Router } = require('express');
const { genres, genresGames } = require('./controlers/genres');
const { searchGenresByGame, searchGamesByGenre } = require('./controlers/searchBy');
const { videogame, createVideogame, updateVideogame,deleteVideogame } = require('./controlers/videogame');
const { videogames } = require('./controlers/videogames');
const {platforms,platformsGames}=require('./controlers/platforms')
const {setScore}=require('./controlers/setScore')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

   
    router.get('/videogames', videogames)

//     [ ] GET /videogames:
// Obtener un listado de los videojuegos
// Debe devolver solo los datos necesarios para la ruta principal


// [ ] GET /videogames?name="...":
// Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
// Si no existe ningún videojuego mostrar un mensaje adecuado
router.post('/videogame', createVideogame)
router.get('/videogame/:idVideogame', videogame)
router.delete('/videogame/:idVideogame', deleteVideogame)
router.put('/videogame/:idVideogame', updateVideogame)

// [ ] GET /videogame/{idVideogame}:
// Obtener el detalle de un videojuego en particular
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// Incluir los géneros asociados

router.get('/genres', genres)
router.get('/genres/:id', genresGames)

router.get('/platforms', platforms)
router.get('/platforms/:id', platformsGames)

router.post('/score', setScore)




router.get('/genresByGame/:gameId', searchGenresByGame)
router.get('/gamesByGenre/:genreId', searchGamesByGenre)
// [ ] GET /genres:
// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
// [ ] POST /videogame:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
// Crea un videojuego en la base de datos
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
