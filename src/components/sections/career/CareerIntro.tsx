"use client";

interface TextStyle {
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  color: string;
  textAlign: "left" | "center" | "right";
}

interface ContentItem {
  id: string;
  text: string;
  style: TextStyle;
}

interface CareerIntroProps {
  content?: {
    title?: string | { text: string; style: TextStyle };
    paragraphs?: ContentItem[];
    // Legacy support
    line1?: string;
    line2?: string;
    line3?: string;
    line4?: string;
  };
}

export default function CareerIntro({ content }: CareerIntroProps) {
  // Support for both new structured title and legacy string title
  const defaultTitleStyle: TextStyle = { 
    color: "#00469B", 
    fontWeight: "900", 
    fontSize: "36px", 
    textAlign: "center" as const,
    lineHeight: "1.2"
  };

  const titleObj = typeof content?.title === 'object' && content?.title !== null
    ? content.title 
    : { text: content?.title || "", style: defaultTitleStyle };

  // Support for both new structured paragraphs and legacy lines
  const paragraphs = Array.isArray(content?.paragraphs) 
    ? content.paragraphs 
    : [
        { id: "l1", text: content?.line1 || "", style: { fontSize: "18px", fontWeight: "400", lineHeight: "32px", color: "#4B5563", textAlign: "center" as const } },
        { id: "l2", text: content?.line2 || "", style: { fontSize: "18px", fontWeight: "400", lineHeight: "32px", color: "#4B5563", textAlign: "center" as const } },
        { id: "l3", text: content?.line3 || "", style: { fontSize: "18px", fontWeight: "400", lineHeight: "32px", color: "#4B5563", textAlign: "center" as const } },
        { id: "l4", text: content?.line4 || "", style: { fontSize: "18px", fontWeight: "400", lineHeight: "32px", color: "#4B5563", textAlign: "center" as const } },
      ].filter(p => p.text);

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-6">
          {titleObj.text && (
            <h2 
              className="mb-8"
              style={{
                color: titleObj.style.color,
                fontWeight: titleObj.style.fontWeight,
                fontSize: titleObj.style.fontSize,
                textAlign: titleObj.style.textAlign,
                lineHeight: titleObj.style.lineHeight || "1.2"
              }}
            >
              {titleObj.text}
            </h2>
          )}
          
          <div className="space-y-6">
            {paragraphs.map((p) => (
              <p
                key={p.id}
                style={{
                  fontSize: p.style.fontSize,
                  fontWeight: p.style.fontWeight,
                  lineHeight: p.style.lineHeight,
                  color: p.style.color,
                  textAlign: p.style.textAlign
                }}
              >
                {p.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
