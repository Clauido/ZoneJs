import "zone.js";
//
//
let zone = Zone.current.fork({
  name: "hook",
  properties: {
    user: {
      name: "User1",
      password: "hola123",
      age: 23,
      address: "Wallaby",
    },
  },
});

zone.run(() => {
  setTimeout(function () {
    console.log("timer callback invoked");
  }, 1000);

  fetch("https://pokeapi.co/api/v2/pokemon/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      console.log(Zone.current.get("user"));
    });
});
let zone2 = Zone.current.fork({
  name: "hook2",
});

// zone.run(() => {
//   zone2.run(() => {
//     console.log(Zone.current.name);
//   });
// });
