import Link from 'next/link';

interface PartnershipsHeroProps {
  content?: {
    title?: string;
    breadcrumbs?: Array<{ label: string; url?: string }>;
    bgImage?: string;
  };
}

export default function PartnershipsHero({ content }: PartnershipsHeroProps) {
  const {
    title = "Strong Partnerships. Smarter Automotive Solutions.",
    breadcrumbs = [
      { label: "Home", url: "/" },
      { label: "Discover Us" },
      { label: "Partnerships" }
    ],
    bgImage = "https://images.unsplash.com/photo-1521295121683-b7d7293b0dfb?q=80&w=2000&auto=format&fit=crop"
  } = content || {};

  return (
    <div
      className="w-full h-[400px] flex items-end pb-[60px] relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 z-0 bg-black/40"></div>

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
                <span className="text-[#ffffff] font-medium">{crumb.label}</span>
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
