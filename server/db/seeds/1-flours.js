export async function seed(knex) {
  await knex("flours").insert([
    { id: 101, name: "Wheat", defaultHydration: 75, isGlutenFree: false },
    { id: 102, name: "Wholemeal", defaultHydration: 70, isGlutenFree: false },
    { id: 103, name: "Rye", defaultHydration: 65, isGlutenFree: false },
    { id: 104, name: "Rice", defaultHydration: 62, isGlutenFree: true },
    { id: 105, name: "Tapioca", defaultHydration: 58, isGlutenFree: true },
    { id: 106, name: "Spelt", defaultHydration: 63, isGlutenFree: false },
    { id: 107, name: "Buckwheat", defaultHydration: 53, isGlutenFree: true },
  ])
}
