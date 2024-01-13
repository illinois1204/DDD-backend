import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable("sensors", (table) => {
            table.increments("id");
            table.string("model").notNullable();
            table.integer("sector").references("id").inTable("sector").onDelete("SET NULL");
        })
        .createTable("sensor-data", (table) => {
            table.increments("id");
            table.timestamp("moment").defaultTo(knex.fn.now()).notNullable();
            table.integer("ppt").notNullable();
            table.smallint("dsn");
            table.boolean("npf");
            table.integer("sensor").references("id").inTable("sensors").onDelete("CASCADE");
        });
}

export async function down(knex: Knex): Promise<void> {}
