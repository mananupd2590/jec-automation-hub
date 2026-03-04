export const WHATSAPP_NUMBER = "919428673969";
export const EMAIL = "jalaramengcorp@gmail.com";
export const WHATSAPP_BASE =
  "https://wa.me/919428673969?text=" +
  encodeURIComponent(
    "Hello Jalaram Automation, I want to inquire about industrial sensors/automation products. My requirement is:"
  );

export const brands = [
  "Carlo Gavazzi",
  "Takex",
  "Lanbao",
  "Datalogic",
  "Omron",
  "Panasonic",
  "Gefran",
  "Autonics",
  "Mitsubishi",
  "Lika",
  "Rechner Sensors",
] as const;

export type BrandName = (typeof brands)[number];

export interface ProductCategory {
  key: string;
  name: string;
  subtypes: string[];
}

export const productCategories: ProductCategory[] = [
  {
    key: "sensors",
    name: "Industrial Sensors",
    subtypes: ["Inductive", "Capacitive", "Photoelectric", "Level", "Magnetic", "Pressure"],
  },
  {
    key: "plc",
    name: "PLC / Control Systems",
    subtypes: ["Micro PLC", "Modular PLC", "PLC Accessories", "I/O Modules"],
  },
  {
    key: "hmi",
    name: "HMI Panels",
    subtypes: ["Touch Panel HMI", "Text Display HMI", "HMI Software", "HMI Accessories"],
  },
  {
    key: "vfd",
    name: "VFD / Drives",
    subtypes: ["AC Drives", "Servo Drives", "Servo Motors", "Drive Accessories"],
  },
  {
    key: "ssr",
    name: "SSR & Relays",
    subtypes: ["Solid State Relays", "Power Relays", "Safety Relays", "Relay Sockets"],
  },
  {
    key: "timers",
    name: "Timers & Counters",
    subtypes: ["Digital Timers", "Analog Timers", "Counters", "Tachometers"],
  },
  {
    key: "energy",
    name: "Energy Meters",
    subtypes: ["Power Meters", "Energy Analyzers", "Current Transformers", "Panel Meters"],
  },
  {
    key: "encoders",
    name: "Encoders",
    subtypes: ["Rotary Encoders", "Linear Encoders", "Absolute Encoders", "Incremental Encoders"],
  },
  {
    key: "switches",
    name: "Industrial Switches",
    subtypes: ["Limit Switches", "Toggle Switches", "Safety Switches", "Push Buttons"],
  },
  {
    key: "accessories",
    name: "Automation Accessories",
    subtypes: ["Connectors", "Cables", "Brackets", "Mounting Hardware"],
  },
  {
    key: "custom",
    name: "Custom Sourcing",
    subtypes: [],
  },
];

export function buildWhatsAppUrl(category?: string, brand?: string, productType?: string) {
  let msg = "Hello Jalaram Automation, I want to inquire about";
  if (brand) msg += ` ${brand}`;
  if (category) msg += ` ${category}`;
  if (productType) msg += ` - ${productType}`;
  msg += ". My requirement is:";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export function buildMailtoUrl(data: {
  name: string;
  company?: string;
  phone: string;
  email?: string;
  category?: string;
  brand?: string;
  productType?: string;
  message: string;
  quantity?: string;
}) {
  const subject = `Quote Request | ${data.category || "General"} | ${data.brand || "Any"} | ${data.name} | ${data.phone}`;
  const body = [
    `Name: ${data.name}`,
    data.company ? `Company: ${data.company}` : "",
    `Phone: ${data.phone}`,
    data.email ? `Email: ${data.email}` : "",
    `Category: ${data.category || "Not specified"}`,
    `Brand: ${data.brand || "Not specified"}`,
    data.productType ? `Product Type: ${data.productType}` : "",
    data.quantity ? `Quantity: ${data.quantity}` : "",
    `\nRequirement:\n${data.message}`,
    `\nTimestamp: ${new Date().toLocaleString()}`,
  ]
    .filter(Boolean)
    .join("\n");

  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
