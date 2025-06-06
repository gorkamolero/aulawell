'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '34XXXXXXXXX';
  const message = encodeURIComponent(
    "Hi Amy, I'm interested in tutoring for my child. Could we discuss the available options?"
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle size={24} fill="white" />
    </a>
  );
}