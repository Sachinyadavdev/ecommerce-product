import React from "react";

interface ContactBannerProps {
  content?: {
    imageUrl?: string;
    altText?: string;
  };
}

export default function ContactBanner({ content }: ContactBannerProps) {
  const {
    imageUrl = "",
    altText = "Contact Banner",
  } = content || {};

  if (!imageUrl) {
    return null;
  }

  return (
    <section className="w-full mt-[85px]">
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-auto block"
        loading="eager"
      />
    </section>
  );
}
