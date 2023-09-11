/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = (knex) => {
  return knex.schema.createTable("overrides", (table) => {
    table.integer("flourId").references("flours.id")
    table.integer("userId").references("users.id")
    table.integer("hydrationOverride")
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => {
  return knex.schema.dropTable("overrides")
}
