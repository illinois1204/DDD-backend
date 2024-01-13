import { FastifyStaticSwaggerOptions } from "@fastify/swagger";
import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";
import SwaggerJSDoc from "swagger-jsdoc";

const swaggerDocument = SwaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "DDD",
            version: "1.0.0",
            description: "The REST API documentation."
        },
        servers: [{ url: process.env.APP_DOMAIN }],
        components: {
            securitySchemes: {
                bearer: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
            }
        },
        security: [{ bearer: [] }]
    },
    apis: [`${process.cwd()}/external/docs/**/*.yml`, `${process.cwd()}/external/docs/**/*.yaml`]
});

export const swaggerOption: FastifyStaticSwaggerOptions = {
    mode: "static",
    specification: { document: swaggerDocument }
};

export const swaggerUiOption: FastifySwaggerUiOptions = {
    routePrefix: "docs",
    uiConfig: { docExpansion: "none" }
};
