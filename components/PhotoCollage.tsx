import Link from "next/link";
import type { GalleryImage } from "@/lib/gallery";

// Varied span (size) + corner treatment (shape) per tile, cycled so
// neighbors don't repeat identically. Selection/order is shuffled here, at
// build time — "random" in the sense that it changes on every publish, not
// a client-side per-visit reshuffle (keeps this fully static/SEO-friendly).
const SIZE_CLASSES = ["col-span-1 row-span-1", "col-span-1 row-span-2", "col-span-2 row-span-1"];
const SHAPE_CLASSES = ["rounded-sm", "rounded-2xl", "rounded-tl-3xl rounded-br-3xl"];
const MAX_TILES = 9;

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function PhotoCollage({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) return null;

  const selected = shuffled(images).slice(0, MAX_TILES);

  return (
    <div className="mt-16">
      <Link href="/gallery" aria-label="View the full photo gallery" className="block">
        <div className="grid grid-flow-row-dense grid-cols-2 auto-rows-[80px] gap-3 sm:grid-cols-3 sm:auto-rows-[100px] md:grid-cols-4 md:auto-rows-[110px]">
          {selected.map((img, i) => (
            <div
              key={img.id}
              className={`collage-item overflow-hidden ${SIZE_CLASSES[i % SIZE_CLASSES.length]} ${SHAPE_CLASSES[i % SHAPE_CLASSES.length]}`}
              style={{ animationDelay: `${(i % 6) * 0.4}s` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.alt} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </Link>
      <div className="mt-6 text-center">
        <Link
          href="/gallery"
          className="text-xs uppercase tracking-widest text-foreground transition-colors hover:text-accent"
        >
          See the full gallery →
        </Link>
      </div>
    </div>
  );
}
