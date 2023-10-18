export async function seed(knex) {
  await knex("overrides").del()
  await knex("flours").del()
}
