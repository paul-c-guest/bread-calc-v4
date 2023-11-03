/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = (knex) => {
  return knex.schema.createTable("overrides", (table) => {
    table.integer("flourId").references("flours.id")
    table.string("owner")
    table.integer("hydration")
    table.string("name")
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => {
  return knex.schema.dropTable("overrides")
}
