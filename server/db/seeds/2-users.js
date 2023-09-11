export async function seed(knex) {
  await knex("users").insert([
    {
      id: 1,
      auth0id: "frcvfhg5e4rfg5et6rfvrgf4we",
      username: "diy slime",
      name: "Ball Guest",
    },
    {
      id: 2,
      auth0id: "sdfger5t5r4rg54trf",
      username: "tough as bricks",
      name: "Shit House",
    },
  ])
}
