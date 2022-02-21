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
    let result = countryData.map(x=> {
      return {
          id: x.fifa ? x.fifa : Math.random(),
          name: x.name.common,
          capital: x.capital ? x.capital[0] : "We don't have a capital",
          continent: x.region,
         // x.languages: { ber: 'Berber', mey: 'Hassaniya', spa: 'Spanish' },
          languages: typeof x.languages == 'object' ? Object.values(x.languages) : x.languages,
          superficie: x.area,
          flag: x.flags[0],
         population: x.population,
         subregion: x.subregion,          
      }
    })
    result = Object.values(result)
    
    return result
}
//  countryData.map(x=> {
//         try { Countries.findOrCreate({
//                 where: {
//                      id: x.fifa ? x.fifa : Math.random(),
//                     name: x.name.common,
//                     capital: x.capital ? x.capital[0] : "We don't have a capital",
//                     continent: x.region,
//                 //   languages: typeof x.languages == 'object' ? Object.values(x.languages) : x.languages,
//                     superficie: x.area,
//                     flag: x.flags[0],
//                     population: x.population,
//                     subregion: x.subregion, 
//                 }     
//         })                   
//         } catch(e) {console.log(e)}
//       })

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
                            id: String(x.id),
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


    // console.log(Countries.findAll({
    //     include: {
    //         model: Activities,
    //         attributes: ["name"],
    //         through: {
    //             attributes: []
    //         }
    //     }
    // }))  
    if(name){
        let myCountry = await axios.get(`https://restcountries.com/v3/name/${name}`)
        myCountry = myCountry.data[0]
      
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
        // let theCountry = myCountry.find(x=> {
        //      x.id == id           
        // } )
        //theCountry.length ? res.send(theCountry) : res.sendStatus(404).send("Sorry we don't have data")       
    }
    res.send(theCountry)
})


router.post('/activity', (res, req)=> {
   const { country, name, season, duration, difficult } = req.body

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
