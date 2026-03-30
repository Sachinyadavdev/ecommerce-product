import Link from "next/link";

interface BannerImageProps {
  content?: {
    title?: string;
    breadcrumbs?: Array<{ label: string; url?: string }>;
    bgImage?: string;
    /** @deprecated use bgImage */
    bgImageUrl?: string;
  };
}

export default function BannerImage({ content }: BannerImageProps) {
  const {
    title = "About",
    breadcrumbs = [
      { label: "Home", url: "/" },
      { label: "Discover Us" },
      { label: "At a Glance" },
    ],
    bgImage,
    bgImageUrl,
  } = content || {};

  const finalBgImage =
    bgImage ||
    bgImageUrl ||
    "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/at%20a%20glance%20bannner.png";

  return (
    <div
      className="w-full h-[400px] flex items-center relative bg-cover bg-center bg-no-repeat mt-[85px]"
      style={{ backgroundImage: `url(${finalBgImage})` }}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="text-[16px] mb-2 flex items-center gap-2">
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-white mx-1">/</span>}
              {crumb.url ? (
                <Link
                  href={crumb.url}
                  className="text-white font-bold hover:text-[#ffffff] transition-colors cursor-pointer"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#ffffff] font-medium">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </div>

        <h1 className="text-[45px]! font-bold text-white tracking-tight mt-2">
          {title}
        </h1>
      </div>
    </div>
  );
}
