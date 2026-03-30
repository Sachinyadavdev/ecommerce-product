"use client";

import { useState, useRef } from "react";
import { X, Save, Loader2, ChevronUp, ChevronDown, Plus, Factory, Construction, Award, Layers, Box, Zap, Settings, ShieldCheck, Cog, Boxes, TrendingUp, Cpu } from "lucide-react";
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
  const editorRef = useRef<HTMLDivElement>(null);

  const executeCommand = (command: string, value: string | undefined = undefined) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, value);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    console.log(`[SectionEditor] Saving section ${sectionId} with content:`, editedContent);
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

  const handleChange = (key: string, value: any) => {
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
    "contact-hero": [
      "bgImage",
      "topTitle",
      "mainTitle",
      "description",
      "btn1Text",
      "btn1Url",
      "btn2Text",
      "btn2Url",
      "contactTitle",
      "phoneLabel",
      "phoneValue",
      "emailLabel",
      "emailValue",
      "addressLabel",
      "addressValue",
    ],
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
    "linkedin-feed": [],
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
    "ep-image-carousel": [
      "title",
      "subtitle",
      "image1Alt",
      "image1Src",
      "image2Alt",
      "image2Src",
      "image3Alt",
      "image3Src"
    ],
    "cs-image-carousel": [
      "title",
      "subtitle",
      "image1Alt",
      "image1Src",
      "image2Alt",
      "image2Src",
      "image3Alt",
      "image3Src"
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
    "cnh-capabilities": [
      "title",
      "cap1Title", "cap1Description", "cap1Icon",
      "cap2Title", "cap2Description", "cap2Icon",
      "cap3Title", "cap3Description", "cap3Icon",
      "cap4Title", "cap4Description", "cap4Icon",
    ],
    "cs-capabilities": [
      "title",
      "subtitle",
      "cap1Title", "cap1Description", "cap1Icon",
      "cap2Title", "cap2Description", "cap2Icon",
      "cap3Title", "cap3Description", "cap3Icon",
      "cap4Title", "cap4Description", "cap4Icon",
      "cap5Title", "cap5Description", "cap5Icon",
    ],
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
    "ep-infrastructure": [
      "title",
      "description",
      "image",
      "techTitle",
      "techDescription",
      "item_1_title", "item_1_size", "item_1_location", "item_1_status",
      "item_2_title", "item_2_size", "item_2_location", "item_2_status",
      "item_3_title", "item_3_size", "item_3_location", "item_3_status",
    ],
    "core-team-members": [
      "title",
      "subtitle",
      // Leadership: member_1_1, member_1_2
      "member_1_1_name", "member_1_1_designation", "member_1_1_image", "member_1_1_linkedin", "member_1_1_bio",
      "member_1_2_name", "member_1_2_designation", "member_1_2_image", "member_1_2_linkedin", "member_1_2_bio",
      // Senior Management: member_2_1 to member_2_4
      "member_2_1_name", "member_2_1_designation", "member_2_1_image", "member_2_1_linkedin", "member_2_1_bio",
      "member_2_2_name", "member_2_2_designation", "member_2_2_image", "member_2_2_linkedin", "member_2_2_bio",
      "member_2_3_name", "member_2_3_designation", "member_2_3_image", "member_2_3_linkedin", "member_2_3_bio",
      "member_2_4_name", "member_2_4_designation", "member_2_4_image", "member_2_4_linkedin", "member_2_4_bio",
      // Functional Heads: member_3_1 to member_3_4
      "member_3_1_name", "member_3_1_designation", "member_3_1_image", "member_3_1_linkedin",
      "member_3_2_name", "member_3_2_designation", "member_3_2_image", "member_3_2_linkedin",
      "member_3_3_name", "member_3_3_designation", "member_3_3_image", "member_3_3_linkedin",
      "member_3_4_name", "member_3_4_designation", "member_3_4_image", "member_3_4_linkedin",
      // Operations: member_4_1 to member_4_4
      "member_4_1_name", "member_4_1_designation", "member_4_1_image", "member_4_1_linkedin",
      "member_4_2_name", "member_4_2_designation", "member_4_2_image", "member_4_2_linkedin",
      "member_4_3_name", "member_4_3_designation", "member_4_3_image", "member_4_3_linkedin",
      "member_4_4_name", "member_4_4_designation", "member_4_4_image", "member_4_4_linkedin",
      // Technical: member_5_1 to member_5_4
      "member_5_1_name", "member_5_1_designation", "member_5_1_image", "member_5_1_linkedin",
      "member_5_2_name", "member_5_2_designation", "member_5_2_image", "member_5_2_linkedin",
      "member_5_3_name", "member_5_3_designation", "member_5_3_image", "member_5_3_linkedin",
      "member_5_4_name", "member_5_4_designation", "member_5_4_image", "member_5_4_linkedin",
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
    ],
    "cnh-intro": ["title", "subtitle", "description", "videoUrl"],
    "cnh-excellence": ["title1", "description1", "title2", "description2", "title3", "description3"],
    "machinery-capacity": ["title", "subtitle", "expansionNote"],
    "sm-cta-section": [
      "s6_subtitle", "s6_title", "s6_desc1", "s6_desc2",
      "s8_subtitle", "s8_title", "s8_description", "s8_badgeText",
      "wind_title", "wind_desc", "wind_impact", "wind_pledgeTitle", "wind_pledgeSubtitle", "wind_img1", "wind_img2", "wind_img3"
    ],
    "sm-responsible-section": [
      "subtitle", "title", "description", "extraDescription", "card1Title", "card1Desc", "card2Title", "card2Desc", "image"
    ],
    "cnh-materials": ["title", "description", "st1Name", "st1Description", "st2Name", "st2Description", "st3Name", "st3Description", "st4Name", "st4Description", "st5Name", "st5Description"],
    "cnh-infrastructure": ["title", "description", "mac1Name", "mac1Qty", "mac1Description", "mac2Name", "mac2Qty", "mac2Description", "mac3Name", "mac3Qty", "mac3Description", "mac4Name", "mac4Qty", "mac4Description"],
    "green-culture-section": [
      "image1", "image2", "image3"
    ],
    "sm-commitment-section": [
      "image1", "image2", "image3"
    ],
    "measurable-impact-section": [
      "stat1Value", "stat1Label", "stat1Detail",
      "stat2Value", "stat2Label", "stat2Detail",
      "stat3Value", "stat3Label", "stat3Detail",
      "stat4Value", "stat4Label", "stat4Detail"
    ],
    "solar-energy-section": ["image", "title", "subtitle", "stat1Value", "stat1Label", "stat2Value", "stat2Label"],
    "tree-plantation-section": ["image1", "image2", "title", "subtitle", "stat1Value", "stat1Label", "stat2Value", "stat2Label"],
    "green-initiatives-section": ["title", "subtitle", "description", "image"],
    "automation-hero": ["title", "subtitle", "bgImage"],
    "automation-overview": ["title", "description", "image"],
    "automation-capabilities": ["title", "description"],
    "automation-plating": ["title", "description", "image"],
    "lsr-hero": ["title", "subtitle", "bgImage"],
    "lsr-overview": ["title", "description", "image"],
    "lsr-capabilities": ["title", "description"],
    "lsr-commitment": ["title", "description", "image"],
    "lsr-video": ["title", "subtitle", "videoUrl", "posterImage"],
    "terms-services": ["title", "lastUpdated", "body"],
    "privacy-policy": ["title", "lastUpdated", "body"]
  };

  const allKeys = Array.from(
    new Set([
      ...Object.keys(editedContent).filter((k) => typeof editedContent[k] === "string"),
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
          {type === "terms-services" || type === "privacy-policy" ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Page Title</label>
                <input
                  type="text"
                  value={editedContent.title || ""}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Last Updated</label>
                <input
                  type="text"
                  value={editedContent.lastUpdated || ""}
                  onChange={(e) => handleChange("lastUpdated", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900"
                  placeholder="e.g. October 2023"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 flex justify-between items-center">
                  <span>Content Editor</span>
                  <span className="text-[10px] font-normal text-gray-500 uppercase tracking-widest bg-gray-100 px-2 py-1 rounded">Rich Text Editor</span>
                </label>
                <div className="border border-gray-300 rounded-xl overflow-hidden shadow-sm bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                  <div className="bg-gray-50/80 border-b border-gray-200 p-2 flex gap-1.5 flex-wrap items-center">
                    <button onClick={(e) => { e.preventDefault(); executeCommand("formatBlock", "H2"); }} className="px-2.5 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 shadow-sm transition-all">H2</button>
                    <button onClick={(e) => { e.preventDefault(); executeCommand("formatBlock", "H3"); }} className="px-2.5 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 shadow-sm transition-all">H3</button>
                    <button onClick={(e) => { e.preventDefault(); executeCommand("formatBlock", "P"); }} className="px-2.5 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 shadow-sm transition-all">P</button>
                    <div className="w-px h-5 bg-gray-300 mx-1.5 rounded-full"></div>
                    <button onClick={(e) => { e.preventDefault(); executeCommand("bold"); }} className="w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 shadow-sm transition-all">B</button>
                    <button onClick={(e) => { e.preventDefault(); executeCommand("italic"); }} className="w-8 h-8 flex items-center justify-center text-sm italic font-serif text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 shadow-sm transition-all">I</button>
                    <button onClick={(e) => { e.preventDefault(); executeCommand("underline"); }} className="w-8 h-8 flex items-center justify-center text-sm underline text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 shadow-sm transition-all">U</button>
                    <div className="w-px h-5 bg-gray-300 mx-1.5 rounded-full"></div>
                    <button onClick={(e) => { e.preventDefault(); executeCommand("insertUnorderedList"); }} className="px-2.5 py-1.5 flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 shadow-sm transition-all">
                      <span className="w-1 h-1 bg-gray-600 rounded-full inline-block"></span> Bulleted
                    </button>
                    <button onClick={(e) => { e.preventDefault(); executeCommand("insertOrderedList"); }} className="px-2.5 py-1.5 flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 shadow-sm transition-all">
                      <span className="text-[10px] font-bold">1.</span> Numbered
                    </button>
                  </div>
                  <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleChange("body", e.currentTarget.innerHTML)}
                    dangerouslySetInnerHTML={{ __html: editedContent.body || "<p><br></p>" }}
                    className="p-5 min-h-[350px] max-h-[500px] overflow-y-auto outline-none transition-all bg-white text-slate-900
                      [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-6 [&_h2]:mb-2
                      [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:mt-4 [&_h3]:mb-2
                      [&_p]:text-slate-700 [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:min-h-[1.2em]
                      [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ul]:text-slate-700
                      [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_ol]:text-slate-700
                      [&_li]:mb-1
                    "
                    style={{ fontSize: '15px', lineHeight: '1.6' }}
                  />
                </div>
              </div>
            </div>
          ) : type === "core-team-members" ? (
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
                if (m && !seen.has(m[1])) {
                  seen.add(m[1]);
                  memberIds.push(m[1]);
                  // If it's a new member not in memberMeta, add it
                  if (!memberMeta[m[1]]) {
                    const catIdx = parseInt(m[1].split('_')[1]);
                    const categoryNames = ["Leadership", "Senior Management", "Functional Heads", "Operations", "Technical"];
                    memberMeta[m[1]] = {
                      category: categoryNames[catIdx - 1] || "Other",
                      name: editedContent[`${m[1]}_name`] || "New Member",
                      designation: editedContent[`${m[1]}_designation`] || "Designation"
                    };
                  }
                }
              });

              // Group member IDs by category for section headers
              const categoryNames = ["Leadership", "Senior Management", "Functional Heads", "Operations", "Technical"];
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

                  <div className="flex items-center justify-between pt-4">
                    <h3 className="text-lg font-bold text-gray-900">Leadership Members</h3>
                    <button
                      onClick={() => {
                        let nextIdx = 1;
                        while (editedContent[`member_1_${nextIdx}_name`] !== undefined || memberMeta[`member_1_${nextIdx}`]) {
                          nextIdx++;
                        }
                        const prefix = `member_1_${nextIdx}`;
                        const newContent = { ...editedContent };
                        newContent[`${prefix}_name`] = "New Leader";
                        newContent[`${prefix}_designation`] = "Managing Director";
                        newContent[`${prefix}_image`] = "";
                        newContent[`${prefix}_linkedin`] = "";
                        newContent[`${prefix}_bio`] = "";
                        setEditedContent(newContent);
                      }}
                      className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                      + Add Leadership Member
                    </button>
                  </div>

                  {/* Per-member grouped fields with preview */}
                  {memberIds.map((memberId) => {
                    const meta = memberMeta[memberId] || {
                      category: "Other",
                      name: editedContent[`${memberId}_name`] || "New Member",
                      designation: editedContent[`${memberId}_designation`] || "Designation",
                    };

                    // Category section divider
                    const showCategoryHeader = meta.category !== lastCategory;
                    lastCategory = meta.category;

                    const imageKey = `${memberId}_image`;
                    const linkedinKey = `${memberId}_linkedin`;
                    const bioKey = `${memberId}_bio`;
                    const nameVal = editedContent[`${memberId}_name`] || meta.name;
                    const designationVal = editedContent[`${memberId}_designation`] || meta.designation;
                    const imageVal = editedContent[imageKey] || "";
                    const linkedinVal = editedContent[linkedinKey] || "";
                    const bioVal = editedContent[bioKey] || "";

                    return (
                      <div key={memberId}>
                        {/* Profile Preview Header toggle for categories */}
                        {showCategoryHeader && (
                          <div className={`pt-8 pb-2 border-b border-gray-100 mb-6 flex items-center justify-between`}>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{meta.category}</span>
                              {editedContent[`category_${memberId.split('_')[1]}_hide`] && (
                                <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-500 text-[10px] font-bold uppercase tracking-wider border border-red-100">Hidden</span>
                              )}
                            </div>
                            {meta.category !== "Leadership" && (
                              <button
                                onClick={() => {
                                  const catIdx = memberId.split('_')[1];
                                  const hideKey = `category_${catIdx}_hide`;
                                  handleChange(hideKey, !editedContent[hideKey]);
                                }}
                                className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg transition-all ${
                                  editedContent[`category_${memberId.split('_')[1]}_hide`]
                                    ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-100"
                                    : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100"
                                }`}
                              >
                                {editedContent[`category_${memberId.split('_')[1]}_hide`] ? "Show Group" : "Hide Group"}
                              </button>
                            )}
                          </div>
                        )}

                        {/* If category is hidden, we might still want to show the members for editing, or we can collapse them. 
                            Let's show them but with a dimmed appearance if hidden. */}
                        <div className={`${editedContent[`category_${memberId.split('_')[1]}_hide`] ? "opacity-50 grayscale-[0.5]" : ""}`}>
                          {/* Member card */}
                          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 relative group/card">
                          <button
                            onClick={() => {
                              const newContent = { ...editedContent };
                              delete newContent[`${memberId}_name`];
                              delete newContent[`${memberId}_designation`];
                              delete newContent[`${memberId}_image`];
                              delete newContent[`${memberId}_linkedin`];
                              delete newContent[`${memberId}_bio`];
                              setEditedContent(newContent);
                            }}
                            className="absolute top-2 right-2 p-1.5 text-red-500 hover:bg-red-50 rounded-md transition opacity-0 group-hover/card:opacity-100 z-10"
                            title="Remove Member"
                          >
                            <X className="w-4 h-4" />
                          </button>

                          {/* Profile Preview Header */}
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-gray-200 bg-white shadow-sm">
                              {imageVal ? (
                                <img src={imageVal} alt={nameVal} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = ""; }} />
                              ) : (
                                <div className="w-full h-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                                  {getInitials(nameVal)}
                                </div>
                              )}
                            </div>
                            <div className="flex-1 grid grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase">Name</label>
                                <input
                                  type="text"
                                  value={nameVal}
                                  onChange={(e) => handleChange(`${memberId}_name`, e.target.value)}
                                  className="w-full p-1.5 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase">Designation</label>
                                <input
                                  type="text"
                                  value={designationVal}
                                  onChange={(e) => handleChange(`${memberId}_designation`, e.target.value)}
                                  className="w-full p-1.5 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                                />
                              </div>
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
                          {/* Bio */}
                          <div className="space-y-1.5 mt-3">
                            <label className="block text-xs font-semibold text-gray-600">Short Bio</label>
                            <textarea
                              value={bioVal}
                              onChange={(e) => handleChange(bioKey, e.target.value)}
                              placeholder="Enter brief bio..."
                              className="w-full p-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 min-h-[60px]"
                            />
                          </div>

                          </div>

                        </div>
                      </div>
                    );
                  })}
                </>
              );
            })()
          ) : type === "ep-infrastructure" ? (
            // ── Special UI for Engineering Infrastructure ────────────────
            (() => {
              const itemIndices = new Set<number>();
              allKeys.forEach((k) => {
                const m = k.match(/^item_(\d+)_/);
                if (m) itemIndices.add(parseInt(m[1]));
              });

              const sortedIndices = Array.from(itemIndices).sort((a, b) => a - b);

              return (
                <div className="space-y-6">
                  {/* General Fields */}
                  {["title", "description", "image", "techTitle", "techDescription"].map((key) => (
                    <div key={key} className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </label>
                      {key.includes("Description") || key === "description" ? (
                        <textarea
                          value={editedContent[key] || ""}
                          onChange={(e) => handleChange(key, e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 min-h-[100px]"
                        />
                      ) : (
                        <input
                          type="text"
                          value={editedContent[key] || ""}
                          onChange={(e) => handleChange(key, e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900"
                        />
                      )}
                    </div>
                  ))}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900">Infrastructure Items</h3>
                    <button
                      onClick={() => {
                        let nextIdx = 1;
                        while (editedContent[`item_${nextIdx}_title`] !== undefined) nextIdx++;
                        const prefix = `item_${nextIdx}`;
                        const newContent = { ...editedContent };
                        newContent[`${prefix}_title`] = "New Plant";
                        newContent[`${prefix}_size`] = "0 sq. ft.";
                        newContent[`${prefix}_location`] = "Location";
                        newContent[`${prefix}_status`] = "Active";
                        setEditedContent(newContent);
                      }}
                      className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Add Item
                    </button>
                  </div>

                  <div className="space-y-4">
                    {sortedIndices.map((idx) => {
                      const prefix = `item_${idx}`;
                      return (
                        <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative group/card flex flex-col md:flex-row gap-5">
                          {/* Mini Visual Preview */}
                          {(() => {
                            const title = editedContent[`${prefix}_title`] || "";
                            const status = editedContent[`${prefix}_status`] || "";
                            const size = editedContent[`${prefix}_size`] || "";
                            const location = editedContent[`${prefix}_location`] || "";
                            const isUpcoming = title.includes("Upcoming") || status === "In Progress";
                            
                            return (
                              <div className="w-full md:w-1/3 shrink-0 rounded-xl bg-slate-50 border border-slate-100 p-4 flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isUpcoming ? "bg-amber-50 text-amber-500" : "bg-blue-50 text-blue-600"}`}>
                                  {isUpcoming ? <Construction size={20} /> : <Factory size={20} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2 mb-0.5">
                                    <h4 className="text-xs font-bold text-slate-900 truncate">{title || "New Plant"}</h4>
                                    {status && (
                                      <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-full ${isUpcoming ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                                        {status}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[10px] text-slate-500 truncate">{size} • {location}</p>
                                </div>
                              </div>
                            );
                          })()}

                          {/* Editable Fields */}
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <button
                              onClick={() => {
                                const newContent = { ...editedContent };
                                delete newContent[`${prefix}_title`];
                                delete newContent[`${prefix}_size`];
                                delete newContent[`${prefix}_location`];
                                delete newContent[`${prefix}_status`];
                                setEditedContent(newContent);
                              }}
                              className="absolute top-2 right-2 p-1 text-red-400 hover:text-red-500 hover:bg-red-50 rounded transition opacity-0 group-hover/card:opacity-100 z-10"
                              title="Remove Item"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>

                            <div className="space-y-1">
                              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Title</label>
                              <input
                                type="text"
                                value={editedContent[`${prefix}_title`] || ""}
                                onChange={(e) => handleChange(`${prefix}_title`, e.target.value)}
                                className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                                placeholder="Plant Name"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</label>
                              <input
                                type="text"
                                value={editedContent[`${prefix}_status`] || ""}
                                onChange={(e) => handleChange(`${prefix}_status`, e.target.value)}
                                className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                                placeholder="Active / In Progress"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Size</label>
                              <input
                                type="text"
                                value={editedContent[`${prefix}_size`] || ""}
                                onChange={(e) => handleChange(`${prefix}_size`, e.target.value)}
                                className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                                placeholder="Sq. Ft."
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Location</label>
                              <input
                                type="text"
                                value={editedContent[`${prefix}_location`] || ""}
                                onChange={(e) => handleChange(`${prefix}_location`, e.target.value)}
                                className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                                placeholder="City"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()
          ) : type === "cs-capabilities" ? (
            // ── Special UI for Connection Systems Capabilities ──────────────
            (() => {
              const capIndices = [1, 2, 3, 4, 5];
              const defaults = [
                { title: "Expertise in Precision Molding", description: "Our core strength lies in precision molding, including insert molding, over-molding, and plastic threaded parts molding.", icon: "Boxes" },
                { title: "Versatile Tooling Solutions", description: "Spanning from single-cavity to 64-cavity molds. We are adept at producing family molds with high precision.", icon: "Settings" },
                { title: "Engineering Materials", description: "Experienced in processing high-performance thermoplastics like PPS, PA66, LCP, and Glass Filled plastics.", icon: "Cpu" },
                { title: "High-Volume Production", description: "Built for massive scale - capable of producing up to 30 lakh connector parts daily without quality compromise.", icon: "TrendingUp" },
                { title: "Advanced Automation", description: "Integrated robotic part insertion, poke-yoke systems, and automated assembly ensure perfect consistency.", icon: "Zap" }
              ];
              const iconMap: any = { Zap, Boxes, Settings, TrendingUp, Cpu, Layers, Box, Factory, Construction, Award };

              return (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 capitalize">Section Title</label>
                        <h2
                        contentEditable
                        suppressContentEditableWarning
                        onInput={(e) => handleChange("title", e.currentTarget.textContent)}
                        className="text-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 rounded p-2 transition-all bg-slate-50 border border-slate-100"
                        >
                        {editedContent.title || "Core Capabilities"}
                        </h2>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 capitalize">Section Subtitle</label>
                        <p
                        contentEditable
                        suppressContentEditableWarning
                        onInput={(e) => handleChange("subtitle", e.currentTarget.textContent)}
                        className="text-sm text-slate-600 outline-none focus:ring-1 focus:ring-blue-500 rounded p-2 transition-all bg-slate-50 border border-slate-100 min-h-[60px]"
                        >
                        {editedContent.subtitle || "Leveraging advanced manufacturing technologies and decades of engineering expertise..."}
                        </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {capIndices.map((idx) => {
                      const titleKey = `cap${idx}Title`;
                      const descKey = `cap${idx}Description`;
                      const iconKey = `cap${idx}Icon`;
                      
                      const titleVal = editedContent[titleKey] !== undefined ? editedContent[titleKey] : defaults[idx-1].title;
                      const descVal = editedContent[descKey] !== undefined ? editedContent[descKey] : defaults[idx-1].description;
                      const iconVal = editedContent[iconKey] || defaults[idx-1].icon;
                      const isHidden = titleVal === "";

                      const IconComponent = iconMap[iconVal] || Settings;

                      return (
                        <div key={idx} className={`bg-white rounded-2xl p-6 border ${isHidden ? 'border-red-200 bg-red-50/30' : 'border-gray-100'} shadow-sm relative group/card flex flex-col md:flex-row gap-6 transition-all`}>
                          {/* Remove/Undo Button */}
                          <div className="absolute top-4 right-4 z-10">
                            {isHidden ? (
                              <button 
                                onClick={() => {
                                  const newContent = { ...editedContent };
                                  delete newContent[titleKey];
                                  delete newContent[descKey];
                                  delete newContent[iconKey];
                                  setEditedContent(newContent);
                                }}
                                className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-1 text-[10px] font-bold"
                                title="Restore Default"
                              >
                                <span>RE-ENABLE</span>
                              </button>
                            ) : (
                              <button 
                                onClick={() => {
                                  handleChange(titleKey, "");
                                  handleChange(descKey, "");
                                }}
                                className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 opacity-0 group-hover/card:opacity-100 transition-all shadow-sm"
                                title="Remove item"
                              >
                                <X size={14} />
                              </button>
                            )}
                          </div>

                          {/* Mini Visual Preview (Interactive) */}
                          <div className={`w-full md:w-1/3 shrink-0 rounded-2xl border p-5 flex items-start gap-4 transition-all ${isHidden ? 'bg-gray-100 border-gray-200 grayscale opacity-50' : 'bg-slate-50 border-slate-100 group-hover/card:bg-blue-50/50 shadow-sm'}`}>
                             <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center transition-all ${isHidden ? 'bg-gray-300 text-gray-500' : 'bg-white text-blue-600 shadow-sm border border-slate-200 group-hover/card:scale-110'}`}>
                                <IconComponent size={24} />
                             </div>
                             <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4 
                                    contentEditable={!isHidden}
                                    suppressContentEditableWarning
                                    onInput={(e) => handleChange(titleKey, e.currentTarget.textContent)}
                                    className={`text-sm font-bold mb-1 outline-none focus:ring-1 focus:ring-blue-500 rounded px-1 transition-all ${isHidden ? 'text-gray-400 italic font-normal' : 'text-slate-900'}`}
                                  >
                                    {isHidden ? "Hidden Item" : titleVal}
                                  </h4>
                                  {isHidden && <span className="text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Hidden</span>}
                                </div>
                                <p 
                                  contentEditable={!isHidden}
                                  suppressContentEditableWarning
                                  onInput={(e) => handleChange(descKey, e.currentTarget.textContent)}
                                  className={`text-[10px] leading-relaxed outline-none focus:ring-1 focus:ring-blue-500 rounded px-1 transition-all ${isHidden ? 'text-gray-400' : 'text-slate-500'}`}
                                >
                                  {isHidden ? "This item will not appear on the website." : descVal || "No description provided."}
                                </p>
                             </div>
                          </div>

                          {/* Editable Fields */}
                          {!isHidden && (
                            <div className="flex-1 space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Title</label>
                                  <input
                                    type="text"
                                    value={editedContent[titleKey] || ""}
                                    placeholder={defaults[idx-1].title}
                                    onChange={(e) => handleChange(titleKey, e.target.value)}
                                    className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Icon</label>
                                  <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 rounded-lg border border-slate-200">
                                    {Object.keys(iconMap).map(iconName => {
                                      const PickerIcon = iconMap[iconName];
                                      return (
                                        <button
                                          key={iconName}
                                          onClick={() => handleChange(iconKey, iconName)}
                                          className={`p-1.5 rounded-md transition-all ${iconVal === iconName ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                                          title={iconName}
                                        >
                                          <PickerIcon size={14} />
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Description</label>
                                <textarea
                                  value={editedContent[descKey] || ""}
                                  placeholder={defaults[idx-1].description}
                                  onChange={(e) => handleChange(descKey, e.target.value)}
                                  className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none min-h-[80px]"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()
          ) : type === "cnh-capabilities" ? (
            // ── Special UI for CNH Moulds Capabilities ──────────────────
            (() => {
              const capIndices = [1, 2, 3, 4];
              const defaults = [
                { title: "Wide range of Mold Sizes", description: "Producing molds suitable for 40 Tons to 450 Tons capacity machines", icon: "Settings" },
                { title: "Cavity Versatility", description: "Providing single-cavity to 64-cavity molds with family mold expertise (up to 70% weight difference).", icon: "Layers" },
                { title: "Material Integration", description: "Significant experience in 65% glass-filled (GF) molds and over-molding technologies.", icon: "Box" },
                { title: "Specialized Engineering", description: "Expertise in insert-molding and complex threaded component manufacturing.", icon: "ShieldCheck" }
              ];
              const iconMap: any = { Layers, Box, Zap, Settings, ShieldCheck, Factory, Construction, Award };

              return (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 capitalize">Section Title</label>
                    <h2
                      contentEditable
                      suppressContentEditableWarning
                      onInput={(e) => handleChange("title", e.currentTarget.textContent)}
                      className="text-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 rounded p-2 transition-all bg-slate-50 border border-slate-100"
                    >
                      {editedContent.title || "Our Core Capabilities"}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {capIndices.map((idx) => {
                      const titleKey = `cap${idx}Title`;
                      const descKey = `cap${idx}Description`;
                      const iconKey = `cap${idx}Icon`;
                      
                      const titleVal = editedContent[titleKey] !== undefined ? editedContent[titleKey] : defaults[idx-1].title;
                      const descVal = editedContent[descKey] !== undefined ? editedContent[descKey] : defaults[idx-1].description;
                      const iconVal = editedContent[iconKey] || defaults[idx-1].icon;
                      const isHidden = titleVal === "";

                      const IconComponent = iconMap[iconVal] || Settings;

                      return (
                        <div key={idx} className={`bg-white rounded-2xl p-6 border ${isHidden ? 'border-red-200 bg-red-50/30' : 'border-gray-100'} shadow-sm relative group/card flex flex-col md:flex-row gap-6 transition-all`}>
                          {/* Remove/Undo Button */}
                          <div className="absolute top-4 right-4 z-10">
                            {isHidden ? (
                              <button 
                                onClick={() => {
                                  const newContent = { ...editedContent };
                                  delete newContent[titleKey];
                                  delete newContent[descKey];
                                  delete newContent[iconKey];
                                  setEditedContent(newContent);
                                }}
                                className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-1 text-[10px] font-bold"
                                title="Restore Default"
                              >
                                <span>RE-ENABLE</span>
                              </button>
                            ) : (
                              <button 
                                onClick={() => {
                                  handleChange(titleKey, "");
                                  handleChange(descKey, "");
                                }}
                                className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 opacity-0 group-hover/card:opacity-100 transition-all shadow-sm"
                                title="Remove item"
                              >
                                <X size={14} />
                              </button>
                            )}
                          </div>

                          {/* Mini Visual Preview (Interactive) */}
                          <div className={`w-full md:w-1/3 shrink-0 rounded-2xl border p-5 flex items-start gap-4 transition-all ${isHidden ? 'bg-gray-100 border-gray-200 grayscale opacity-50' : 'bg-slate-50 border-slate-100 group-hover/card:bg-blue-50/50 shadow-sm'}`}>
                             <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center transition-all ${isHidden ? 'bg-gray-300 text-gray-500' : 'bg-white text-blue-600 shadow-sm border border-slate-200 group-hover/card:scale-110'}`}>
                                <IconComponent size={24} />
                             </div>
                             <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4 
                                    contentEditable={!isHidden}
                                    suppressContentEditableWarning
                                    onInput={(e) => handleChange(titleKey, e.currentTarget.textContent)}
                                    className={`text-sm font-bold mb-1 outline-none focus:ring-1 focus:ring-blue-500 rounded px-1 transition-all ${isHidden ? 'text-gray-400 italic font-normal' : 'text-slate-900'}`}
                                  >
                                    {isHidden ? "Hidden Item" : titleVal}
                                  </h4>
                                  {isHidden && <span className="text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Hidden</span>}
                                </div>
                                <p 
                                  contentEditable={!isHidden}
                                  suppressContentEditableWarning
                                  onInput={(e) => handleChange(descKey, e.currentTarget.textContent)}
                                  className={`text-[10px] leading-relaxed outline-none focus:ring-1 focus:ring-blue-500 rounded px-1 transition-all ${isHidden ? 'text-gray-400' : 'text-slate-500'}`}
                                >
                                  {isHidden ? "This item will not appear on the website." : descVal || "No description provided."}
                                </p>
                             </div>
                          </div>

                          {/* Editable Fields */}
                          {!isHidden && (
                            <div className="flex-1 space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Title</label>
                                  <input
                                    type="text"
                                    value={editedContent[titleKey] || ""}
                                    placeholder={defaults[idx-1].title}
                                    onChange={(e) => handleChange(titleKey, e.target.value)}
                                    className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Icon</label>
                                  <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 rounded-lg border border-slate-200">
                                    {Object.keys(iconMap).map(iconName => {
                                      const PickerIcon = iconMap[iconName];
                                      return (
                                        <button
                                          key={iconName}
                                          onClick={() => handleChange(iconKey, iconName)}
                                          className={`p-1.5 rounded-md transition-all ${iconVal === iconName ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                                          title={iconName}
                                        >
                                          <PickerIcon size={14} />
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Description</label>
                                <textarea
                                  value={editedContent[descKey] || ""}
                                  placeholder={defaults[idx-1].description}
                                  onChange={(e) => handleChange(descKey, e.target.value)}
                                  className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none min-h-[80px]"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()
          ) : type === "cnh-design" ? (
            // ── Special UI for CNH Moulds Design ────────────────────────
            (() => {
              const swIndices = [1, 2, 3, 4];
              const defaults = [
                { name: "NX 11", description: "Powerful CAD/CAM solution for high-precision engineering." },
                { name: "WORKXPLORE", description: "Advanced 3D visualization and analysis software." },
                { name: "MouldFlow Analysis", description: "Flow simulation study by experts for pro-active design" },
                { name: "Delcam", description: "Precision software for toolpath generation and machining." }
              ];

              return (
                <div className="space-y-8">
                  {/* Background Image Header */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 capitalize">Background Image URL</label>
                    <div className="flex gap-4 items-start">
                      <input
                        type="text"
                        value={editedContent.backgroundImage || ""}
                        onChange={(e) => handleChange("backgroundImage", e.target.value)}
                        placeholder="https://..."
                        className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                      />
                      <div className="w-24 h-16 shrink-0 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center relative">
                        {editedContent.backgroundImage ? (
                          <img src={editedContent.backgroundImage} alt="Preview" className="max-w-full max-h-full object-cover" />
                        ) : (
                          <span className="text-[10px] text-gray-400 font-medium">No Image</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section Title & Description */}
                  <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 capitalize">Main Title</label>
                      <h2
                        contentEditable
                        suppressContentEditableWarning
                        onInput={(e) => handleChange("title", e.currentTarget.textContent)}
                        className="text-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 rounded p-2 transition-all bg-white border border-slate-200"
                      >
                        {editedContent.title || "Advanced Design & Engineering"}
                      </h2>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 capitalize">Section Description</label>
                      <p
                        contentEditable
                        suppressContentEditableWarning
                        onInput={(e) => handleChange("description", e.currentTarget.textContent)}
                        className="text-sm text-slate-600 outline-none focus:ring-1 focus:ring-blue-500 rounded p-2 transition-all bg-white border border-slate-200 min-h-[60px]"
                      >
                        {editedContent.description || "We leverage industry-leading software solutions..."}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {swIndices.map((idx) => {
                      const nameKey = `sw${idx}Name`;
                      const descKey = `sw${idx}Description`;
                      
                      const nameVal = editedContent[nameKey] !== undefined ? editedContent[nameKey] : defaults[idx-1].name;
                      const descVal = editedContent[descKey] !== undefined ? editedContent[descKey] : defaults[idx-1].description;
                      const isHidden = nameVal === "";

                      return (
                        <div key={idx} className={`bg-white rounded-2xl p-6 border ${isHidden ? 'border-red-200 bg-red-50/30' : 'border-gray-100'} shadow-sm relative group/card flex flex-col gap-4 transition-all`}>
                          {/* Remove/Undo Button */}
                          <div className="absolute top-4 right-4 z-10">
                            {isHidden ? (
                              <button 
                                onClick={() => {
                                  const newContent = { ...editedContent };
                                  delete newContent[nameKey];
                                  delete newContent[descKey];
                                  setEditedContent(newContent);
                                }}
                                className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-1 text-[10px] font-bold"
                                title="Restore Default"
                              >
                                <span>RE-ENABLE</span>
                              </button>
                            ) : (
                              <button 
                                onClick={() => {
                                  handleChange(nameKey, "");
                                  handleChange(descKey, "");
                                }}
                                className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 opacity-0 group-hover/card:opacity-100 transition-all shadow-sm"
                                title="Remove item"
                              >
                                <X size={14} />
                              </button>
                            )}
                          </div>

                          {/* Mini Visual Preview (Interactive) - Dark Theme to match Design section */}
                          <div className={`w-full rounded-2xl p-5 flex flex-col items-center gap-3 border shadow-xl transition-all ${isHidden ? 'bg-gray-100 border-gray-200 grayscale opacity-50' : 'bg-slate-950 border-slate-800 text-white group-hover/card:scale-[1.02]'}`}>
                            <div className={`w-10 h-1 rounded-full mb-1 transition-all ${isHidden ? 'bg-gray-300' : 'bg-white/40 group-hover/card:bg-white group-hover/card:w-16'}`} />
                            <div className="flex items-center gap-2 justify-center">
                              <h4 
                                contentEditable={!isHidden}
                                suppressContentEditableWarning
                                onInput={(e) => handleChange(nameKey, e.currentTarget.textContent)}
                                className={`text-lg font-bold outline-none focus:ring-1 focus:ring-blue-500 rounded px-1 transition-all ${isHidden ? 'text-gray-400 italic' : ''}`}
                              >
                                {isHidden ? "Hidden Package" : nameVal}
                              </h4>
                              {isHidden && <span className="text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Hidden</span>}
                            </div>
                            <p 
                              contentEditable={!isHidden}
                              suppressContentEditableWarning
                              onInput={(e) => handleChange(descKey, e.currentTarget.textContent)}
                              className={`text-[9px] font-light leading-relaxed outline-none focus:ring-1 focus:ring-blue-500 rounded px-1 transition-all text-center ${isHidden ? 'text-gray-400' : 'text-slate-400'}`}
                            >
                              {isHidden ? "This package will not appear on the website." : descVal}
                            </p>
                          </div>

                          {/* Editable Fields */}
                          {!isHidden && (
                            <div className="space-y-3 pt-2">
                              <div className="space-y-1">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Software Name</label>
                                <input
                                  type="text"
                                  value={editedContent[nameKey] || ""}
                                  placeholder={defaults[idx-1].name}
                                  onChange={(e) => handleChange(nameKey, e.target.value)}
                                  className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Description</label>
                                <textarea
                                  value={editedContent[descKey] || ""}
                                  placeholder={defaults[idx-1].description}
                                  onChange={(e) => handleChange(descKey, e.target.value)}
                                  className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none min-h-[60px]"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()
          ) : type === "ep-image-carousel" || type === "cs-image-carousel" ? (
            // ── Special UI for Engineering Products & Connection Systems Image Carousel ──
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Header Section</h3>
                {["title", "subtitle"].map((key) => (
                  <div key={key} className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 capitalize">
                      {key}
                    </label>
                    <input
                      type="text"
                      value={editedContent[key] || ""}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-6 bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-blue-200 pb-2 gap-4">
                  <h3 className="text-lg font-bold text-blue-900">Carousel Images</h3>
                  <button
                    onClick={() => {
                      const existingIndices = Object.keys(editedContent)
                        .map(key => {
                          const match = key.match(/^image(\d+)(Src|Alt)$/);
                          return match ? parseInt(match[1]) : 0;
                        })
                        .filter(v => v > 0);
                      const maxIdx = existingIndices.length > 0 ? Math.max(...existingIndices) : 3;
                      const nextIdx = maxIdx + 1;
                      handleChange(`image${nextIdx}Src`, "");
                      handleChange(`image${nextIdx}Alt`, `Added Image ${nextIdx}`);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                  >
                    <Plus size={16} /> Add Another Image
                  </button>
                </div>
                
                {(() => {
                  const indices = new Set<number>([1, 2, 3]); // Guarantee at least 3 initial slots
                  Object.keys(editedContent).forEach((key) => {
                    const match = key.match(/^image(\d+)(Src|Alt)$/);
                    if (match) indices.add(parseInt(match[1]));
                  });
                  const sortedIndices = Array.from(indices).sort((a, b) => a - b);

                  return sortedIndices.map((idx) => {
                    const altKey = `image${idx}Alt`;
                    const srcKey = `image${idx}Src`;
                    
                    return (
                      <div key={idx} className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm relative group overflow-hidden">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-gray-500">Image {idx} Label / Alt Text</label>
                            <input
                              type="text"
                              value={editedContent[altKey] || ""}
                              onChange={(e) => handleChange(altKey, e.target.value)}
                              placeholder={`e.g. Advanced Precision Molding ${idx}`}
                              className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="block text-xs font-semibold text-gray-500">Image {idx} Source URL</label>
                            <div className="flex gap-4">
                              <input
                                type="text"
                                value={editedContent[srcKey] || ""}
                                onChange={(e) => handleChange(srcKey, e.target.value)}
                                placeholder="https://..."
                                className="flex-1 p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                              />
                              <div className="w-16 h-16 shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center">
                                {editedContent[srcKey] ? (
                                  <img src={editedContent[srcKey]} alt="preview" className="w-full h-full object-cover" />
                                ) : (
                                  <span className="text-[10px] text-gray-400">Empty</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {idx > 3 && (
                          <div className="absolute top-2 right-2">
                             <button
                               onClick={() => {
                                 // Clear this element's data to effectively "remove" it
                                 handleChange(srcKey, "");
                                 handleChange(altKey, "");
                               }}
                               className="p-1 rounded bg-slate-100 text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors"
                               title="Clear Image"
                             >
                                <X size={14} />
                             </button>
                          </div>
                        )}
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          ) : type === "cnh-infrastructure" ? (
            // ── Special UI for CNH Moulds Infrastructure ────────────────
            (() => {
              const macIndices = [1, 2, 3, 4];
              const defaults = [
                { name: "CNC Milling", qty: 3, description: "High-precision machining for complex molds." },
                { name: "EDM & Wire EDM", qty: 10, description: "Intricate detailing and superior surface finishes." },
                { name: "Surface Grinding", qty: 7, description: "High-accuracy finishing for mold components." },
                { name: "Metrology (CMM/VMM)", qty: 2, description: "Ensuring precise measurements and quality control." }
              ];

              return (
                <div className="space-y-8">
                  {/* Section Title & Description */}
                  <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div className="space-y-2">
                       <label className="block text-sm font-semibold text-gray-700 capitalize">Main Title</label>
                       <h2
                        contentEditable
                        suppressContentEditableWarning
                        onInput={(e) => handleChange("title", e.currentTarget.textContent)}
                        className="text-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 rounded p-2 transition-all bg-white border border-slate-200"
                      >
                        {editedContent.title || "State-of-the-Art Infrastructure"}
                      </h2>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 capitalize">Section Description</label>
                      <p
                        contentEditable
                        suppressContentEditableWarning
                        onInput={(e) => handleChange("description", e.currentTarget.textContent)}
                        className="text-sm text-slate-600 outline-none focus:ring-1 focus:ring-blue-500 rounded p-2 transition-all bg-white border border-slate-200 min-h-[60px]"
                      >
                        {editedContent.description || "Our new 20,000 sq. ft. facility..."}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {macIndices.map((idx) => {
                      const nameKey = `mac${idx}Name`;
                      const qtyKey = `mac${idx}Qty`;
                      const descKey = `mac${idx}Description`;
                      
                      const nameVal = editedContent[nameKey] !== undefined ? editedContent[nameKey] : defaults[idx-1].name;
                      const qtyVal = editedContent[qtyKey] !== undefined ? editedContent[qtyKey] : defaults[idx-1].qty;
                      const descVal = editedContent[descKey] !== undefined ? editedContent[descKey] : defaults[idx-1].description;
                      const isHidden = nameVal === "";

                      return (
                        <div key={idx} className={`bg-white rounded-2xl p-6 border ${isHidden ? 'border-red-200 bg-red-50/30' : 'border-gray-100'} shadow-sm relative group/card flex flex-col gap-4 transition-all`}>
                          {/* Remove/Undo Button */}
                          <div className="absolute top-4 right-4 z-10">
                            {isHidden ? (
                              <button 
                                onClick={() => {
                                  const newContent = { ...editedContent };
                                  delete newContent[nameKey];
                                  delete newContent[qtyKey];
                                  delete newContent[descKey];
                                  setEditedContent(newContent);
                                }}
                                className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-1 text-[10px] font-bold"
                                title="Restore Default"
                              >
                                <span>RE-ENABLE</span>
                              </button>
                            ) : (
                              <button 
                                onClick={() => {
                                  handleChange(nameKey, "");
                                }}
                                className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 opacity-0 group-hover/card:opacity-100 transition-all shadow-sm"
                                title="Remove item"
                              >
                                <X size={14} />
                              </button>
                            )}
                          </div>

                          {/* Mini Visual Preview (Interactive) */}
                          <div className={`w-full rounded-[2rem] p-6 flex flex-col gap-4 border shadow-md transition-all ${isHidden ? 'bg-gray-100 border-gray-200 grayscale opacity-50' : 'bg-white border-slate-100 group-hover/card:shadow-lg'}`}>
                             <div className="flex justify-between items-center">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isHidden ? 'bg-gray-300 text-gray-500' : 'bg-slate-100 text-slate-400 group-hover/card:bg-blue-600 group-hover/card:text-white'}`}>
                                   <Cog size={18} />
                                </div>
                                <span className={`text-2xl font-black italic transition-colors ${isHidden ? 'text-gray-300' : 'text-slate-100 group-hover/card:text-blue-600/10'}`}>
                                   {qtyVal} Units
                                </span>
                             </div>
                             <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 
                                    contentEditable={!isHidden}
                                    suppressContentEditableWarning
                                    onInput={(e) => handleChange(nameKey, e.currentTarget.textContent)}
                                    className={`text-base font-bold outline-none focus:ring-1 focus:ring-blue-500 rounded px-1 transition-all ${isHidden ? 'text-gray-400 italic font-normal' : 'text-slate-900'}`}
                                  >
                                    {isHidden ? "Hidden Machine" : nameVal}
                                  </h4>
                                  {isHidden && <span className="text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Hidden</span>}
                                </div>
                                <p 
                                  contentEditable={!isHidden}
                                  suppressContentEditableWarning
                                  onInput={(e) => handleChange(descKey, e.currentTarget.textContent)}
                                  className={`text-[10px] leading-relaxed outline-none focus:ring-1 focus:ring-blue-500 rounded px-1 transition-all ${isHidden ? 'text-gray-400' : 'text-slate-500'}`}
                                >
                                  {isHidden ? "This item will not appear on the website." : descVal}
                                </p>
                             </div>
                          </div>

                          {/* Editable Fields */}
                          {!isHidden && (
                            <div className="grid grid-cols-4 gap-3 pt-2">
                              <div className="col-span-3 space-y-1">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Machine Name</label>
                                <input
                                  type="text"
                                  value={editedContent[nameKey] || ""}
                                  placeholder={defaults[idx-1].name}
                                  onChange={(e) => handleChange(nameKey, e.target.value)}
                                  className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Qty</label>
                                <input
                                  type="number"
                                  value={editedContent[qtyKey] || ""}
                                  placeholder={String(defaults[idx-1].qty)}
                                  onChange={(e) => handleChange(qtyKey, e.target.value)}
                                  className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                                />
                              </div>
                              <div className="col-span-4 space-y-1">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Description</label>
                                <textarea
                                  value={editedContent[descKey] || ""}
                                  placeholder={defaults[idx-1].description}
                                  onChange={(e) => handleChange(descKey, e.target.value)}
                                  className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none min-h-[60px]"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()
          ) : type === "cnh-materials" ? (
            // ── Special UI for CNH Moulds Materials ─────────────────────
            (() => {
              const stIndices = [1, 2, 3, 4, 5];
              const defaults = [
                { name: "P20 & P20 HH", description: "Pre-hardened tool steels ideal for plastic moulds." },
                { name: "1.2344 ESR", description: "High-performance hot-work steel with heat resistance." },
                { name: "Orvar Supreme", description: "Premium-grade steel with excellent toughness and polishability." },
                { name: "Unimax", description: "High-hardness tool steel for extreme wear conditions." },
                { name: "Elmax", description: "Stainless tool steel for maximum corrosion protection." }
              ];

              return (
                <div className="space-y-8">
                  {/* Section Title & Description */}
                  <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div className="space-y-2">
                       <label className="block text-sm font-semibold text-gray-700 capitalize">Main Title</label>
                       <h2
                        contentEditable
                        suppressContentEditableWarning
                        onInput={(e) => handleChange("title", e.currentTarget.textContent)}
                        className="text-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 rounded p-2 transition-all bg-white border border-slate-200"
                      >
                        {editedContent.title || "Premium-Grade Tool Steels"}
                      </h2>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 capitalize">Section Description</label>
                      <p
                        contentEditable
                        suppressContentEditableWarning
                        onInput={(e) => handleChange("description", e.currentTarget.textContent)}
                        className="text-sm text-slate-600 outline-none focus:ring-1 focus:ring-blue-500 rounded p-2 transition-all bg-white border border-slate-200 min-h-[60px]"
                      >
                        {editedContent.description || "We prioritize quality and durability..."}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stIndices.map((idx) => {
                      const nameKey = `st${idx}Name`;
                      const descKey = `st${idx}Description`;
                      
                      const nameVal = editedContent[nameKey] !== undefined ? editedContent[nameKey] : defaults[idx-1].name;
                      const descVal = editedContent[descKey] !== undefined ? editedContent[descKey] : defaults[idx-1].description;
                      const isHidden = nameVal === "";

                      return (
                        <div key={idx} className={`bg-white rounded-2xl p-6 border ${isHidden ? 'border-red-200 bg-red-50/30' : 'border-gray-100'} shadow-sm relative group/card flex flex-col gap-4 transition-all`}>
                          {/* Remove/Undo Button */}
                          <div className="absolute top-4 right-4 z-10">
                            {isHidden ? (
                              <button 
                                onClick={() => {
                                  const newContent = { ...editedContent };
                                  delete newContent[nameKey];
                                  delete newContent[descKey];
                                  setEditedContent(newContent);
                                }}
                                className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-1 text-[10px] font-bold"
                                title="Restore Default"
                              >
                                <span>RE-ENABLE</span>
                              </button>
                            ) : (
                              <button 
                                onClick={() => {
                                  handleChange(nameKey, "");
                                  handleChange(descKey, "");
                                }}
                                className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 opacity-0 group-hover/card:opacity-100 transition-all"
                                title="Remove item"
                              >
                                <X size={14} />
                              </button>
                            )}
                          </div>

                          {/* Mini Visual Preview (Interactive) */}
                          <div className={`w-full rounded-2xl p-5 flex items-start gap-4 border shadow-md transition-all ${isHidden ? 'bg-gray-100 border-gray-200 grayscale opacity-50' : 'bg-white border-slate-100 group-hover/card:shadow-lg'}`}>
                             <div className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center transition-colors ${isHidden ? 'bg-gray-300 text-gray-500' : 'bg-blue-100 text-blue-600 group-hover/card:bg-blue-600 group-hover/card:text-white'}`}>
                                <ShieldCheck size={20} />
                             </div>
                             <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 
                                    contentEditable={!isHidden}
                                    suppressContentEditableWarning
                                    onInput={(e) => handleChange(nameKey, e.currentTarget.textContent)}
                                    className={`text-sm font-bold outline-none focus:ring-1 focus:ring-blue-500 rounded px-1 transition-all ${isHidden ? 'text-gray-400 italic font-normal' : 'text-slate-900'}`}
                                  >
                                    {isHidden ? "Hidden Item" : nameVal}
                                  </h4>
                                  {isHidden && <span className="text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Hidden</span>}
                                </div>
                                <p 
                                  contentEditable={!isHidden}
                                  suppressContentEditableWarning
                                  onInput={(e) => handleChange(descKey, e.currentTarget.textContent)}
                                  className={`text-[10px] leading-relaxed outline-none focus:ring-1 focus:ring-blue-500 rounded px-1 transition-all ${isHidden ? 'text-gray-400' : 'text-slate-500'}`}
                                >
                                  {isHidden ? "This box will not appear on the website." : descVal}
                                </p>
                             </div>
                          </div>

                          {/* Editable Fields */}
                          {!isHidden && (
                            <div className="space-y-3 pt-2">
                              <div className="space-y-1">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Material Name</label>
                                <input
                                  type="text"
                                  value={editedContent[nameKey] || ""}
                                  placeholder={defaults[idx-1].name}
                                  onChange={(e) => handleChange(nameKey, e.target.value)}
                                  className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Description</label>
                                <textarea
                                  value={editedContent[descKey] || ""}
                                  placeholder={defaults[idx-1].description}
                                  onChange={(e) => handleChange(descKey, e.target.value)}
                                  className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none min-h-[60px]"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
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
          ) : type === "cs-products" ? (
            // ── Special UI for Connection Systems Products ──────────────
            <div className="space-y-10">
              {/* Header & Background Fields */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Header & Background</h3>
                {["title", "segmentsTitle", "backgroundImage"].map((key) => {
                  const isImage = key === "backgroundImage";
                  return (
                    <div key={key} className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      {isImage ? (
                        <div className="flex gap-4 items-start">
                          <input
                            type="text"
                            value={editedContent[key] || ""}
                            onChange={(e) => handleChange(key, e.target.value)}
                            placeholder="Image URL..."
                            className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                          />
                          <div className="w-24 h-24 shrink-0 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center relative">
                            {editedContent[key] ? (
                              <img src={editedContent[key]} alt="Preview" className="max-w-full max-h-full object-contain" />
                            ) : (
                              <span className="text-xs text-gray-400 font-medium">No Image</span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={editedContent[key] || ""}
                          onChange={(e) => handleChange(key, e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                        />
                      )}
                    </div>
                  );
                })}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 capitalize">Segments Description</label>
                  <textarea
                    value={editedContent.segments || ""}
                    onChange={(e) => handleChange("segments", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px] text-gray-900"
                  />
                </div>
              </div>

              {/* Products Array */}
              <div className="space-y-6 bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                <div className="flex items-center justify-between border-b border-blue-200 pb-3">
                  <h3 className="text-lg font-bold text-blue-900">Products List</h3>
                  <button
                    onClick={() => {
                      const currentProducts = Array.isArray(editedContent.products) ? [...editedContent.products] : [];
                      handleChange("products", [...currentProducts, "New Product"]);
                    }}
                    className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    + Add Product
                  </button>
                </div>
                <div className="space-y-3">
                  {(!editedContent.products || editedContent.products.length === 0) && (
                    <p className="text-sm text-gray-500 italic">No products added.</p>
                  )}
                  {Array.isArray(editedContent.products) && editedContent.products.map((product: string, idx: number) => {
                    // Determine preview match for icon
                    const p = product.toLowerCase();
                    let iconPreview = "Zap"; // Default Zap
                    if (p.includes('sealed')) iconPreview = "Unplug";
                    else if (p.includes('smt')) iconPreview = "Cpu";
                    else if (p.includes('headers')) iconPreview = "Layers";
                    else if (p.includes('terminals')) iconPreview = "Box";
                    else if (p.includes('relay')) iconPreview = "Power";
                    else if (p.includes('hybrid')) iconPreview = "Radio";

                    return (
                      <div key={idx} className="flex gap-3 items-center">
                        <div className="w-10 h-10 shrink-0 bg-white border border-blue-200 rounded-lg flex flex-col items-center justify-center text-blue-600 shadow-sm" title={`Icon preview: ${iconPreview}`}>
                          <div className="text-[10px] font-bold">{iconPreview}</div>
                        </div>
                        <input
                          type="text"
                          value={product}
                          onChange={(e) => {
                            const newProducts = [...editedContent.products];
                            newProducts[idx] = e.target.value;
                            handleChange("products", newProducts);
                          }}
                          className="flex-1 p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                          placeholder="Product name..."
                        />
                        <div className="flex bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shrink-0">
                          <button
                            onClick={() => {
                              if (idx === 0) return;
                              const newProducts = [...editedContent.products];
                              const temp = newProducts[idx];
                              newProducts[idx] = newProducts[idx - 1];
                              newProducts[idx - 1] = temp;
                              handleChange("products", newProducts);
                            }}
                            disabled={idx === 0}
                            className="p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition disabled:opacity-30 disabled:hover:bg-transparent"
                            title="Move Up"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (idx === editedContent.products.length - 1) return;
                              const newProducts = [...editedContent.products];
                              const temp = newProducts[idx];
                              newProducts[idx] = newProducts[idx + 1];
                              newProducts[idx + 1] = temp;
                              handleChange("products", newProducts);
                            }}
                            disabled={idx === editedContent.products.length - 1}
                            className="p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition disabled:opacity-30 disabled:hover:bg-transparent border-l border-gray-200"
                            title="Move Down"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            const newProducts = [...editedContent.products];
                            newProducts.splice(idx, 1);
                            handleChange("products", newProducts);
                          }}
                          className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition border border-transparent hover:border-red-100 shrink-0"
                          title="Remove Product"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : type === "cert-list" ? (
            // ── Special UI for Certification List ─────────────────────────
            (() => {
              const itemIndices = new Set<number>();
              [1, 2, 3, 4].forEach((n) => itemIndices.add(n));
              Object.keys(editedContent).forEach((k) => {
                const m = k.match(/^item_(\d+)_/);
                if (m) itemIndices.add(parseInt(m[1]));
              });
              const sortedIndices = Array.from(itemIndices).sort((a, b) => a - b);

              return (
                <div className="space-y-6">
                  {["title", "subtitle"].map((key) => (
                    <div key={key} className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 capitalize">{key}</label>
                      <input
                        type="text"
                        value={editedContent[key] || ""}
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                      />
                    </div>
                  ))}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900">Certificates</h3>
                    <button
                      onClick={() => {
                        let nextIdx = 1;
                        while (editedContent[`item_${nextIdx}_title`] !== undefined) nextIdx++;
                        const prefix = `item_${nextIdx}`;
                        const newContent = { ...editedContent };
                        newContent[`${prefix}_title`] = "New Certificate";
                        newContent[`${prefix}_description`] = "Certificate description goes here.";
                        newContent[`${prefix}_icon`] = "Award";
                        newContent[`${prefix}_imageUrl`] = "";
                        newContent[`${prefix}_issuedBy`] = "";
                        setEditedContent(newContent);
                      }}
                      className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Add Certificate
                    </button>
                  </div>

                  <div className="space-y-5">
                    {sortedIndices.map((idx) => {
                      const prefix = `item_${idx}`;
                      const imageUrl = editedContent[`${prefix}_imageUrl`] || "";
                      const itemTitle = editedContent[`${prefix}_title`] || `Certificate ${idx}`;

                      return (
                        <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative group/card">
                          <button
                            onClick={() => {
                              const newContent = { ...editedContent };
                              delete newContent[`${prefix}_title`];
                              delete newContent[`${prefix}_description`];
                              delete newContent[`${prefix}_icon`];
                              delete newContent[`${prefix}_imageUrl`];
                              delete newContent[`${prefix}_issuedBy`];
                              setEditedContent(newContent);
                            }}
                            className="absolute top-3 right-3 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition opacity-0 group-hover/card:opacity-100 z-10"
                          >
                            <X className="w-4 h-4" />
                          </button>

                          {/* Preview Card */}
                          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                            <div className="w-16 h-16 rounded-xl border border-gray-200 bg-slate-50 overflow-hidden flex items-center justify-center shrink-0">
                              {imageUrl ? (
                                <img src={imageUrl} alt={itemTitle} className="w-full h-full object-contain p-1" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                              ) : (
                                <span className="text-[10px] text-gray-400 text-center px-1">No image</span>
                              )}
                            </div>
                            <div>
                              <div className="text-xs text-blue-500 font-bold uppercase tracking-widest mb-0.5">{editedContent[`${prefix}_issuedBy`] || "Issuing Body"}</div>
                              <div className="text-sm font-black text-gray-900">{itemTitle}</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Title</label>
                              <input type="text" value={editedContent[`${prefix}_title`] || ""} onChange={(e) => handleChange(`${prefix}_title`, e.target.value)} className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none" placeholder="e.g. ISO 9001:2015" />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Issued By</label>
                              <input type="text" value={editedContent[`${prefix}_issuedBy`] || ""} onChange={(e) => handleChange(`${prefix}_issuedBy`, e.target.value)} className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none" placeholder="e.g. Bureau Veritas" />
                            </div>
                            <div className="space-y-1 md:col-span-2">
                              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Description</label>
                              <textarea value={editedContent[`${prefix}_description`] || ""} onChange={(e) => handleChange(`${prefix}_description`, e.target.value)} className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none resize-none min-h-[60px]" placeholder="Brief certification description..." />
                            </div>
                            <div className="space-y-1 md:col-span-2">
                              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Certificate Image URL</label>
                              <div className="flex gap-3 items-center">
                                <input type="text" value={imageUrl} onChange={(e) => handleChange(`${prefix}_imageUrl`, e.target.value)} className="flex-1 p-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none" placeholder="Paste certificate image URL..." />
                                <div className="w-16 h-14 shrink-0 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center">
                                  {imageUrl ? (
                                    <img src={imageUrl} alt="Preview" className="max-w-full max-h-full object-contain p-1" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                                  ) : (
                                    <span className="text-[9px] text-gray-400 text-center">No image</span>
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
              );
            })()
          ) : type === "awards-list" ? (
            // ── Special UI for Awards List ───────────────────────────────
            (() => {
              const itemIndices = new Set<number>();
              [1, 2, 3, 4].forEach((n) => itemIndices.add(n));
              Object.keys(editedContent).forEach((k) => {
                const m = k.match(/^item_(\d+)_/);
                if (m) itemIndices.add(parseInt(m[1]));
              });
              const sortedIndices = Array.from(itemIndices).sort((a, b) => a - b);

              return (
                <div className="space-y-6">
                  {["title", "subtitle"].map((key) => (
                    <div key={key} className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 capitalize">{key}</label>
                      <input
                        type="text"
                        value={editedContent[key] || ""}
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                      />
                    </div>
                  ))}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900">Awards & Recognitions</h3>
                    <button
                      onClick={() => {
                        let nextIdx = 1;
                        while (editedContent[`item_${nextIdx}_title`] !== undefined) nextIdx++;
                        const prefix = `item_${nextIdx}`;
                        const newContent = { ...editedContent };
                        newContent[`${prefix}_year`] = new Date().getFullYear().toString();
                        newContent[`${prefix}_title`] = "New Award Title";
                        newContent[`${prefix}_organization`] = "Awarding Organization";
                        newContent[`${prefix}_icon`] = "Trophy";
                        newContent[`${prefix}_imageUrl`] = "";
                        setEditedContent(newContent);
                      }}
                      className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Add Award
                    </button>
                  </div>

                  <div className="space-y-5">
                    {sortedIndices.map((idx) => {
                      const prefix = `item_${idx}`;
                      const imageUrl = editedContent[`${prefix}_imageUrl`] || "";
                      const awardTitle = editedContent[`${prefix}_title`] || `Award ${idx}`;
                      const awardYear = editedContent[`${prefix}_year`] || "";

                      return (
                        <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative group/card">
                          <button
                            onClick={() => {
                              const newContent = { ...editedContent };
                              delete newContent[`${prefix}_year`];
                              delete newContent[`${prefix}_title`];
                              delete newContent[`${prefix}_organization`];
                              delete newContent[`${prefix}_icon`];
                              delete newContent[`${prefix}_imageUrl`];
                              setEditedContent(newContent);
                            }}
                            className="absolute top-3 right-3 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition opacity-0 group-hover/card:opacity-100 z-10"
                          >
                            <X className="w-4 h-4" />
                          </button>

                          {/* Preview Card */}
                          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                            <div className="w-16 h-16 rounded-xl border border-gray-200 bg-slate-100 overflow-hidden flex items-center justify-center shrink-0">
                              {imageUrl ? (
                                <img src={imageUrl} alt={awardTitle} className="w-full h-full object-contain p-1" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                              ) : (
                                <Award className="w-8 h-8 text-blue-400" />
                              )}
                            </div>
                            <div>
                              <div className="text-xs text-blue-500 font-bold uppercase tracking-widest mb-0.5">{awardYear}</div>
                              <div className="text-sm font-black text-gray-900 line-clamp-1">{awardTitle}</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Year</label>
                              <input type="text" value={awardYear} onChange={(e) => handleChange(`${prefix}_year`, e.target.value)} className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none" placeholder="e.g. 2024" />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Title</label>
                              <input type="text" value={awardTitle} onChange={(e) => handleChange(`${prefix}_title`, e.target.value)} className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none" placeholder="Award Title..." />
                            </div>
                            <div className="space-y-1 md:col-span-2">
                              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Organization</label>
                              <input type="text" value={editedContent[`${prefix}_organization`] || ""} onChange={(e) => handleChange(`${prefix}_organization`, e.target.value)} className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none" placeholder="Awarding Body..." />
                            </div>
                            <div className="space-y-1 md:col-span-2">
                              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Award Image URL</label>
                              <div className="flex gap-3 items-center">
                                <input type="text" value={imageUrl} onChange={(e) => handleChange(`${prefix}_imageUrl`, e.target.value)} className="flex-1 p-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none" placeholder="Paste image URL..." />
                                <div className="w-16 h-14 shrink-0 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center">
                                  {imageUrl ? (
                                    <img src={imageUrl} alt="Preview" className="max-w-full max-h-full object-contain p-1" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                                  ) : (
                                    <span className="text-[9px] text-gray-400 text-center">No image</span>
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
              );
            })()
          ) : type === "machinery-capacity" ? (
            // ── Special UI for Machinery Plant Capacity ──────────────────
            (() => {
              const currentPlants = Array.isArray(editedContent?.plants) ? editedContent.plants : [];

              return (
                <div className="space-y-8">
                  {/* General Header Fields */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Section Headers</h3>
                    {["title", "subtitle", "expansionNote"].map((key) => (
                      <div key={key} className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </label>
                        {key === "expansionNote" ? (
                          <textarea
                            value={editedContent?.[key] || ""}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none min-h-[80px] text-gray-900"
                          />
                        ) : (
                          <input
                            type="text"
                            value={editedContent?.[key] || ""}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Plants Array */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <h3 className="text-lg font-bold text-gray-900">Manufacturing Plants</h3>
                      <button
                        onClick={() => {
                          const newPlant = {
                            unit: "New Plant",
                            capacity: "0 sq. ft.",
                            location: "Location",
                            description: "Plant description",
                            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
                            stats: ["Stat 1", "Stat 2"]
                          };
                          handleChange("plants", [...currentPlants, newPlant]);
                        }}
                        className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
                      >
                        <Plus size={16} /> Add Plant
                      </button>
                    </div>

                    <div className="space-y-6">
                      {currentPlants.map((plant: any, idx: number) => (
                        <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 relative group/card shadow-sm">
                          <button
                            onClick={() => {
                              const newPlants = [...currentPlants];
                              newPlants.splice(idx, 1);
                              handleChange("plants", newPlants);
                            }}
                            className="absolute top-3 right-3 p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition opacity-0 group-hover/card:opacity-100 z-10"
                            title="Remove Plant"
                          >
                            <X size={16} />
                          </button>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Plant Basic Info */}
                            <div className="space-y-4">
                              <div className="space-y-1">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Unit Name</label>
                                <input
                                  type="text"
                                  value={plant.unit || ""}
                                  onChange={(e) => {
                                    const newPlants = [...currentPlants];
                                    newPlants[idx] = { ...plant, unit: e.target.value };
                                    handleChange("plants", newPlants);
                                  }}
                                  className="w-full p-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Capacity</label>
                                  <input
                                    type="text"
                                    value={plant.capacity || ""}
                                    onChange={(e) => {
                                      const newPlants = [...currentPlants];
                                      newPlants[idx] = { ...plant, capacity: e.target.value };
                                      handleChange("plants", newPlants);
                                    }}
                                    className="w-full p-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</label>
                                  <input
                                    type="text"
                                    value={plant.location || ""}
                                    onChange={(e) => {
                                      const newPlants = [...currentPlants];
                                      newPlants[idx] = { ...plant, location: e.target.value };
                                      handleChange("plants", newPlants);
                                    }}
                                    className="w-full p-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                  />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description</label>
                                <textarea
                                  value={plant.description || ""}
                                  onChange={(e) => {
                                    const newPlants = [...currentPlants];
                                    newPlants[idx] = { ...plant, description: e.target.value };
                                    handleChange("plants", newPlants);
                                  }}
                                  className="w-full p-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none min-h-[60px]"
                                />
                              </div>
                            </div>

                            {/* Image Editing */}
                            <div className="space-y-4">
                              <div className="space-y-1">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Plant Image URL</label>
                                <div className="space-y-3">
                                  <input
                                    type="text"
                                    value={plant.image || ""}
                                    onChange={(e) => {
                                      const newPlants = [...currentPlants];
                                      newPlants[idx] = { ...plant, image: e.target.value };
                                      handleChange("plants", newPlants);
                                    }}
                                    placeholder="Paste image URL..."
                                    className="w-full p-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                  />
                                  <div className="h-32 rounded-xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center relative">
                                    {plant.image ? (
                                      <img src={plant.image} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                      <span className="text-xs text-gray-400 font-medium italic">No Image</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stats (Comma separated)</label>
                                <input
                                  type="text"
                                  value={Array.isArray(plant.stats) ? plant.stats.join(", ") : ""}
                                  onChange={(e) => {
                                    const newPlants = [...currentPlants];
                                    newPlants[idx] = { ...plant, stats: e.target.value.split(",").map(s => s.trim()).filter(Boolean) };
                                    handleChange("plants", newPlants);
                                  }}
                                  className="w-full p-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                  placeholder="Stat 1, Stat 2..."
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
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
                key.toLowerCase().includes("img") ||
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
