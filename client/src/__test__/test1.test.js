// import configureStore from "redux-mock-store";
// import thunk from "redux-thunk";

// import {
//     getCountries
// } from "../actions";
// //import * as data from "../../db.json";

// describe("Actions", () => {
//   const mockStore = configureStore([thunk]);
//   const store = mockStore({ countries: [] });

//   beforeEach(() => store.clearActions());

//   describe("getCountries", () => {
//     it('Debería hacer un dispatch con las propiedades type "GET_COUNTRIES" y como payload, el resultado del fetch al link provisto', async () => {
//       return store
//         .dispatch(getCountries())
//         .then(() => {
//           const actions = store.getActions();
//           //expect(actions[0].payload.length).toBe(250);
//           expect(actions[0]).toEqual({
//             type: "GET_COUNTRIES",
//             payload: data.countries,
//           });
//         })
//         .catch((err) => {
//           // Acá llegamos cuando tu petición al backend no salió como el test lo pide. Revisá el error en la consola y verificá
//           // qué es lo que está pasando.
//           console.error(err);
//           expect(err).toBeUndefined();
//         });
//     });
//   });

// //   describe("getHouse", () => {
// //     it('Debería hacer un dispatch con las propiedades type "GET_HOUSE" y como payload, el resultado del fetch al link provisto', async () => {
// //       const payload = data.houses[0];
// //       return store
// //         .dispatch(getHouse(1))
// //         .then(() => {
// //           const actions = store.getActions();
// //           expect(actions[0]).toStrictEqual({
// //             type: "GET_HOUSE",
// //             payload: { ...payload },
// //           });
// //         })
// //         .catch((err) => {
// //           // Acá llegamos cuando tu petición al backend no salió como el test lo pide. Revisá el error en la consola y verificá
// //           // qué es lo que está pasando.
// //           console.error(err);
// //           expect(err).toBeUndefined();
// //         });
// //     });
// //   });

// //   describe("createHouse", () => {
// //     it('Debería retornar una action con las propiedades type "CREATE_HOUSE" y payload: contiene los values recibidos como argumento y un ID incremental en la action creator "createHouse"', () => {
// //       // Utilizar la variable id creada en el archivo index.js. La inicializamos en 3 para que los íd's no choquen con los existentes.
// //       const payload1 = {
// //         name: "House Baratheon",
// //         region: "Stormlands",
// //         words: "Ours is the Fury",
// //       };
// //       const payload2 = {
// //         name: "House Arryn",
// //         region: "The Vale of Arryn",
// //         words: "As High as Honor",
// //       };

// //       expect(createHouse(payload1)).toEqual({
// //         type: "CREATE_HOUSE",
// //         payload: {
// //           id: 4,
// //           name: "House Baratheon",
// //           region: "Stormlands",
// //           words: "Ours is the Fury",
// //         },
// //       });

// //       expect(createHouse(payload2)).toEqual({
// //         type: "CREATE_HOUSE",
// //         payload: {
// //           id: 5,
// //           name: "House Arryn",
// //           region: "The Vale of Arryn",
// //           words: "As High as Honor",
// //         },
// //       });
// //     });
// //   });

// //   describe("deleteHouse", () => {
// //     it('Debería retornar una action con las propiedades type "DELETE_HOUSE" y como payload el id de la casa a eliminar. Recibe el id por argumento', () => {
// //       expect(deleteHouse(1)).toEqual({ type: "DELETE_HOUSE", payload: 1 });
// //       expect(deleteHouse(2)).toEqual({ type: "DELETE_HOUSE", payload: 2 });
// //     });
// //   });
// });
