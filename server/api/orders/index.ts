import { H3Event } from "h3";
import { ApiError, OrderRequest } from "@paypal/paypal-server-sdk";
import { ordersController } from "~/paypal-client";


interface Item {
  created_at: string;
  description: string;
  id: number;
  name: string;
  price: number;
}

// TODO: extract type for the cart item piece of shit
const createOrder = async (cart: { cart: Item[] }) => {
  const o = {
    currencyCode: "USD",
    // TODO: daily exchange rate updates
    value: (cart.cart.map(e => e.price).reduce((a, b) => a + b, 0) / 517.28).toFixed(2).toString(),
  };
  const collect = {
    body: {
      intent: "CAPTURE",
      purchaseUnits: [
        {
          amount: o,
        },
      ],
    } as OrderRequest,
    prefer: "return=minimal",
  };

  try {
    const { body, ...httpResponse } = await ordersController.ordersCreate(
      collect
    );
    // Get more response info...
    // const { statusCode, headers } = httpResponse;
    return {
      jsonResponse: JSON.stringify(body) as string,
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
  const body = await readBody<{ cart: Item[] }>(event);
  const f = await createOrder(body);
  return f?.jsonResponse;
});
