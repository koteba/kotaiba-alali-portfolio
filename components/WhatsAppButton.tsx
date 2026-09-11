'use client';

import { MessageCircle } from 'lucide-react';
import { useContent } from '@/lib/content-context';

export function WhatsAppButton() {
  const { content } = useContent();
  const phone = content.social.phone.replace(/\D/g, '');

  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact on WhatsApp"
      title="WhatsApp"
      className="fixed bottom-5 end-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" />
    </a>
  );
}
