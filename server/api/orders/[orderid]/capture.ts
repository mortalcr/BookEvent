import { ApiError } from "@paypal/paypal-server-sdk";
import { H3Event } from "h3";
import { ordersController } from "~/paypal-client";


const captureOrder = async (orderID: string) => {
  const collect = {
    id: orderID,
    prefer: "return=minimal",
  };

  try {
    const { body, ...httpResponse } = await ordersController.ordersCapture(
      collect
    );
    // Get more response info...
    // const { statusCode, headers } = httpResponse;
    return {
      jsonResponse: JSON.parse(body as string),
      httpStatusCode: httpResponse.statusCode,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      // const { statusCode, headers } = error;
      throw new Error(error.message);
    }
  }
};

export default defineEventHandler(async (event: H3Event) => {
  const orderId = getRouterParam(event, "orderid") as string;
  const f = await captureOrder(orderId);
  return f?.jsonResponse;
});
