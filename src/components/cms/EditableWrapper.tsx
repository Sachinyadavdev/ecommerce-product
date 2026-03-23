"use client";

import { useState } from "react";
import { Edit2 } from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";
import SectionEditor from "./SectionEditor";
import ClientsSectionEditor from "./ClientsSectionEditor";
import EventsAchievementsEditor from "./EventsAchievementsEditor";
import TwoCardsSectionEditor from "./TwoCardsSectionEditor";
import VideoSectionEditor from "./VideoSectionEditor";
import NewsSectionEditor from "./NewsSectionEditor";
import CareerFormEditor from "./CareerFormEditor";
import CareerIntroEditor from "./CareerIntroEditor";
import ContactFormEditor from "./ContactFormEditor";
import ContactInfoEditor from "./ContactInfoEditor";
import ContactAddressEditor from "./ContactAddressEditor";
import ContactHeroEditor from "./ContactHeroEditor";

interface EditableWrapperProps {
  sectionId: string;
  type: string;
  content: any;
  children: React.ReactNode;
  onUpdate?: () => void;
  readonly?: boolean;
}

export default function EditableWrapper({
  sectionId,
  type,
  content,
  children,
  onUpdate,
  readonly = false,
}: EditableWrapperProps) {
  const { isAdmin } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);

  if (!isAdmin || readonly) return <>{children}</>;

  return (
    <div className="relative group">
      {/* Absolute overlay border to avoid layout shifts/lines */}
      <div className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover:border-blue-500/30 transition-colors z-30" />
      
      <button
        onClick={() => setIsEditing(true)}
        className="absolute top-4 right-4 z-50 p-2 bg-blue-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
        title="Edit Section"
      >
        <Edit2 className="h-5 w-5" />
      </button>

      {children}

      {isEditing && (type === "clients-section" || type === "about-clients") && (
        <ClientsSectionEditor
          sectionId={sectionId}
          content={content}
          onClose={() => setIsEditing(false)}
          onSave={() => {
            setIsEditing(false);
            onUpdate?.();
          }}
        />
      )}

      {isEditing && type === "events-achievements" && (
        <EventsAchievementsEditor
          sectionId={sectionId}
          content={content}
          onClose={() => setIsEditing(false)}
          onSave={() => {
            setIsEditing(false);
            onUpdate?.();
          }}
        />
      )}

      {isEditing && type === "dual-cards-section" && (
        <TwoCardsSectionEditor
          sectionId={sectionId}
          content={content}
          onClose={() => setIsEditing(false)}
          onSave={() => {
            setIsEditing(false);
            onUpdate?.();
          }}
        />
      )}

      {isEditing && type === "video-section" && (
        <VideoSectionEditor
          sectionId={sectionId}
          content={content}
          onClose={() => setIsEditing(false)}
          onSave={() => {
            setIsEditing(false);
            onUpdate?.();
          }}
        />
      )}

      {isEditing && type === "news-section" && (
        <NewsSectionEditor
          sectionId={sectionId}
          content={content}
          onClose={() => setIsEditing(false)}
          onSave={() => {
            setIsEditing(false);
            onUpdate?.();
          }}
        />
      )}

      {isEditing && (type === "career-form" || type === "career-form-section") && (
        <CareerFormEditor
          sectionId={sectionId}
          content={content}
          onClose={() => setIsEditing(false)}
          onSave={() => {
            setIsEditing(false);
            onUpdate?.();
          }}
        />
      )}

      {isEditing && type === "career-intro" && (
        <CareerIntroEditor
          sectionId={sectionId}
          content={content}
          onClose={() => setIsEditing(false)}
          onSave={() => {
            setIsEditing(false);
            onUpdate?.();
          }}
        />
      )}

      {isEditing && (type === "contact-form") && (
        <ContactFormEditor
          sectionId={sectionId}
          content={content}
          onClose={() => setIsEditing(false)}
          onSave={() => {
            setIsEditing(false);
            onUpdate?.();
          }}
        />
      )}

      {isEditing && (type === "contact-info") && (
        <ContactInfoEditor
          sectionId={sectionId}
          content={content}
          onClose={() => setIsEditing(false)}
          onSave={() => {
            setIsEditing(false);
            onUpdate?.();
          }}
        />
      )}

      {isEditing && (type === "contact-address") && (
        <ContactAddressEditor
          sectionId={sectionId}
          content={content}
          onClose={() => setIsEditing(false)}
          onSave={() => {
            setIsEditing(false);
            onUpdate?.();
          }}
        />
      )}

      {(isEditing && type === "contact-hero") && (
        <ContactHeroEditor
          sectionId={sectionId}
          content={content}
          onClose={() => setIsEditing(false)}
          onSave={() => {
            setIsEditing(false);
            onUpdate?.();
          }}
        />
      )}

      {isEditing && !["clients-section", "about-clients", "events-achievements", "dual-cards-section", "video-section", "news-section", "career-form", "career-form-section", "career-intro", "contact-form", "contact-info", "contact-address", "contact-hero"].includes(type) && (
        <SectionEditor
          sectionId={sectionId}
          type={type}
          content={content}
          onClose={() => setIsEditing(false)}
          onSave={() => {
            setIsEditing(false);
            onUpdate?.();
          }}
        />
      )}
    </div>
  );
}
