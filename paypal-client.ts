import { Client, Environment, LogLevel, OrdersController } from "@paypal/paypal-server-sdk";

export const client = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: process.env.VITE_PAYPAL_CLIENT_ID as string,
    oAuthClientSecret: process.env.PAYPAL_SECRET as string,
  },
  environment: Environment.Sandbox,
  logging: {
    logLevel: LogLevel.Info,
    logRequest: { logBody: true },
    logResponse: { logHeaders: true },
  }
});

export const ordersController = new OrdersController(client);
