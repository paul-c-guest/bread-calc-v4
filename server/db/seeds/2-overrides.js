export async function seed(knex) {
  return knex("overrides").insert([
    {
      flourId: 102,
      owner: "user",
      hydration: 69,
    },
    {
      flourId: 103,
      owner: "user2",
      name: "Horse Heads",
    },
  ])
}
