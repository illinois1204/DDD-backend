import { FastifyStaticSwaggerOptions } from "@fastify/swagger";
import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";
import SwaggerJSDoc from "swagger-jsdoc";
import { HandlingErrorType } from "../../../internal/common/enums/errors";

// prettier-ignore
const errorTypes = Object.values(HandlingErrorType).map((i) => `<li>${i}</li>`).join("");
const swaggerDocument = SwaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "DDD",
            version: "1.0.0",
            description: "<h3>The REST API documentation.</h3>" + "<b>Available error types:</b>" + `<ul>${errorTypes}</ul>`
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
