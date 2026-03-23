"use client";

import NewsSection from "./home/NewsSection";
import Hero from "./home/Hero";
import About from "./home/About";
import FeaturedProducts from "./home/FeaturedProducts";
import VideoSection from "./home/VideoSection";
import TextImageSection from "./home/TextImageSection";
import StatsSection from "./home/StatsSection";
import CardGrid from "./home/CardGrid";
import ClientsSection from "./home/ClientsSection";
import EventsAchievements from "./home/EventsAchievements";
import TwoCardsSection from "./home/TwoCardsSection";
import AboutHero from "./Discover-Us/AtAGlance/AboutHero";
import AboutContent from "./Discover-Us/AtAGlance/AboutContent";
import BannerImage from "./Discover-Us/AtAGlance/BannerImage";
import IconBoxes from "./Discover-Us/AtAGlance/IconBoxes";
import OverviewSection from "./Discover-Us/AtAGlance/OverviewSection";
import AboutCapabilities from "./Discover-Us/AtAGlance/AboutCapabilities";
import AboutFeatureCards from "./Discover-Us/AtAGlance/AboutFeatureCards";
import FoundersMessage from "./Discover-Us/AtAGlance/FoundersMessage";
import AboutClients from "./Discover-Us/AtAGlance/AboutClients";
import AboutMilestones from "./Discover-Us/AtAGlance/AboutMilestones";
import OurPresence from "./Discover-Us/AtAGlance/OurPresence";
import ContactBanner from "./contact/ContactBanner";
import ContactHero from "./contact/ContactHero";
import ContactForm from "./contact/ContactForm";
import ContactInfo from "./contact/ContactInfo";
import ContactAddress from "./contact/ContactAddress";
import ProductSearchSection from "./home/ProductSearchSection";
import CareerHero from "./career/CareerHero";
import CareerIntro from "./career/CareerIntro";
import CareerForm from "./career/CareerForm";
import ConnectionSystemsHero from "./DivisionsPages/ConnectionSystems/ConnectionSystemsHero";
import ConnectionSystemsOverview from "./DivisionsPages/ConnectionSystems/ConnectionSystemsOverview";
import ConnectionSystemsCapabilities from "./DivisionsPages/ConnectionSystems/ConnectionSystemsCapabilities";
import ConnectionSystemsInfrastructure from "./DivisionsPages/ConnectionSystems/ConnectionSystemsInfrastructure";
import ConnectionSystemsProducts from "./DivisionsPages/ConnectionSystems/ConnectionSystemsProducts";
import ConnectionSystemsAchievements from "./DivisionsPages/ConnectionSystems/ConnectionSystemsAchievements";
import ConnectionSystemsWhyChooseUs from "./DivisionsPages/ConnectionSystems/ConnectionSystemsWhyChooseUs";
import EngineeringHero from "./DivisionsPages/EngineringProducts/EngineeringHero";
import EngineeringAbout from "./DivisionsPages/EngineringProducts/EngineeringAbout";
import EngineeringCapabilities from "./DivisionsPages/EngineringProducts/EngineeringCapabilities";
import EngineeringInfrastructure from "./DivisionsPages/EngineringProducts/EngineeringInfrastructure";
import EngineeringQuality from "./DivisionsPages/EngineringProducts/EngineeringQuality";
import EngineeringProducts from "./DivisionsPages/EngineringProducts/EngineeringProducts";
import EngineeringWhyChooseUs from "./DivisionsPages/EngineringProducts/EngineeringWhyChooseUs";
import EngineeringCommitment from "./DivisionsPages/EngineringProducts/EngineeringCommitment";
import StampingHero from "./DivisionsPages/PrecisionStamping/StampingHero";
import StampingStats from "./DivisionsPages/PrecisionStamping/StampingStats";
import StampingInfrastructure from "./DivisionsPages/PrecisionStamping/StampingInfrastructure";
import StampingProcess from "./DivisionsPages/PrecisionStamping/StampingProcess";
import StampingMaterials from "./DivisionsPages/PrecisionStamping/StampingMaterials";
import StampingSegments from "./DivisionsPages/PrecisionStamping/StampingSegments";
import StampingTeam from "./DivisionsPages/PrecisionStamping/StampingTeam";
import StampingWhyChooseUs from "./DivisionsPages/PrecisionStamping/StampingWhyChooseUs";
import CNHMouldsHero from "./DivisionsPages/CNHMoulds/CNHMouldsHero";
import CNHMouldsCapabilities from "./DivisionsPages/CNHMoulds/CNHMouldsCapabilities";
import CNHMouldsInfrastructure from "./DivisionsPages/CNHMoulds/CNHMouldsInfrastructure";
import CNHMouldsDesign from "./DivisionsPages/CNHMoulds/CNHMouldsDesign";
import CNHMouldsMaterials from "./DivisionsPages/CNHMoulds/CNHMouldsMaterials";
import CNHMouldsProducts from "./DivisionsPages/CNHMoulds/CNHMouldsProducts";
import CNHMouldsTeam from "./DivisionsPages/CNHMoulds/CNHMouldsTeam";
import CNHMouldsWhyChooseUs from "./DivisionsPages/CNHMoulds/CNHMouldsWhyChooseUs";
import CSRBanner from "./csr/CSRBanner";
import CSRGrid from "./csr/CSRGrid";
import CSRInitiatives from "./csr/CSRInitiatives";
import CSREnvironmental from "./csr/CSREnvironmental";
import CSRHealthcare from "./csr/CSRHealthcare";
import CSRCommunity from "./csr/CSRCommunity";
import CNHMouldsCTA from "./DivisionsPages/CNHMoulds/CNHMouldsCTA";
import CoreTeamHero from "./Discover-Us/CoreTeam/CoreTeamHero";
import CoreTeamOverview from "./Discover-Us/CoreTeam/CoreTeamOverview";
import CoreTeamMembers from "./Discover-Us/CoreTeam/CoreTeamMembers";
import ValuesGovernanceHero from "./Discover-Us/OurValuesGovernance/ValuesGovernanceHero";
import ValuesGovernanceCoreValues from "./Discover-Us/OurValuesGovernance/ValuesGovernanceCoreValues";
import ValuesGovernanceCorporateGovernance from "./Discover-Us/OurValuesGovernance/ValuesGovernanceCorporateGovernance";
import ValuesGovernanceAwardsQuality from "./Discover-Us/OurValuesGovernance/ValuesGovernanceAwardsQuality";
import ValuesGovernanceEMSSafety from "./Discover-Us/OurValuesGovernance/ValuesGovernanceEMSSafety";
import ValuesGovernanceCommitment from "./Discover-Us/OurValuesGovernance/ValuesGovernanceCommitment";
import PartnershipsHero from "./Discover-Us/Partnerships/PartnershipsHero";
import PartnershipsIntro from "./Discover-Us/Partnerships/PartnershipsIntro";
import IndustryLeaders from "./Discover-Us/Partnerships/IndustryLeaders";
import EcosystemIntegration from "./Discover-Us/Partnerships/EcosystemIntegration";
import EngineeringCollaboration from "./Discover-Us/Partnerships/EngineeringCollaboration";
import GlobalNetwork from "./Discover-Us/Partnerships/GlobalNetwork";
import SupplierPartnerships from "./Discover-Us/Partnerships/SupplierPartnerships";
import IndustryEngagement from "./Discover-Us/Partnerships/IndustryEngagement";
import DivisionsHero from "./DivisionsPages/DivisionsHero";
import DivisionsList from "./DivisionsPages/DivisionsList";
import EventsHero from "./events/EventsHero";
import EventsList from "./events/EventsList";
import PageHeader from "../ui/PageHeader";
import AnimatedCategoryList from "./products/AnimatedCategoryList";
import EditableWrapper from "../cms/EditableWrapper";

