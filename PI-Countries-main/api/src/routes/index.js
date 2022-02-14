const { Router } = require('express');
const axios = require('axios')
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
          id: x.fifa,
          name: x.name.official,
          capital: x.capital ? x.capital[0] : "We don't have a capital",
          continent: x.region,
          languages: x.languages,
          superficie: x.area,
          flag: x.flags[0],
         population: x.population,
          
      }

    })
    //console.log(result)
    return result
}

router.get('/country', async (req, res)=> {
    const { country }  = req.query
    const apiData =  await allCountries()
        if(country){
            const myCountry = apiData.find(x=> x.name.toLowerCase().includes(country.toLocaleLowerCase()) )
            myCountry.length ? res.send(myCountry) : res.sendStatus(404).send("Sorry your contry doesn't exist")
        } else res.send(apiData)    
})

router.get('/country/:id', async(req, res)=> {
    let { id } = req.params
    const countries = await allCountries()
        if(id) {
        const myCountry = countries.find(x => x.id.toLowerCase() === id.toLowerCase())
        myCountry ? res.send(myCountry) : res.sendStatus(404).send("Sorry we dont have data")  
        } else res.send(allCountries)
})

router.post('/activity', (res, req)=> {
   
})



module.exports = router;
