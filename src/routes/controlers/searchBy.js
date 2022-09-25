const axios=require('axios')
const {Videogame, Genre}=require('./../../db')

function searchGamesByGenre(req,res){
    const genreId=req.paramas
    const genre= Genre.findByPk(genreId)
    const games=genre.getVideogames()  
    res.send(games)  
}

function searchGenresByGame(req,res){
    const gameId=req.paramas
    const game= Videogame.findByPk(gameId)
    const genres=game.getVideogames()  
    res.send(genres) 
  
}

module.exports={
    searchGamesByGenre,
    searchGenresByGame
}