export async function seed(knex) {
  await knex("overrides").del()
  await knex("users").del()
  await knex("flours").del()
}