interface SectionRendererProps {
  section: {
    id: string;
    type: string;
    content: any;
  };
  onUpdate?: () => void;
  readonly?: boolean;
}

export default function SectionRenderer({
  section,
  onUpdate,
  readonly = false,
}: SectionRendererProps) {
  console.log(section);
  const renderContent = () => {
    switch (section.type) {
      case "hero":
        return <Hero content={section.content} />;
      case "about":
        return <About content={section.content} />;
      case "about-hero":
        return <AboutHero content={section.content} />;
      case "about-content":
        return <AboutContent content={section.content} />;
      case "about-banner-image":
        return <BannerImage content={section.content} />;
      case "overview-section":
        return <OverviewSection content={section.content} />;
      case "vision-and-mission":
        return <OverviewSection content={section.content} />;
      case "about-icon-boxes":
        return <IconBoxes content={section.content} />;
      case "about-capabilities":
        return <AboutCapabilities content={section.content} />;
      case "about-feature-cards":
        return <AboutFeatureCards content={section.content} />;
      case "founders-message":
        return <FoundersMessage content={section.content} />;
      case "about-clients":
        return <AboutClients content={section.content} />;
      case "about-milestones":
        return <AboutMilestones content={section.content} />;
      case "our-presence":
        return <OurPresence content={section.content} />;
      case "divisions-hero":
        return <DivisionsHero />;
      case "divisions-list":
        return <DivisionsList content={section.content} />;
      case "events-hero":
        return <EventsHero content={section.content} />;
      case "events-list":
        // EventsList will fetch its own data if not provided (for CMS use)
        return <EventsList upcoming={[]} ongoing={[]} past={[]} content={section.content} />;
      case "page-header":
        return <PageHeader 
          title={readonly ? "" : (section.content?.title || "Page Title")} 
          breadcrumbs={section.content?.breadcrumbs || []} 
          backgroundImg={section.content?.backgroundImg} 
        />;
      case "product-category-list":
        return <AnimatedCategoryList categories={[]} content={section.content} />;
      case "contact-hero":
        return <ContactHero content={section.content} />;
      case "contact-banner":
        return <ContactBanner content={section.content} />;
      case "contact-form":
        return <ContactForm content={section.content} />;
      case "contact-info":
        return <ContactInfo content={section.content} />;
      case "contact-address":
        return <ContactAddress content={section.content} />;
      case "featured-products":
        return <FeaturedProducts content={section.content} />;
      case "card-grid":
        return <CardGrid content={section.content} />;
      case "video-section":
        return <VideoSection content={section.content} />;
      case "text-image-section":
        return <TextImageSection content={section.content} />;
      case "stats-section":
        return <StatsSection content={section.content} />;
      case "clients-section":
        return <ClientsSection content={section.content} />;
      case "events-achievements":
        return <EventsAchievements content={section.content} />;
      case "dual-cards-section":
        return <TwoCardsSection content={section.content} />;
      case "news-section":
        return <NewsSection content={section.content} />;
      case "product-search":
        return <ProductSearchSection />;
      case "career-section":
        return <CareerHero content={section.content} />;
      case "career-hero":
        return <CareerHero content={section.content} />;
      case "career-intro":
        return <CareerIntro content={section.content} />;
      case "career-form":
        return <CareerForm content={section.content} />;
      case "cs-hero":
        return <ConnectionSystemsHero content={section.content} />;
      case "cs-overview":
        return <ConnectionSystemsOverview content={section.content} />;
      case "cs-capabilities":
        return <ConnectionSystemsCapabilities content={section.content} />;
      case "cs-infrastructure":
        return <ConnectionSystemsInfrastructure content={section.content} />;
      case "cs-products":
        return <ConnectionSystemsProducts content={section.content} />;
      case "cs-achievements":
        return <ConnectionSystemsAchievements content={section.content} />;
      case "cs-why-choose-us":
        return <ConnectionSystemsWhyChooseUs content={section.content} />;
      case "ep-hero":
        return <EngineeringHero content={section.content} />;
      case "ep-about":
        return <EngineeringAbout content={section.content} />;
      case "ep-capabilities":
        return <EngineeringCapabilities content={section.content} />;
      case "ep-infrastructure":
        return <EngineeringInfrastructure content={section.content} />;
      case "ep-quality":
        return <EngineeringQuality content={section.content} />;
      case "ep-products":
        return <EngineeringProducts content={section.content} />;
      case "ep-why-choose-us":
        return <EngineeringWhyChooseUs content={section.content} />;
      case "ep-commitment":
        return <EngineeringCommitment content={section.content} />;
      case "ps-hero":
        return <StampingHero content={section.content} />;
      case "ps-stats":
        return <StampingStats content={section.content} />;
      case "ps-infrastructure":
        return <StampingInfrastructure content={section.content} />;
      case "ps-process":
        return <StampingProcess content={section.content} />;
      case "ps-materials":
        return <StampingMaterials content={section.content} />;
      case "ps-segments":
        return <StampingSegments content={section.content} />;
      case "ps-team":
        return <StampingTeam content={section.content} />;
      case "ps-why-choose-us":
        return <StampingWhyChooseUs content={section.content} />;
      case "cnh-hero":
        return <CNHMouldsHero content={section.content} />;
      case "cnh-capabilities":
        return <CNHMouldsCapabilities content={section.content} />;
      case "cnh-infrastructure":
        return <CNHMouldsInfrastructure content={section.content} />;
      case "cnh-design":
        return <CNHMouldsDesign content={section.content} />;
      case "cnh-materials":
        return <CNHMouldsMaterials content={section.content} />;
      case "cnh-products":
        return <CNHMouldsProducts content={section.content} />;
      case "cnh-team":
        return <CNHMouldsTeam content={section.content} />;
      case "cnh-why-choose-us":
        return <CNHMouldsWhyChooseUs content={section.content} />;
      case "csr-banner":
        return <CSRBanner content={section.content} />;
      case "csr-grid":
        return <CSRGrid content={section.content} />;
      case "csr-initiatives":
        return <CSRInitiatives content={section.content} />;
      case "csr-environmental":
        return <CSREnvironmental content={section.content} />;
      case "csr-healthcare":
        return <CSRHealthcare content={section.content} />;
      case "csr-community":
        return <CSRCommunity content={section.content} />;
      case "cnh-cta":
        return <CNHMouldsCTA content={section.content} />;
      case "core-team-hero":
        return <CoreTeamHero content={section.content} />;
      case "core-team-overview":
        return <CoreTeamOverview content={section.content} />;
      case "core-team-members":
        return <CoreTeamMembers content={section.content} />;
      case "vg-hero":
        return <ValuesGovernanceHero content={section.content} />;
      case "vg-core-values":
        return <ValuesGovernanceCoreValues content={section.content} />;
      case "vg-corporate-governance":
        return <ValuesGovernanceCorporateGovernance content={section.content} />;
      case "vg-awards-quality":
        return <ValuesGovernanceAwardsQuality content={section.content} />;
      case "vg-ems-safety":
        return <ValuesGovernanceEMSSafety content={section.content} />;
      case "vg-commitment":
        return <ValuesGovernanceCommitment content={section.content} />;
      case "partnerships-hero":
        return <PartnershipsHero content={section.content} />;
      case "partnerships-intro":
        return <PartnershipsIntro content={section.content} />;
      case "industry-leaders":
        return <IndustryLeaders content={section.content} />;
      case "ecosystem-integration":
        return <EcosystemIntegration content={section.content} />;
      case "engineering-collaboration":
        return <EngineeringCollaboration content={section.content} />;
      case "global-network":
        return <GlobalNetwork content={section.content} />;
      case "supplier-partnerships":
        return <SupplierPartnerships content={section.content} />;
      case "industry-engagement":
        return <IndustryEngagement content={section.content} />;
      default:
        return null;
    }
  };

  return (
    <EditableWrapper
      sectionId={section.id}
      type={section.type}
      content={section.content}
      onUpdate={onUpdate}
      readonly={readonly}
    >
      {renderContent()}
    </EditableWrapper>
  );
}
