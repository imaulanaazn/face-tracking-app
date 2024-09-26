export enum WhatsAppConnectionStatus {
  INITIALIZING = "INITIALIZING",
  QR_CODE_GENERATED = "QR_CODE_GENERATED",
  AUTHENTICATING = "AUTHENTICATING",
  READY = "READY",
  DISCONNECTED = "DISCONNECTED",
  CLOSED = "CLOSED",
  ERROR = "ERROR",
}

export enum ORDER_STATUS {
  PENDING_PAYMENT = "pending_payment",
  CANCELED = "canceled",
  COMPLETED = "completed",
  FAILED = "failed",
  PROCESSING = "processing",
  PAYMENT_EXPIRED = "payment_expired",
}

export enum PaymentAction {
  CHECKOUT_URL = "checkoutUrl",
  QR_STRING = "qrString",
  PAYMENT_CODE = "paymentCode",
}
