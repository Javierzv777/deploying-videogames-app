const axios=require('axios')
const {Promise}=require('bluebird')
const {API_KEY}=require('../../db.js')
const {Videogame, Genre}=require('./../../db')
const {Op}=require('sequelize')


const getApiInfo= async ()=>{
    const videogames=[]
    let url=`https://api.rawg.io/api/games?key=${API_KEY}`;
    for (let i=0;i<=5;i++){
        const pages= await axios.get(url);
        pages.data.results.forEach(e=>{
            videogames.push({
                id:e.id,
                name:e.name,
                image:e.background_image,
                rating:e.rating,
                genres:[...e.genres],
            })
        })
        url=pages.data.next;
    }
    return videogames;
}
const getApiInfoName= async (name)=>{
    const videogames=[]
    let url=`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`;
    for (let i=0;i<=5;i++){
        let pages
        if(url){
            pages= await axios.get(url);
            pages.data.results.forEach(e=>{
                videogames.push({
                    id:e.id,
                    name:e.name,
                    image:e.background_image,
                    rating:e.rating,
                    genres:Array.isArray(e.genres)?[...e.genres]:[],
                })
            })
            url=pages.data.next;
        }
        
        
    }
    return videogames;
}

async function videogames(req,res){
    const {name}=req.query
    let list=[]
    let query=[]
    let listName=[]
    if(!name){// busqueda sin argumentos
        
        Promise.each([
            Videogame.findAll({include:{
                model: Genre, 
                through: { atributes: [] },
                as: 'genres'
            }}).catch(e=> {throw Error(e.message)}),
            getApiInfo()
        ],()=>{})
        .then(arrQuery=> {
            arrQuery[0].forEach(e=>{
                query.push({image:e.image,name:e.name, id: e.id,rating:e.score,genres:[...e.genres]})
                listName.push(e.name)
            })
            arrQuery[1].forEach(e=>{
                if(listName.includes(e.name)){
                    list.push({id:e.id,name:e.name})
                }else{
                    query.push({image:e.image,name:e.name, id: e.id,rating:e.rating,genres:[...e.genres]})
                }
            })
        res.send({query,list})
        })
        .catch(e=> res.status(404).send(e.message))
    }
    if(name){//busqueda con el argumento '?name=""'
       
       
        Promise.each([
            Videogame.findAll({where:{name:{[Op.iLike]: `%${name}%`}}})
            .then(response=>{
                const newResponse=response.map(e=>e.dataValues)
                return newResponse
            }),
            getApiInfoName(name)

        ],()=>{})
        .then(arrQuery=> {
            arrQuery[0].forEach(e=>{
                query.push({image:e.image,id:e.id,name:e.name,rating:e.score,genres:Array.isArray(e.genres)?[...e.genres]:[]})   
                listName.push(e.name)
            })
            arrQuery[1].forEach(e=>{
                if(listName.includes(e.name)){
                    list.push({id:e.id,name:e.name})
                }else{
                    query.push({image:e.image,id:e.id,name:e.name,rating:e.rating,genres:Array.isArray(e.genres)?[...e.genres]:[]})
                }            
            })
            // query=query.filter((e,i)=>i<15)
            res.send({query,list})
        })
        .catch(e=>res.status(404).send(e.message))    
        
    }
 
}



module.exports={
    videogames
}