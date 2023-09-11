export async function seed(knex) {
  await knex("flours").del()
  // await knex('users').del()
}
