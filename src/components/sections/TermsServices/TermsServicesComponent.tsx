import React from "react";
import parse from "html-react-parser";

interface TermsServicesProps {
  content?: {
    title?: string;
    lastUpdated?: string;
    body?: string;
  };
}

export default function TermsServicesComponent({ content }: TermsServicesProps) {
  const {
    title = "Terms and Conditions",
    lastUpdated = "October 2023",
    body = "<p>Please enter the terms and services content here.</p>",
  } = content || {};

  return (
    <section className="py-20 md:py-32 bg-white min-h-screen">
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <header className="mb-12 border-b border-slate-200 pb-8 text-center md:text-left transition-all">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              Last Updated: {lastUpdated}
            </p>
          )}
        </header>
        
        <div className="max-w-none text-slate-700 leading-relaxed
          [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-slate-900 [&_h2]:mt-10 [&_h2]:mb-4
          [&_h3]:text-xl [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:text-slate-900 [&_h3]:mt-8 [&_h3]:mb-3
          [&_p]:mb-6 [&_p]:text-base
          [&_a]:text-blue-600 [&_a]:font-medium hover:[&_a]:text-blue-800 [&_a]:transition-colors
          [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-6
          [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-6
          [&_li]:mb-2
          [&_strong]:text-slate-900
          [&>*:first-child]:mt-0
        ">
          {body ? parse(body) : <p>Loading content...</p>}
        </div>
      </div>
    </section>
  );
}
