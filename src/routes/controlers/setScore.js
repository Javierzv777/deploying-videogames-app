const {Videogame, Rating}=require('../../db')

function setScore(req,res){
   
    const {score,id}=req.query
    Videogame.findByPk(id)
    .then(async(response)=>{
        response.createRating({ score }) 
        await response.save()
        return response 
    })
    .then(async (game)=>{
        let ratings=await game.getRating()
        let rating= ratings.reduce((e,i)=>e+i.score,0)/ratings.length
        game.score=rating.toFixed(2)
        console.log('score',rating)
        await game.save()
        
    })
    .then(e=> res.send(score))
    .catch(e=> res.status(404).send(score))
    
  
}

module.exports={
    setScore
}