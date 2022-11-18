import { getPaymentData, processPayment } from "@/controllers/payments-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { paymentShcema } from "@/schemas/payments-shcemas";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPaymentData)
  .post("/process", validateBody(paymentShcema), processPayment);

export { paymentsRouter };
