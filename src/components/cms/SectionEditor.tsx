"use client";

import { useState } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface SectionEditorProps {
  sectionId: string;
  type: string;
  content: any;
  onClose: () => void;
  onSave: () => void;
}

export default function SectionEditor({
  sectionId,
  type,
  content,
  onClose,
  onSave,
}: SectionEditorProps): JSX.Element {
  const [editedContent, setEditedContent] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/cms/sections/${sectionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editedContent }),
      });

      if (!response.ok) throw new Error("Failed to save changes");

      toast.success("Section updated successfully");
      onSave();
    } catch (error) {
      console.error(error);
      toast.error("Error saving changes");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setEditedContent((prev: any) => ({ ...prev, [key]: value }));
  };

  const standardFields: Record<string, string[]> = {
    "card-grid": ["title", "subtitle"],
    "strategic-verticals": ["heading", "subheading"],
    hero: ["title", "subtitle", "ctaText", "ctaLink"],
    about: ["title", "subtitle", "description"],
    "about-hero": ["title", "description"],
    "about-content": ["title", "description1", "description2"],
    "overview-section": [
      "title",
      "description",
      "image1",
      "image2",
      "visionBadge",
      "visionDescription",
      "missionBadge",
      "missionDescription",
      "missionItem1",
      "missionItem2",
      "missionItem3",
    ],
    "vision-and-mission": [
      "title",
      "description",
      "image1",
      "image2",
      "visionBadge",
      "visionDescription",
      "missionBadge",
      "missionDescription",
      "missionItem1",
      "missionItem2",
      "missionItem3",
    ],
    "about-capabilities": [
      "leftTitle",
      "leftDescription",
      "leftRow1Label",
      "leftRow1Value",
      "leftRow2Label",
      "leftRow2Value",
      "leftRow3Label",
      "leftRow3Value",
      "rightTitle",
      "rightDescription",
      "rightRow1Label",
      "rightRow1Value",
      "rightRow2Label",
      "rightRow2Value",
      "rightRow3Label",
      "rightRow3Value",
    ],
    "about-feature-cards": [
      "card1Icon",
      "card1Title",
      "card1Description",
      "card1Tags",
      "card1Theme",
      "card2Icon",
      "card2Title",
      "card2Description",
      "card2Tags",
      "card2Theme",
      "card3Icon",
      "card3Title",
      "card3Description",
      "card3Tags",
      "card3Theme",
    ],
    "about-icon-boxes": [
      "box1Icon",
      "box1Title",
      "box1Description",
      "box2Icon",
      "box2Title",
      "box2Description",
      "box3Icon",
      "box3Title",
      "box3Description",
    ],
    "about-banner-image": ["title", "bgImage"],
    "company-overview-detailed": ["topTitle", "title", "mainTitle", "overviewImage", "componentsSubtitle", "component1", "component2", "component3", "component4", "component5", "component6", "strengthsTopTitle", "strengthsMainTitle", "strength1", "strength2", "strength3", "strength4", "strength5", "strength6", "strength7", "strength8", "stat1Value", "stat1Label", "stat2Value", "stat2Label", "stat3Value", "stat3Label"],
    "founders-message": ["topTitle", "mainTitle", "quote", "para1", "para2", "para3", "name", "founderRole", "imageUrl", "badge1", "badge2", "badge3", "badge4"],
    "about-clients": ["title", "logos", "bgColor"],
    "about-milestones": [
      "topTitle", "title", "description", "badgeTitle",
      "year1", "text1", "year2", "text2", "year3", "text3", "year4", "text4", "year5", "text5",
      "year6", "text6", "year7", "text7", "year8", "text8", "year9", "text9", "year10", "text10",
      "year11", "text11", "year12", "text12", "year13", "text13", "year14", "text14", "year15", "text15",
      "year16", "text16", "year17", "text17", "year18", "text18", "year19", "text19", "year20", "text20"
    ],
    "our-presence": ["subtitle", "title", "badgeText", "description", "loc1Title", "loc1Items", "loc1Image", "loc2Title", "loc2Items", "loc2Image", "loc3Title", "loc3Items", "loc3Image", "loc4Title", "loc4Items", "loc4Image"],
    "stats-section": ["stat1_value", "stat1_label", "stat2_value", "stat2_label", "stat3_value", "stat3_label", "stat4_value", "stat4_label"],
    "contact-form": [
      "topText",
      "heading",
      "description",
      "div1_name",
      "div2_name",
      "div3_name",
      "div4_name",
      "nameLabel",
      "emailLabel",
      "subjectLabel",
      "mobileLabel",
      "addressLabel",
      "messageLabel",
      "buttonText",
    ],
    "contact-hero": ["title", "description", "bgImage"],
    "contact-address": [
      "topText",
      "heading",
      "bgHeading",
      "card1_header",
      "card1_title",
      "card1_city",
      "card1_address",
      "card1_phone",
      "card1_email",
      "card2_header",
      "card2_title",
      "card2_city",
      "card2_address",
      "card2_footer",
      "card3_header",
      "card3_title",
      "card3_city",
      "card3_address",
      "card3_footer",
      "bottom_header",
      "bottom_address",
      "wh_topText",
      "wh_heading",
      "wh1_title",
      "wh1_city",
      "wh1_badge",
      "wh1_address",
      "wh2_title",
      "wh2_city",
      "wh2_badge",
      "wh2_address",
      "wh2_phone",
      "wh2_email",
      "wh3_title",
      "wh3_city",
      "wh3_badge",
      "wh3_address",
      "wh3_phone",
      "wh3_email",
    ],
    "contact-info": [
      "heading",
      "subHeading",
      "bgText",
      "bottom_header",
      "bottom_address",
    ],
    "product-category-list": ["title", "subtitle"],
    "divisions-list": ["title", "subtitle"],
    "events-list": ["title", "description"],
    "cs-hero": [
      "title",
      "subtitle",
      "backgroundImage",
      "backgroundVideo",
      "ctaText",
      "ctaLink",
    ],
    "cs-overview": [
      "title",
      "description",
      "image1",
      "image2",
      "stat1Value",
      "stat1Label",
      "stat2Value",
      "stat2Label",
    ],
    "cs-infrastructure": [
      "title",
      "item1Title",
      "item1Description",
      "item1Icon",
      "item2Title",
      "item2Description",
      "item2Icon",
      "item3Title",
      "item3Description",
      "item3Icon",
      "item4Title",
      "item4Description",
      "item4Icon",
    ],
    "cs-products": ["title", "segmentsTitle", "segments", "backgroundImage"],
    "cs-achievements": ["title", "subtitle", "achievements", "image"],
    "career-hero": ["title", "bannerImage"],
    "career-intro": ["title", "line1", "line2", "line3", "line4"],
    "career-form": ["title"],
    "ep-hero": [
      "title",
      "subtitle",
      "tagline",
      "backgroundImage",
      "backgroundVideo",
      "ctaText",
      "ctaLink",
    ],
    "ep-about": ["title", "description", "image"],
    "ep-quality": [
      "title",
      "description",
      "backgroundImage",
      "item1Name",
      "item1Description",
      "item2Name",
      "item2Description",
      "item3Name",
      "item3Description",
    ],
    "ep-products": [
      "title",
      "industriesTitle",
      "industriesDescription",
      "seg1Name",
      "seg1Link",
      "seg2Name",
      "seg2Link",
      "seg3Name",
      "seg3Link",
      "seg4Name",
      "seg4Link",
      "seg5Name",
      "seg5Link",
      "seg6Name",
      "seg6Link",
      "seg7Name",
      "seg7Link",
      "seg8Name",
      "seg8Link",
      "seg9Name",
      "seg9Link",
    ],
    "ps-capabilities": [
      "title",
      "subtitle",
      "p1Title",
      "p1Desc",
      "p2Title",
      "p2Desc",
      "p3Title",
      "p3Desc",
      "p4Title",
      "p4Desc",
    ],
    "ps-stats": [
      "stat1Label",
      "stat1Value",
      "stat1Icon",
      "stat1Sub",
      "stat2Label",
      "stat2Value",
      "stat2Icon",
      "stat2Sub",
      "stat3Label",
      "stat3Value",
      "stat3Icon",
      "stat3Sub",
      "stat4Label",
      "stat4Value",
      "stat4Icon",
      "stat4Sub",
    ],
    "ep-why": [
      "title",
      "description",
      "pt1Title",
      "pt1Desc",
      "pt2Title",
      "pt2Desc",
      "pt3Title",
      "pt3Desc",
      "pt4Title",
      "pt4Desc",
      "pt5Title",
      "pt5Desc",
      "pt6Title",
      "pt6Desc",
    ],
    "ps-why": [
      "title",
      "description",
      "visionTitle",
      "summary",
      "usp1Title",
      "usp2Title",
      "usp3Title",
      "usp4Title",
      "usp5Title",
      "usp6Title",
    ],
    "ep-commitment": ["title", "description"],
    "ep-capabilities": [
      "title",
      "subtitle",
      "cap1Title",
      "cap1Description",
      "cap1Icon",
      "cap2Title",
      "cap2Description",
      "cap2Icon",
      "cap3Title",
      "cap3Description",
      "cap3Icon",
    ],
    "ep-infrastructure": [
      "title",
      "description",
      "image",
      "techTitle",
      "techDescription",
      "item1Title",
      "item1Size",
      "item1Location",
      "item1Status",
      "item2Title",
      "item2Size",
      "item2Location",
      "item2Status",
      "item3Title",
      "item3Size",
      "item3Location",
      "item3Status",
    ],
    "cnh-design": [
      "title",
      "description",
      "backgroundImage",
      "sw1Name",
      "sw1Description",
      "sw2Name",
      "sw2Description",
      "sw3Name",
      "sw3Description",
      "sw4Name",
      "sw4Description",
    ],
    "cnh-products": [
      "title",
      "oemTitle",
      "prod1Name",
      "prod2Name",
      "prod3Name",
      "prod4Name",
      "oem1Category",
      "oem1Logo1",
      "oem1Logo2",
      "oem1Logo3",
      "oem1Logo4",
      "oem2Category",
      "oem2Logo1",
      "oem2Logo2",
      "oem2Logo3",
      "oem2Logo4",
      "oem3Category",
      "oem3Logo1",
      "oem3Logo2",
      "oem3Logo3",
      "oem3Logo4",
    ],
    "cnh-team": [
      "title",
      "description",
      "teamSize",
      "backgroundImage",
      "stat1Title",
      "stat1Value",
      "stat2Title",
      "stat2Value",
    ],
    "cnh-cta": ["title", "description", "buttonText", "buttonLink"],
    "ps-hero": [
      "title",
      "subtitle",
      "backgroundImage",
      "backgroundVideo",
      "ctaText",
      "ctaLink",
    ],
    "cnh-hero": [
      "title",
      "subtitle",
      "backgroundImage",
      "backgroundVideo",
      "ctaText",
      "ctaLink",
    ],
    "ps-infrastructure": [
      "title",
      "description",
      "backgroundImage",
      "mac1Brand",
      "mac1Specs",
      "mac1Description",
      "mac2Brand",
      "mac2Specs",
      "mac2Description",
      "mac3Brand",
      "mac3Specs",
      "mac3Description",
      "mac4Brand",
      "mac4Specs",
      "mac4Description",
    ],
    "ps-process": [
      "title",
      "designTitle",
      "designDescription",
      "proc1Title",
      "proc1Desc",
      "proc1Icon",
      "proc2Title",
      "proc2Desc",
      "proc2Icon",
      "proc3Title",
      "proc3Desc",
      "proc3Icon",
      "proc4Title",
      "proc4Desc",
      "proc4Icon",
    ],
    "ps-materials": [
      "title",
      "description",
      "mat1Type",
      "mat1Alloys",
      "mat1Props",
      "mat2Type",
      "mat2Alloys",
      "mat2Props",
      "mat3Type",
      "mat3Alloys",
      "mat3Props",
      "mat4Type",
      "mat4Alloys",
      "mat4Props",
    ],
    "ps-segments": [
      "title",
      "description",
      "oemsTitle",
      "seg1Title",
      "seg1Icon",
      "seg1Item1",
      "seg1Item2",
      "seg1Item3",
      "seg2Title",
      "seg2Icon",
      "seg2Item1",
      "seg2Item2",
      "seg2Item3",
      "seg3Title",
      "seg3Icon",
      "seg3Item1",
      "seg3Item2",
      "seg3Item3",
      "oem1Category",
      "oem1Logo1",
      "oem1Logo2",
      "oem1Logo3",
      "oem1Logo4",
      "oem2Category",
      "oem2Logo1",
      "oem2Logo2",
      "oem2Logo3",
      "oem2Logo4",
      "oem3Category",
      "oem3Logo1",
      "oem3Logo2",
      "oem3Logo3",
      "oem3Logo4",
      "oem4Category",
      "oem4Logo1",
      "oem4Logo2",
      "oem4Logo3",
      "oem4Logo4",
    ],
    "ps-team": [
      "title",
      "achievement",
      "backgroundImage",
      "role1Title",
      "role1Desc",
      "role1Icon",
      "role2Title",
      "role2Desc",
      "role2Icon",
      "role3Title",
      "role3Desc",
      "role3Icon",
      "role4Title",
      "role4Desc",
      "role4Icon",
    ],
    "core-team-hero": ["title", "bgImage"],
    "core-team-overview": [
      "tagline",
      "title",
      "description",
      "section1Title",
      "section1Desc",
      "section2Title",
      "section2Desc",
      "bgImage",
    ],
    "core-team-members": [
      "title",
      "subtitle",
      // Leadership: member_1_1, member_1_2
      "member_1_1_image",
      "member_1_1_linkedin",
      "member_1_1_bio",
      "member_1_2_image",
      "member_1_2_linkedin",
      "member_1_2_bio",
      // Senior Management: member_2_1 to member_2_4
      "member_2_1_image",
      "member_2_1_linkedin",
      "member_2_1_bio",
      "member_2_2_image",
      "member_2_2_linkedin",
      "member_2_2_bio",
      "member_2_3_image",
      "member_2_3_linkedin",
      "member_2_3_bio",
      "member_2_4_image",
      "member_2_4_linkedin",
      "member_2_4_bio",
      // Functional Heads: member_3_1 to member_3_4
      "member_3_1_image",
      "member_3_1_linkedin",
      "member_3_2_image",
      "member_3_2_linkedin",
      "member_3_3_image",
      "member_3_3_linkedin",
      "member_3_4_image",
      "member_3_4_linkedin",
      // Operations: member_4_1 to member_4_4
      "member_4_1_image",
      "member_4_1_linkedin",
      "member_4_2_image",
      "member_4_2_linkedin",
      "member_4_3_image",
      "member_4_3_linkedin",
      "member_4_4_image",
      "member_4_4_linkedin",
      // Technical: member_5_1 to member_5_4
      "member_5_1_image",
      "member_5_1_linkedin",
      "member_5_2_image",
      "member_5_2_linkedin",
      "member_5_3_image",
      "member_5_3_linkedin",
      "member_5_4_image",
      "member_5_4_linkedin",
    ],
    "vg-hero": ["title", "bgImage"],
    "vg-core-values": [
      "tagline", "title", "subtitle",
      "value1Title", "value1Desc",
      "value2Title", "value2Desc",
      "value3Title", "value3Desc",
      "value4Title", "value4Desc",
      "value5Title", "value5Desc",
    ],
    "vg-corporate-governance": [
      "tagline", "title", "description",
      "item1", "item2", "item3", "item4", "item5",
      "closingStatement", "bgImage"
    ],
    "vg-awards-quality": [
      "awardsTagline", "awardsTitle", "awardsDescription",
      // awards and awardImages are handled dynamically
      "qualityTagline", "qualityTitle", "qualityLink", "qualityCommitment",
      "qualityItem1", "qualityItem2", "qualityItem3", "qualityItem4",
      "objectivesTitle",
      "objective1", "objective2", "objective3", "objective4",
      "certsTitle",
      // certs are handled dynamically
    ],
    "vg-ems-safety": [
      "heroTagline", "heroTitle", "heroSubtitle",
      "emsTitle", "emsDescription",
      "emsItem1", "emsItem2", "emsItem3", "emsItem4", "emsItem5",
      "safetyTitle", "safetyDescription",
      "safetyItem1", "safetyItem2", "safetyItem3", "safetyItem4", "safetyItem5",
      "processSafetyTitle",
      "processSafetyItem1", "processSafetyItem2", "processSafetyItem3", "processSafetyItem4",
      "wellbeingTitle",
      "wellbeingItem1", "wellbeingItem2", "wellbeingItem3", "wellbeingItem4",
    ],
    "vg-commitment": ["title", "description", "ctaText", "ctaLink"],
    "csr-banner": ["image", "title", "tagline"],
    "csr-grid": [
      "mainTitle", "subtitle", "body", "philosophyTitle", "philosophyBody", "image",
      "item1Title", "item1Image", "item1Desc",
      "item2Title", "item2Image", "item2Desc",
      "item3Title", "item3Image", "item3Desc",
      "item4Title", "item4Image", "item4Desc"
    ],
    "csr-initiatives": [
      "heading", "image",
      "item1Title", "item1Desc",
      "item2Title", "item2Desc",
      "item3Title", "item3Desc",
      "item4Title", "item4Desc"
    ],
    "csr-environmental": [
      "title", "subtitle", "description", "image",
      "stat1Value", "stat1Label", "stat2Value", "stat2Label", "stat3Value", "stat3Label",
      "point1Title", "point1Desc",
      "point2Title", "point2Desc",
      "point3Title", "point3Desc",
      "point4Title", "point4Desc"
    ],
    "csr-healthcare": [
      "title", "subtitle", "description", "image",
      "stat1Value", "stat1Label", "stat2Value", "stat2Label", "stat3Value", "stat3Label",
      "point1Title", "point1Desc",
      "point2Title", "point2Desc",
      "point3Title", "point3Desc",
      "point4Title", "point4Desc"
    ],
    "csr-community": [
      "title", "subtitle", "description", "image",
      "stat1Value", "stat1Label", "stat2Value", "stat2Label", "stat3Value", "stat3Label",
      "point1Title", "point1Desc",
      "point2Title", "point2Desc",
      "point3Title", "point3Desc",
      "point4Title", "point4Desc"
    ]
  };

  const allKeys = Array.from(
    new Set([
      ...Object.keys(content).filter((k) => typeof content[k] === "string"),
      ...(standardFields[type] || []),
    ]),
  );

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b flex items-center justify-between bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800 tracking-wide">
            Edit {type} Section
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto space-y-6">
          {type === "core-team-members" ? (
            // ── Special UI for Core Team Members ──────────────────────────
            (() => {
              // Member metadata for preview labels
              const memberMeta: Record<string, { name: string; designation: string; category: string }> = {
                member_1_1: { name: "Hema Hari", designation: "Managing Director", category: "Leadership" },
                member_1_2: { name: "Rajesh R", designation: "Director", category: "Leadership" },
                member_2_1: { name: "BRM Rao", designation: "Chief Operating Officer", category: "Senior Management" },
                member_2_2: { name: "Senthilnath P K", designation: "VP – Technical", category: "Senior Management" },
                member_2_3: { name: "Kannan M", designation: "Quality DGM", category: "Senior Management" },
                member_2_4: { name: "Vinod Kumar", designation: "HR & Admin HOD", category: "Senior Management" },
                member_3_1: { name: "Singaravelu", designation: "Finance Head", category: "Functional Heads" },
                member_3_2: { name: "Ramprasath", designation: "ED Divisional Head", category: "Functional Heads" },
                member_3_3: { name: "Rama Kuladeep", designation: "CS Divisional Head", category: "Functional Heads" },
                member_3_4: { name: "Sudeep", designation: "Stamping Divisional Head", category: "Functional Heads" },
                member_4_1: { name: "Durairaj", designation: "Accounts", category: "Operations" },
                member_4_2: { name: "Ravindran K", designation: "IT & Digitalization", category: "Operations" },
                member_4_3: { name: "Sivakumar R", designation: "Purchase / Stores HOD", category: "Operations" },
                member_4_4: { name: "Navaneetha Krishnan", designation: "Production / PPC / Maintenance HOD", category: "Operations" },
                member_5_1: { name: "Aba Samuel", designation: "Technical Expert (Connector)", category: "Technical" },
                member_5_2: { name: "Rangarajan S", designation: "E & D Product Design HOD", category: "Technical" },
                member_5_3: { name: "Ranjith Kumar", designation: "PMG Sr. Manager", category: "Technical" },
                member_5_4: { name: "Suresh", designation: "Tool Room GM", category: "Technical" },
              };

              const getInitials = (name: string) =>
                name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

              // Collect unique member IDs from standardFields
              const seen = new Set<string>();
              const memberIds: string[] = [];
              allKeys.forEach((k) => {
                const m = k.match(/^(member_\d+_\d+)_/);
                if (m && !seen.has(m[1])) { seen.add(m[1]); memberIds.push(m[1]); }
              });

              // Group member IDs by category for section headers
              let lastCategory = "";

              return (
                <>
                  {/* Title / Subtitle */}
                  {["title", "subtitle"].filter(k => allKeys.includes(k)).map((key) => (
                    <div key={key} className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 capitalize">{key}</label>
                      <input
                        type="text"
                        value={editedContent[key] || ""}
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900"
                      />
                    </div>
                  ))}

                  {/* Per-member grouped fields with preview */}
                  {memberIds.map((memberId) => {
                    const meta = memberMeta[memberId];
                    if (!meta) return null;

                    // Category section divider
                    const showCategoryHeader = meta.category !== lastCategory;
                    lastCategory = meta.category;

                    const imageKey = `${memberId}_image`;
                    const linkedinKey = `${memberId}_linkedin`;
                    const imageVal = editedContent[imageKey] || "";
                    const linkedinVal = editedContent[linkedinKey] || "";

                    return (
                      <div key={memberId}>
                        {showCategoryHeader && (
                          <div className="pt-2 pb-1 border-b border-gray-100 mb-4">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{meta.category}</span>
                          </div>
                        )}

                        {/* Member card */}
                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                          {/* Profile Preview Header */}
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-gray-200 bg-white shadow-sm">
                              {imageVal ? (
                                <img src={imageVal} alt={meta.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = ""; }} />
                              ) : (
                                <div className="w-full h-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                                  {getInitials(meta.name)}
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-800">{meta.name}</p>
                              <p className="text-xs text-gray-500">{meta.designation}</p>
                            </div>
                          </div>

                          {/* Image URL */}
                          <div className="space-y-1.5 mb-3">
                            <label className="block text-xs font-semibold text-gray-600">Profile Image URL</label>
                            <div className="flex gap-3 items-start">
                              <input
                                type="text"
                                value={imageVal}
                                onChange={(e) => handleChange(imageKey, e.target.value)}
                                placeholder="Paste image URL..."
                                className="flex-1 p-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900"
                              />
                              <div className="w-16 h-16 shrink-0 rounded-xl border border-gray-200 bg-white overflow-hidden flex items-center justify-center">
                                {imageVal ? (
                                  <img src={imageVal} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                                ) : (
                                  <span className="text-[10px] text-gray-400 font-medium text-center leading-tight px-1">No image</span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* LinkedIn URL */}
                          <div className="space-y-1.5">
                            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
                              <svg className="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                              </svg>
                              LinkedIn Profile URL
                            </label>
                            <input
                              type="text"
                              value={linkedinVal}
                              onChange={(e) => handleChange(linkedinKey, e.target.value)}
                              placeholder="https://linkedin.com/in/..."
                              className="w-full p-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              );
            })()
          ) : type === "vg-awards-quality" ? (
            // ── Special UI for Awards & Quality ─────────────────────────
            (() => {
              // Extract dynamic awards and images
              const awardKeys = Object.keys(editedContent)
                .filter(k => k.startsWith("award") && !k.startsWith("awardImage") && !["awardsTagline", "awardsTitle", "awardsDescription"].includes(k))
                .sort((a, b) => {
                  const numA = parseInt(a.replace("award", "")) || 0;
                  const numB = parseInt(b.replace("award", "")) || 0;
                  return numA - numB;
                });

              const imageKeys = Object.keys(editedContent)
                .filter(k => k.startsWith("awardImage"))
                .sort((a, b) => {
                  const numA = parseInt(a.replace("awardImage", "")) || 0;
                  const numB = parseInt(b.replace("awardImage", "")) || 0;
                  return numA - numB;
                });

              // Extract dynamic certifications Grouped by index
              const certIndices = new Set<number>();
              Object.keys(editedContent).forEach(k => {
                const match = k.match(/^cert(\d+)(Name|Label|Image)$/);
                if (match) certIndices.add(parseInt(match[1]));
              });
              const certIdxArray = Array.from(certIndices).sort((a, b) => a - b);

              return (
                <div className="space-y-10">
                  {/* Standard Header Fields */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Header Section</h3>
                    {["awardsTagline", "awardsTitle", "awardsDescription"].map((key) => (
                      <div key={key} className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        {key === "awardsDescription" ? (
                          <textarea
                            value={editedContent[key] || ""}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px] text-gray-900"
                          />
                        ) : (
                          <input
                            type="text"
                            value={editedContent[key] || ""}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Dynamic Awards List */}
                  <div className="space-y-6 bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                    <div className="flex items-center justify-between border-b border-blue-200 pb-3">
                      <h3 className="text-lg font-bold text-blue-900">Awards List</h3>
                      <button
                        onClick={() => {
                          let nextIdx = 1;
                          while (editedContent[`award${nextIdx}`] !== undefined) nextIdx++;
                          handleChange(`award${nextIdx}`, "New Award");
                        }}
                        className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition font-medium"
                      >
                        + Add Award
                      </button>
                    </div>
                    <div className="space-y-3">
                      {awardKeys.length === 0 && <p className="text-sm text-gray-500 italic">No awards added.</p>}
                      {awardKeys.map((key) => (
                        <div key={key} className="flex gap-3">
                          <input
                            type="text"
                            value={editedContent[key] || ""}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className="flex-1 p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                            placeholder="Award text..."
                          />
                          <button
                            onClick={() => {
                              const newContent = { ...editedContent };
                              delete newContent[key];
                              setEditedContent(newContent);
                            }}
                            className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition border border-transparent hover:border-red-100"
                            title="Remove Award"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Images List */}
                  <div className="space-y-6 bg-purple-50/50 p-6 rounded-2xl border border-purple-100">
                    <div className="flex items-center justify-between border-b border-purple-200 pb-3">
                      <h3 className="text-lg font-bold text-purple-900">Slider Images</h3>
                      <button
                        onClick={() => {
                          let nextIdx = 1;
                          while (editedContent[`awardImage${nextIdx}`] !== undefined) nextIdx++;
                          handleChange(`awardImage${nextIdx}`, "https://images.unsplash.com/photo-");
                        }}
                        className="text-sm bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 transition font-medium"
                      >
                        + Add Image
                      </button>
                    </div>
                    <div className="space-y-4">
                      {imageKeys.length === 0 && <p className="text-sm text-gray-500 italic">No images added.</p>}
                      {imageKeys.map((key) => (
                        <div key={key} className="flex gap-4 items-start bg-white p-3 rounded-xl border border-purple-100 shadow-sm">
                          <div className="flex-1 space-y-2">
                            <label className="text-xs font-semibold text-purple-800 uppercase tracking-wider">{key}</label>
                            <input
                              type="text"
                              value={editedContent[key] || ""}
                              onChange={(e) => handleChange(key, e.target.value)}
                              className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900"
                              placeholder="Image URL"
                            />
                          </div>
                          <div className="w-20 h-20 shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center">
                            {editedContent[key] ? (
                              <img src={editedContent[key]} alt="preview" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-xs text-gray-400">Empty</span>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              const newContent = { ...editedContent };
                              delete newContent[key];
                              setEditedContent(newContent);
                            }}
                            className="p-2 mt-6 text-red-500 hover:bg-red-50 rounded-lg transition"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Dynamic Certifications List */}
                  <div className="space-y-6 bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
                    <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
                      <h3 className="text-lg font-bold text-emerald-900">Certifications</h3>
                      <button
                        onClick={() => {
                          let nextIdx = 1;
                          while (
                            editedContent[`cert${nextIdx}Name`] !== undefined ||
                            editedContent[`cert${nextIdx}Label`] !== undefined ||
                            editedContent[`cert${nextIdx}Image`] !== undefined
                          ) {
                            nextIdx++;
                          }
                          const newContent = { ...editedContent };
                          newContent[`cert${nextIdx}Name`] = "New Certification";
                          newContent[`cert${nextIdx}Label`] = "Certification Label";
                          newContent[`cert${nextIdx}Image`] = "https://images.unsplash.com/photo-";
                          setEditedContent(newContent);
                        }}
                        className="text-sm bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition font-medium"
                      >
                        + Add Certification
                      </button>
                    </div>

                    <div className="space-y-4">
                      {certIdxArray.length === 0 && <p className="text-sm text-gray-500 italic">No certifications added.</p>}
                      {certIdxArray.map((idx) => {
                        const nameKey = `cert${idx}Name`;
                        const labelKey = `cert${idx}Label`;
                        const imgKey = `cert${idx}Image`;

                        return (
                          <div key={idx} className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm relative group">
                            <button
                              onClick={() => {
                                const newContent = { ...editedContent };
                                delete newContent[nameKey];
                                delete newContent[labelKey];
                                delete newContent[imgKey];
                                setEditedContent(newContent);
                              }}
                              className="absolute top-4 right-4 p-1.5 text-red-500 hover:bg-red-50 rounded-md transition opacity-0 group-hover:opacity-100"
                              title="Remove Certification"
                            >
                              <X className="w-4 h-4" />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
                              <div className="space-y-3">
                                <div>
                                  <label className="block text-xs font-semibold text-gray-500 mb-1">Name</label>
                                  <input
                                    type="text"
                                    value={editedContent[nameKey] || ""}
                                    onChange={(e) => handleChange(nameKey, e.target.value)}
                                    className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-semibold text-gray-500 mb-1">Label</label>
                                  <input
                                    type="text"
                                    value={editedContent[labelKey] || ""}
                                    onChange={(e) => handleChange(labelKey, e.target.value)}
                                    className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1">Certificate Image URL</label>
                                <div className="flex gap-3 h-full">
                                  <input
                                    type="text"
                                    value={editedContent[imgKey] || ""}
                                    onChange={(e) => handleChange(imgKey, e.target.value)}
                                    className="flex-1 p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900 h-10"
                                    placeholder="Image URL"
                                  />
                                  <div className="w-20 h-20 shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center">
                                    {editedContent[imgKey] ? (
                                      <img src={editedContent[imgKey]} alt="preview" className="w-full h-full object-cover" />
                                    ) : (
                                      <span className="text-[10px] text-gray-400">Empty</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            // ── Default generic field rendering ───────────────────────────
            allKeys.map((key) => {
              const isImageField =
                key.toLowerCase().includes("logo") ||
                key.toLowerCase().includes("image") ||
                key.toLowerCase().includes("icon");
              const fieldValue = editedContent[key] || "";

              let displayLabel = key
                .replace(/([A-Z]|_)/g, " $1")
                .replace(/_/g, "")
                .trim();
              const oemMatch = key.match(/^oem(\d+)Logo(\d+)$/);
              if (oemMatch) {
                const oemIndex = parseInt(oemMatch[1]);
                const logoNumber = oemMatch[2];
                const categoryKey = `oem${oemIndex}Category`;
                const defaultCategories = ["2-Wheeler", "4-Wheeler", "Heavy Vehicle", "Non-Automotive"];
                const defaultCat = defaultCategories[oemIndex - 1] || `Category ${oemIndex}`;
                const categoryName = editedContent[categoryKey] || defaultCat;
                displayLabel = `[${categoryName}] - Logo ${logoNumber}`;
              }

              return (
                <div key={key} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 capitalize">
                    {displayLabel}
                  </label>

                  {isImageField ? (
                    <div className="flex gap-4 items-start">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={fieldValue}
                          onChange={(e) => handleChange(key, e.target.value)}
                          placeholder="Enter image URL..."
                          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
                        />
                      </div>
                      <div className="w-24 h-24 shrink-0 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center relative">
                        {fieldValue ? (
                          <img
                            src={fieldValue}
                            alt="Preview"
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                              e.currentTarget.parentElement!.innerHTML =
                                '<span class="text-xs text-red-500 text-center px-2">Invalid URL</span>';
                            }}
                          />
                        ) : (
                          <span className="text-xs text-gray-400 font-medium">No Image</span>
                        )}
                      </div>
                    </div>
                  ) : fieldValue.length > 50 ? (
                    <textarea
                      value={fieldValue}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-h-[120px] transition-all text-gray-900"
                    />
                  ) : (
                    <input
                      type="text"
                      value={fieldValue}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
                    />
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-200 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 flex items-center shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
