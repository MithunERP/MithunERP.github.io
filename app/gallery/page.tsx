import { getGalleryImages } from "@/lib/gallery";
import Reveal from "@/components/Reveal";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Gallery — MithunERP",
  "The full MithunERP photography gallery.",
);

const SIZE_CLASSES = ["col-span-1 row-span-1", "col-span-1 row-span-2", "col-span-2 row-span-1"];
const SHAPE_CLASSES = ["rounded-sm", "rounded-2xl", "rounded-tl-3xl rounded-br-3xl"];

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-xs uppercase tracking-[0.3em] font-bold text-accent">Gallery</p>
      <h1 className="mt-4 font-display text-3xl text-foreground md:text-5xl">
        Photography, in full.
      </h1>

      <div className="mt-12">
        {images.length === 0 ? (
          <p className="text-sm text-muted">No photos published yet.</p>
        ) : (
          <Reveal>
            <div className="grid grid-flow-row-dense grid-cols-2 auto-rows-[90px] gap-3 sm:grid-cols-3 sm:auto-rows-[120px] md:grid-cols-4 md:auto-rows-[140px]">
              {images.map((img, i) => (
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
          </Reveal>
        )}
      </div>
    </div>
  );
}
