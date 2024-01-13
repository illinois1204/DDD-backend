import { Knex } from "knex";

export type WhereBuilderFactory<T extends {}> = (plotter: Knex.QueryBuilder<T>) => Knex.QueryBuilder<T, any>;
