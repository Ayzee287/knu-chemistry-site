import { cn } from "@/lib/utils";

type FigureProps = {
  /** Subject label shown in the caption bar — reads as a documentary figure caption. */
  caption: string;
  /** Optional plate index, e.g. "01". */
  index?: string;
  /** Tailwind aspect-ratio class. */
  ratio?: string;
  className?: string;
};

/**
 * Reserved documentary plate. Renders as an intentional, captioned figure zone
 * — a matted frame awaiting photography — until a real image is supplied.
 * A future <img> drops in as the first child (absolute inset-0 object-cover)
 * without changing the layout.
 */
export function Figure({
  caption,
  index,
  ratio = "aspect-[4/3]",
  className,
}: FigureProps) {
  return (
    <figure
      className={cn(
        "relative overflow-hidden border border-navy/10 bg-navy/[0.04] transition-colors hover:border-navy/20",
        ratio,
        className,
      )}
    >
      {/* Architectural mat frame — signals a designed, reserved plate, not an empty box. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-4 bottom-[3.25rem] border border-navy/[0.07]"
      />
      {index ? (
        <span className="absolute left-7 top-7 font-serif text-sm tabular-nums text-navy/40">
          {index}
        </span>
      ) : null}
      <figcaption className="absolute inset-x-0 bottom-0 border-t border-navy/10 bg-ivory px-5 py-3 text-xs uppercase tracking-[0.16em] text-slate">
        {caption}
      </figcaption>
    </figure>
  );
}
