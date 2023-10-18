export async function seed(knex) {
  return knex("overrides").insert([
    {
      flourId: 102,
      userAuth0Sub: "user",
      hydration: 69,
    },
    {
      flourId: 103,
      userAuth0Sub: "user2",
      name: "Horse Heads",
    },
  ])
}
