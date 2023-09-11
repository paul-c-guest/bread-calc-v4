export async function seed(knex) {
  return knex("overrides").insert([
    {
      flourId: 102, //  Wholemeal
      userId: 2, // brick house
      hydrationOverride: 69, // dude
    },
  ])
}
