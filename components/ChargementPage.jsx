export default function ChargementPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 py-24">
      <span className="flex h-12 w-12 animate-pulse items-center justify-center rounded-lg border border-gold-dim bg-gold/10 font-display text-lg text-gold">
        P
      </span>
      <span className="h-1 w-24 overflow-hidden rounded-full bg-navy-light">
        <span className="block h-full w-1/3 animate-[chargement-glisse_1.1s_ease-in-out_infinite] rounded-full bg-gold" />
      </span>
    </div>
  );
}
