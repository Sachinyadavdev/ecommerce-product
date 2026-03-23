import { query } from "@/lib/db";
import { notFound } from "next/navigation";
import EventDetail from "@/components/sections/events/EventDetail";
import type { Metadata } from "next";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const events = await query<any[]>(
      "SELECT title, subtitle, thumbnail FROM events WHERE slug = ? LIMIT 1",
      [params.slug]
    );
    const event = events?.[0];
    if (!event) return { title: "Event | Besmak India" };
    return {
      title: `${event.title} | Besmak India Events`,
      description: event.subtitle || `Details for ${event.title}`,
      openGraph: event.thumbnail ? { images: [event.thumbnail] } : undefined,
    };
  } catch {
    return { title: "Event | Besmak India" };
  }
}

export default async function EventDetailPage({ params }: PageProps) {
  let event: any = null;

  try {
    const events = await query<any[]>(
      "SELECT * FROM events WHERE slug = ? LIMIT 1",
      [params.slug]
    );
    event = events?.[0] || null;
  } catch (err) {
    console.error("[EventDetailPage] Failed to fetch event:", err);
  }

  if (!event || !event.isActive) {
    notFound();
  }

  return <EventDetail event={event} />;
}
