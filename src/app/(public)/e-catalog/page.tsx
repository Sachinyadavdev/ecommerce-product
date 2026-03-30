import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "E-Catalogue | Besmak India",
  description:
    "Browse the Besmak India product catalogue online — flip through our comprehensive range of engineering components and solutions.",
  openGraph: {
    title: "E-Catalogue | Besmak India",
    description:
      "Browse the Besmak India product catalogue online with an interactive flipbook experience.",
  },
};

const PDF_URL =
  "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Besmak-catalogue-Size-2.pdf";

// Dynamic import with ssr:false is required because:
// - react-pageflip uses HTML5 Canvas (browser-only)
// - pdfjs-dist uses browser APIs that throw in Node/SSR context
const ECatalogViewer = dynamic(
  () => import("@/components/sections/ECatalog/ECatalogViewer"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          minHeight: "calc(100vh - 70px)",
          background: "linear-gradient(160deg, #0b1829 0%, #112240 40%, #1a3a6b 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div style={{ width: "200px", height: "4px", background: "rgba(255,255,255,0.12)", borderRadius: "4px", overflow: "hidden" }}>
          <div style={{ height: "100%", background: "linear-gradient(90deg, #00A758, #284B8C)", animation: "none", width: "60%" }} />
        </div>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Loading Catalogue…
        </p>
      </div>
    ),
  }
);

export default function ECatalogPage() {
  return (
    <div className="e-catalog-page">
      <ECatalogViewer pdfUrl={PDF_URL} />
    </div>
  );
}

