import "server-only";

import { products } from "../data/products";

const CHAPA_API = "https://api.chapa.co/v1";

export type CartLine = {
  id: number;
  quantity: number;
};

export function getChapaSecret() {
  const secret = process.env.CHAPA_SECRET_KEY?.trim();
  if (!secret) throw new Error("CHAPA_NOT_CONFIGURED");
  if (!secret.startsWith("CHASECK_TEST-")) throw new Error("CHAPA_TEST_KEY_REQUIRED");
  return secret;
}

export function calculateOrder(lines: CartLine[]) {
  if (!Array.isArray(lines) || lines.length === 0) throw new Error("EMPTY_CART");

  return lines.reduce((order, line) => {
    if (!Number.isInteger(line.id) || !Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > 20) {
      throw new Error("INVALID_CART");
    }

    const product = products.find((entry) => entry.id === line.id);
    if (!product) throw new Error("INVALID_PRODUCT");

    order.amount += product.price * line.quantity;
    order.items.push({ name: product.name, quantity: line.quantity });
    return order;
  }, { amount: 0, items: [] as Array<{ name: string; quantity: number }> });
}

export function chapaEndpoint(path: string) {
  return `${CHAPA_API}${path}`;
}

export function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("251") && digits.length === 12) return `0${digits.slice(3)}`;
  return digits;
}

export function isValidEthiopianPhone(value: string) {
  return /^0[79]\d{8}$/.test(value);
}

export function isValidTransactionReference(value: string) {
  return /^[A-Za-z0-9_-]{8,100}$/.test(value);
}
