export const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Parklane Backend API",
    version: "1.0.0",
    description:
      "API documentation for Parklane Backend - Authentication and User Management",
    contact: {
      name: "Parklane Team",
      email: "info@plmats.com",
    },
  },
  servers: [
    {
      url: "http://localhost:8000/api",
      description: "Development server",
    },
    {
      url: "https://parklane-website-profile.onrender.com/api",
      description: "Production server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Error: {
        type: "object",
        properties: {
          status: {
            type: "string",
            example: "error",
          },
          message: {
            type: "string",
            example: "Error message",
          },
          statusCode: {
            type: "number",
            example: 400,
          },
        },
      },
      User: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "507f1f77bcf86cd799439011",
          },
          first_name: {
            type: "string",
            example: "John",
          },
          last_name: {
            type: "string",
            example: "Doe",
          },
          email: {
            type: "string",
            example: "john@example.com",
          },
          role: {
            type: "string",
            enum: ["super_admin", "admin"],
            example: "admin",
          },
          phone: {
            type: "string",
            example: "+243123456789",
          },
          status: {
            type: "string",
            enum: ["active", "inactive"],
            example: "active",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};
