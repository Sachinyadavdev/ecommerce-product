import Link from "next/link";

interface ValuesGovernanceHeroProps {
  content?: {
    title?: string;
    breadcrumbs?: Array<{ label: string; url?: string }>;
    bgImage?: string;
  };
}

export default function ValuesGovernanceHero({
  content,
}: ValuesGovernanceHeroProps) {
  const {
    title = "Our Values & Governance",
    breadcrumbs = [
      { label: "Home", url: "/" },
      { label: "Discover Us" },
      { label: "Our Values & Governance" },
    ],
    bgImage = "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop",
  } = content || {};

  return (
    <div
      className="w-full h-[400px] flex items-center relative bg-cover bg-center bg-no-repeat mt-[85px]"
      style={{ backgroundImage: `url(${bgImage})` }}
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
