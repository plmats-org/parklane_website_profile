import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";
import { swaggerDefinition } from "./definition";

const options: swaggerJsDoc.Options = {
  definition: swaggerDefinition,
  apis: ["./src/swagger/docs/*.ts"],
};

const swaggerSpec = swaggerJsDoc(options);

export const setupSwagger = (app: Application) => {
  // Add OPTIONS handler for Swagger UI
  app.options("/api-docs*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.sendStatus(200);
  });

  app.use(
    "/api-docs",
    swaggerUi.serve as any,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "Parklane API Documentation",
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        filter: true,
        tryItOutEnabled: true,
        requestInterceptor: (req: any) => {
          // Ensure requests from Swagger UI work
          req.credentials = "omit";
          return req;
        },
      },
    }) as any
  );
};

export default swaggerSpec;
