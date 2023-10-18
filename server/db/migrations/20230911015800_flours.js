/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = (knex) => {
  return knex.schema.createTable("flours", (table) => {
    table.increments("id").primary()
    table.string("name")
    table.integer("defaultHydration")
    table.boolean("isGlutenFree")
    table.string("owner")
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => {
  return knex.schema.dropTable("flours")
}
