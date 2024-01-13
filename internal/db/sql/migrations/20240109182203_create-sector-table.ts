import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("sector", (table) => {
        table.increments("id");
        table.string("name").notNullable();
        table.integer("area").checkPositive().notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {}
