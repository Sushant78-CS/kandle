export interface WhatsAppOrderItem {
  name: string;
  price: number;
  quantity: number;
}

export interface WhatsAppOrderData {
  customerName: string;
  phone: string;
  address: string;
  note?: string;
  items: WhatsAppOrderItem[];
  total: number;
}

// ============================================================
// GENERATE ORDER MESSAGE
// ============================================================

export function generateWhatsAppOrderMessage(order: WhatsAppOrderData): string {
  const itemsText = order.items
    .map((item) => {
      const itemTotal = item.price * item.quantity;

      return `• ${item.name} × ${item.quantity} — ₹${itemTotal}`;
    })
    .join("\n");

  let message = `🕯️ *New Kandle Order*

*Customer Details*
Name: ${order.customerName}
Phone: ${order.phone}
Address: ${order.address}

*Order Items*
${itemsText}

*Total: ₹${order.total}`;

  if (order.note?.trim()) {
    message += `

*Note*
${order.note.trim()}`;
  }

  message += `

Please confirm my order.`;

  return message;
}

// ============================================================
// OPEN WHATSAPP
// ============================================================

export function openWhatsAppOrder(order: WhatsAppOrderData): void {
  const message = generateWhatsAppOrderMessage(order);

  const encodedMessage = encodeURIComponent(message);

  const whatsappUrl = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}
