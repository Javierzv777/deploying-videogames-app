
const {Genre}= require('./../../db')

 function genres(req, res){

   Genre.findAll()
   .then(response=> {
    const genres=response.map(e=>{
        return e.dataValues
    })
    
       res.send(genres)})
   .catch(e=> res.status(404).send(e.message))
    
}

function genresGames(req,res){
    const {id}=req.params

    Genre.findByPk(id)
    .then(e=>e.getVideogames())
    .then(response=>{
        res.send(response)
    })
    .catch(e=>res.status(404).send(e.message))
    }
    



module.exports={
    genres,
    genresGames
}