const { Router } = require('express');
const axios = require('axios');
// const Activities = require('../models/Activities');
const { Country, Activities } = require('../db')
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
//  console.log((countryData[0]))

    let result = countryData.map(x=> {
      return {
          id: x.fifa ? x.fifa : Math.random(),
          name: x.name.common,
          capital: x.capital ? x.capital[0] : "We don't have a capital",
          continent: x.region,
          languages: x.languages,
          superficie: x.area,
          flag: x.flags[0],
         population: x.population,
         subregion: x.subregion,
          
      }

    })
    //console.log(result)
    return result
}

router.get('/country', async (req, res)=> {
    const {name} = req.query
    const apiData =  await allCountries()
    console.log('esto es name ' + name)
    if(name){
        let myCountry = await axios.get(`https://restcountries.com/v3/name/${name}`)
        myCountry = myCountry.data[0]
        console.log(myCountry)
        const myData = {
            id: myCountry.id ? myCountry.id : Math.random(),
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
       
     else res.send(apiData)    
})

router.get(`./country/:id`, async (req, res)=> {
    let { id } = req.params
    console.log(id)
    let myCountry = await allCountries()
    console.log(myCountry)
    if(id){
        const theCountry = myCountry.find(x=> x.id.toLowerCase() === req.params.id.toLowerCase())
        theCountry.length ? 
        res.send(theCountry) : res.sendStatus(404).send("Sorry we don't have data")
    }
    res.send("Ahi te va el id " + id)
})

router.post('/activity', (res, req)=> {
   const { name, season, duration, difficult } = req.body

   Activities.findOrCreate({
       where: {           
           name: name, 
           season: season, 
           duration: duration,
           difficult: difficult,
       }
   })
   res.send.json("Your activity was created correctly ")
})



module.exports = router;
