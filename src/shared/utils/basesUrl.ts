export const isProduction = process.env.NODE_ENV === "production";

export const bypass =
  !isProduction && process.env.VERCEL_AUTOMATION_BYPASS_SECRET
    ? `?x-vercel-protection-bypass=${process.env.VERCEL_AUTOMATION_BYPASS_SECRET}`
    : "";

export const asaasBaseUrl = isProduction
  ? "https://api.asaas.com"
  : "https://api-sandbox.asaas.com";