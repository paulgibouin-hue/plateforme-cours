"use client";

import { useRouter } from "next/navigation";

export default function DeconnexionAdmin() {
  const router = useRouter();

  async function handleClick() {
    await fetch("/api/admin/deconnexion", { method: "POST" });
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-md border border-gold-dim px-4 py-2 font-sans text-sm text-cream/80 transition-colors hover:border-gold"
    >
      Déconnexion
    </button>
  );
}
