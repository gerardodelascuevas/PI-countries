const { Router } = require('express');
const axios = require('axios');
// const Activities = require('../models/Activities');
const { Countries, Activities } = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const allCountries = async ()=> {
 let countryData = await axios.get(`https://restcountries.com/v3/all`)
 //country data es objeto 
 countryData = Object.values(countryData).splice(5)[0]
 //AHORA COUNTRY DATA ES ARRAY
 //console.log(countryData)
    let result = countryData.map(x=> {
        let nombre = x.name.common.slice(0, 3)
        //console.log(nombre)
      return {
         // id: x.fifa ? x.fifa : x.name.common.slice(0, 3), //x.name.common,//String(Math.random()),
          id: x.fifa ? x.fifa : x.name.common,//String(Math.random()),
          name: x.name.common,
          capital: x.capital ? x.capital[0] : "We don't have a capital",
          continent: x.region,
         // x.languages: { ber: 'Berber', mey: 'Hassaniya', spa: 'Spanish' },
          //languages: typeof x.languages == 'object' ? Object.values(x.languages) : x.languages,
          superficie: x.area,
          flag: x.flags[0],
         population: x.population,
         subregion: x.subregion,          
      }
    })
    result = Object.values(result)
    
    return result
}

const getDbInfo = async ()=> {
    return await Countries.findAll({
        include: [{
            model: Activities,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }]
    })
}

//console.log(getDbInfo())

router.get('/country', async (req, res)=> {
    const {name} = req.query
    const infodb =  await allCountries()
    //console.log(infodb)
    infodb.map(x=> {
                try { Countries.findOrCreate({
                        where: {
                            id: typeof x.id == 'string' ? x.id : x.name.slice(0, 3).toUpperCase(),
                            name: x.name,
                            capital: x.capital ? x.capital : "We don't have a capital",
                            continent: x.continent,
                        //   languages: typeof x.languages == 'object' ? Object.values(x.languages) : x.languages,
                            superficie: x.superficie,
                            flag: x.flag,
                            population: x.population,
                            subregion: x.subregion ? x.subregion : "Sorry we don't have data", 
                        }     
                })                   
                } catch(e) {console.log(e)}
              })
  
    if(name){
        let myCountry = await axios.get(`https://restcountries.com/v3/name/${name}`)
        myCountry = myCountry.data[0]
      
        const myData = {
            id: myCountry.fifa ? myCountry.fifa : myCountry.name.common,//.splice(0,3).toUpperCase(),
            name: myCountry.name.common,
            capital: myCountry.capital ? myCountry.capital[0] : "Sorry we don't have a capital",
            continent: myCountry.region,
            languages: myCountry.languages,
            superficie: myCountry.area,
            flag: myCountry.flags[0],
           population: myCountry.population,
           subregion: myCountry.subregion,
        }
        res.send(myData)
    }     
    
   
     else res.send(await Countries.findAll())    
})


router.get('/country/:id', async (req, res)=> {
    let { id } = req.params
    if(typeof id == 'string') id = id.toLocaleLowerCase()
    
    let myCountry = await allCountries()

    if(id){            
         for(let i =0; i<myCountry.length;i++){
             if(typeof myCountry[i].id == 'string') myCountry[i].id = myCountry[i].id.toLocaleLowerCase()
             if(id == myCountry[i].id) {
                 var theCountry = myCountry[i]             
         } }       
    }
    res.send(theCountry)
})

router.get('/countries', async(req, res)=> {
    const { continent } = req.query

    const theInfo = await allCountries()
    theInfo.map(x=> {
        try { Countries.findOrCreate({
                where: {
                    id: typeof x.id == 'string' ? x.id : x.name.slice(0, 3).toUpperCase(),
                    name: x.name,
                    capital: x.capital ? x.capital : "We don't have a capital",
                    continent: x.continent,
                    superficie: x.superficie,
                    flag: x.flag,
                    population: x.population,
                    subregion: x.subregion ? x.subregion : "Sorry we don't have data", 
                }     
        })                   
        } catch(e) {console.log(e)}
      })
    const allData = await Countries.findAll()
    
    const myContinentCountries = allData.filter(x=> {
        if(x.continent.toLocaleLowerCase() === continent.toLocaleLowerCase()) {
            return x
        }
    })    
    res.send(myContinentCountries)
})



router.post('/activity', (res, req)=> {
   const { country, name, season, duration, difficult } = req.body

  let newActivity = Activities.findOrCreate({
       where: {           
           name: name, 
           season: season, 
           duration: duration,
           difficult: difficult,
       }
   })

   let countries =  Countries.findAll({
    where: { name : country }

   })
   newActivity.addCountries(countries)
   console.log(newActivity)
   res.send.json("Your activity was created correctly ")
})



module.exports = router;