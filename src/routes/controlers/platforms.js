
const {Videogame, Platform}=require('./../../db')

 function platforms(req,res){
    
        Platform.findAll()
        .then(response=> res.send(response))
        .catch(e=> console.log(e.message))
   
}
function platformsGames(req,res){
    const {id}=req.params
    Platform.findByPk(id)
    .then(e=>e.getVideogames())
    .then(response=>{
        res.send(response)
    })
    .catch(e=>res.status(404).send(e.message))

}

module.exports={
    platforms,
    platformsGames
}