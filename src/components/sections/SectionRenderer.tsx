"use client";
import { useRouter } from "next/navigation";

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
import ConnectionSystemsImageCarousel from "./DivisionsPages/ConnectionSystems/ConnectionSystemsImageCarousel";
import ConnectionSystemsInfrastructure from "./DivisionsPages/ConnectionSystems/ConnectionSystemsInfrastructure";
import ConnectionSystemsProducts from "./DivisionsPages/ConnectionSystems/ConnectionSystemsProducts";
import ConnectionSystemsAchievements from "./DivisionsPages/ConnectionSystems/ConnectionSystemsAchievements";
import ConnectionSystemsWhyChooseUs from "./DivisionsPages/ConnectionSystems/ConnectionSystemsWhyChooseUs";
import LSRMouldingDetail from "./DivisionsPages/ConnectionSystems/LSRMouldingDetail";
import EngineeringHero from "./DivisionsPages/EngineeringProducts/EngineeringHero";
import EngineeringAbout from "./DivisionsPages/EngineeringProducts/EngineeringAbout";
import EngineeringCapabilities from "./DivisionsPages/EngineeringProducts/EngineeringCapabilities";
import EngineeringInfrastructure from "./DivisionsPages/EngineeringProducts/EngineeringInfrastructure";
import EngineeringQuality from "./DivisionsPages/EngineeringProducts/EngineeringQuality";
import EngineeringProducts from "./DivisionsPages/EngineeringProducts/EngineeringProducts";
import EngineeringWhyChooseUs from "./DivisionsPages/EngineeringProducts/EngineeringWhyChooseUs";
import EngineeringCommitment from "./DivisionsPages/EngineeringProducts/EngineeringCommitment";
import EngineeringImageCarousel from "./DivisionsPages/EngineeringProducts/EngineeringImageCarousel";
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
import GreenEnergyDetail from "./GreenEnergyDetail";
import CNHMouldsDesign from "./DivisionsPages/CNHMoulds/CNHMouldsDesign";
import CNHMouldsMaterials from "./DivisionsPages/CNHMoulds/CNHMouldsMaterials";
import CNHMouldsProducts from "./DivisionsPages/CNHMoulds/CNHMouldsProducts";
import CNHMouldsTeam from "./DivisionsPages/CNHMoulds/CNHMouldsTeam";
import CNHMouldsWhyChooseUs from "./DivisionsPages/CNHMoulds/CNHMouldsWhyChooseUs";
import CNHMouldsIntro from "./DivisionsPages/CNHMoulds/CNHMouldsIntro";
import CNHMouldsExcellence from "./DivisionsPages/CNHMoulds/CNHMouldsExcellence";
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
import LinkedInFeed from "./events/LinkedInFeed";
import EditableWrapper from "../cms/EditableWrapper";
import CertificationHero from "./CertificationAwards/CertificationHero";
import CertificationList from "./CertificationAwards/CertificationList";
import AwardsList from "./CertificationAwards/AwardsList";
import CertificationContent from "./CertificationAwards/CertificationContent";
import TestingHero from "./CapabilityPages/TestingLab/TestingHero";
import TestingCapabilities from "./CapabilityPages/TestingLab/TestingCapabilities";
import TestingAccreditation from "./CapabilityPages/TestingLab/TestingAccreditation";
import TestingProcessFlow from "./CapabilityPages/TestingLab/TestingProcessFlow";
import TestingCommitment from "./CapabilityPages/TestingLab/TestingCommitment";
import AutomationHero from "./CapabilityPages/AutomationTechnology/AutomationHero";
import AutomationOverview from "./CapabilityPages/AutomationTechnology/AutomationOverview";
import AutomationCapabilities from "./CapabilityPages/AutomationTechnology/AutomationCapabilities";
import AutomationPlatingLines from "./CapabilityPages/AutomationTechnology/AutomationPlatingLines";
import LSRHero from "./CapabilityPages/LSRMoulding/LSRHero";
import LSROverview from "./CapabilityPages/LSRMoulding/LSROverview";
import LSRCapabilities from "./CapabilityPages/LSRMoulding/LSRCapabilities";
import LSRCommitment from "./CapabilityPages/LSRMoulding/LSRCommitment";
import LSRVideo from "./CapabilityPages/LSRMoulding/LSRVideo";
import GreenEnergyHero from "./CapabilityPages/GreenEnergy/GreenEnergyHero";
import GreenEnergyOverview from "./CapabilityPages/GreenEnergy/GreenEnergyOverview";
import GreenEnergyMetrics from "./CapabilityPages/GreenEnergy/GreenEnergyMetrics";
import GreenEnergyCommitment from "./CapabilityPages/GreenEnergy/GreenEnergyCommitment";
import SustainableHero from "./CapabilityPages/GreenEnergy/SustainableHero";
import SolarEnergySection from "./CapabilityPages/GreenEnergy/SolarEnergySection";
import TreePlantationSection from "./CapabilityPages/GreenEnergy/TreePlantationSection";
import GreenInitiativesSection from "./CapabilityPages/GreenEnergy/GreenInitiativesSection";
import SMCommitmentSection from "./CapabilityPages/GreenEnergy/SMCommitmentSection";
import CleanEnergySection from "./CapabilityPages/GreenEnergy/CleanEnergySection";
import GreenCultureSection from "./CapabilityPages/GreenEnergy/GreenCultureSection";
import MeasurableImpactSection from "./CapabilityPages/GreenEnergy/MeasurableImpactSection";
import SMCtaSection from "./CapabilityPages/GreenEnergy/SMCtaSection";
import SMResponsibleSection from "./CapabilityPages/GreenEnergy/SMResponsibleSection";
import MachineryHero from "./CapabilityPages/machinery/MachineryHero";
import PlantCapacity from "./CapabilityPages/machinery/PlantCapacity";
import ElectricInjection from "./CapabilityPages/machinery/ElectricInjection";
import StampingDivision from "./CapabilityPages/machinery/StampingDivision";
import HighSpeedStamping from "./CapabilityPages/machinery/HighSpeedStamping";
import PrecisionStamping from "./CapabilityPages/machinery/PrecisionStamping";
import InjectionMoulding from "./CapabilityPages/machinery/InjectionMoulding";
import CleanlinessStandards from "./CapabilityPages/machinery/CleanlinessStandards";
import FacilityExpansion from "./CapabilityPages/machinery/FacilityExpansion";
import TestingCertification from "./CapabilityPages/TestingLab/TestingCertification";
import TestingTypesDetail from "./CapabilityPages/TestingLab/TestingTypesDetail";
import TermsServicesComponent from "./TermsServices/TermsServicesComponent";
import PrivacyPolicyComponent from "./PrivacyPolicy/PrivacyPolicyComponent";

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
  const router = useRouter();

  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate();
    } else {
      // Force a full page reload to ensure the latest data is fetched from the server
      window.location.reload();
    }
  };

  console.log(`[SectionRenderer] Rendering section type: ${section.type} (ID: ${section.id})`);
  console.log(section);
  
  // Robust parsing of section content
  let content = section.content;
  if (typeof content === "string" && content.trim() !== "") {
    try {
      content = JSON.parse(content);
    } catch (e) {
      console.error(`[SectionRenderer] Failed to parse content for section ${section.id}:`, e);
      // Fallback to empty object if parsing fails to avoid component crashes
      content = {};
    }
  }

  console.log(`[SectionRenderer] Final content for ${section.type} (${section.id}):`, content);

  const renderContent = () => {
    switch (section.type) {
      case "hero":
        return <Hero content={content} />;
      case "about":
        return <About content={content} />;
      case "about-hero":
        return <AboutHero content={content} />;
      case "about-content":
        return <AboutContent content={content} />;
      case "about-banner-image":
        return <BannerImage content={content} />;
      case "overview-section":
        return <OverviewSection content={content} />;
      case "vision-and-mission":
        return <OverviewSection content={content} />;
      case "about-icon-boxes":
        return <IconBoxes content={content} />;
      case "about-capabilities":
        return <AboutCapabilities content={content} />;
      case "about-feature-cards":
        return <AboutFeatureCards content={content} />;
      case "founders-message":
        return <FoundersMessage content={content} />;
      case "about-clients":
        return <AboutClients content={content} />;
      case "about-milestones":
        return <AboutMilestones content={content} />;
      case "our-presence":
        return <OurPresence content={content} />;
      case "divisions-hero":
        return <DivisionsHero />;
      case "divisions-list":
        return <DivisionsList content={content} />;
      case "events-hero":
        return <EventsHero content={content} />;
      case "events-list":
        // EventsList will fetch its own data if not provided (for CMS use)
        return (
          <EventsList
            upcoming={[]}
            ongoing={[]}
            past={[]}
            content={content}
          />
        );
      case "linkedin-feed":
        return <LinkedInFeed />;
      case "page-header":
        return (
          <PageHeader
            title={readonly ? "" : content?.title || "Page Title"}
            breadcrumbs={content?.breadcrumbs || []}
            backgroundImg={content?.backgroundImg}
          />
        );
      case "product-category-list":
        return (
          <AnimatedCategoryList categories={[]} content={content} />
        );
      case "contact-hero":
        return <ContactHero content={content} />;
      case "contact-banner":
        return <ContactBanner content={content} />;
      case "contact-form":
        return <ContactForm content={content} />;
      case "contact-info":
        return <ContactInfo content={content} />;
      case "contact-address":
        return <ContactAddress content={content} />;
      case "featured-products":
        return <FeaturedProducts content={content} />;
      case "card-grid":
        return <CardGrid content={content} />;
      case "video-section":
        return <VideoSection content={content} />;
      case "text-image-section":
        return <TextImageSection content={content} />;
      case "stats-section":
        return <StatsSection content={content} />;
      case "clients-section":
        return <ClientsSection content={content} />;
      case "events-achievements":
        return <EventsAchievements content={content} />;
      case "dual-cards-section":
        return <TwoCardsSection content={content} />;
      case "news-section":
        return <NewsSection content={content} />;
      case "product-search":
        return <ProductSearchSection />;
      case "career-section":
        return <CareerHero content={content} />;
      case "career-hero":
        return <CareerHero content={content} />;
      case "career-intro":
        return <CareerIntro content={content} />;
      case "career-form":
        return <CareerForm content={content} />;
      case "cs-hero":
        return <ConnectionSystemsHero content={content} />;
      case "cs-overview":
        return <ConnectionSystemsOverview content={content} />;
      case "cs-capabilities":
        return <ConnectionSystemsCapabilities content={content} />;
      case "cs-image-carousel":
        return <ConnectionSystemsImageCarousel content={content} />;
      case "cs-infrastructure":
        return <ConnectionSystemsInfrastructure content={content} />;
      case "cs-products":
        return <ConnectionSystemsProducts content={content} />;
      case "cs-achievements":
        return <ConnectionSystemsAchievements content={content} />;
      case "cs-why-choose-us":
        return <ConnectionSystemsWhyChooseUs content={content} />;
      case "lsr-moulding-detail":
        return <LSRMouldingDetail content={content} />;
      case "green-energy-detail":
        return <GreenEnergyDetail content={content} />;
      case "ep-hero":
        return <EngineeringHero content={content} />;
      case "ep-about":
        return <EngineeringAbout content={content} />;
      case "ep-capabilities":
        return <EngineeringCapabilities content={content} />;
      case "ep-infrastructure":
        return <EngineeringInfrastructure content={content} />;
      case "ep-quality":
        return <EngineeringQuality content={content} />;
      case "ep-products":
        return <EngineeringProducts content={content} />;
      case "ep-why-choose-us":
        return <EngineeringWhyChooseUs content={content} />;
      case "ep-commitment":
        return <EngineeringCommitment content={content} />;
      case "ep-image-carousel":
        return <EngineeringImageCarousel content={content} />;
      case "ps-hero":
        return <StampingHero content={content} />;
      case "ps-stats":
        return <StampingStats content={content} />;
      case "ps-infrastructure":
        return <StampingInfrastructure content={content} />;
      case "ps-process":
        return <StampingProcess content={content} />;
      case "ps-materials":
        return <StampingMaterials content={content} />;
      case "ps-segments":
        return <StampingSegments content={content} />;
      case "ps-team":
        return <StampingTeam content={content} />;
      case "ps-why-choose-us":
        return <StampingWhyChooseUs content={content} />;
      case "cnh-hero":
        return <CNHMouldsHero content={content} />;
      case "cnh-capabilities":
        return <CNHMouldsCapabilities content={content} />;
      case "cnh-infrastructure":
        return <CNHMouldsInfrastructure content={content} />;
      case "cnh-design":
        return <CNHMouldsDesign content={content} />;
      case "cnh-materials":
        return <CNHMouldsMaterials content={content} />;
      case "cnh-products":
        return <CNHMouldsProducts content={content} />;
      case "cnh-team":
        return <CNHMouldsTeam content={content} />;
      case "cnh-why-choose-us":
        return <CNHMouldsWhyChooseUs content={content} />;
      case "cnh-intro":
        return <CNHMouldsIntro content={content} />;
      case "cnh-excellence":
        return <CNHMouldsExcellence content={content} />;
      case "csr-banner":
        return <CSRBanner content={content} />;
      case "csr-grid":
        return <CSRGrid content={content} />;
      case "csr-initiatives":
        return <CSRInitiatives content={content} />;
      case "csr-environmental":
        return <CSREnvironmental content={content} />;
      case "csr-healthcare":
        return <CSRHealthcare content={content} />;
      case "csr-community":
        return <CSRCommunity content={content} />;
      case "cnh-cta":
        return <CNHMouldsCTA content={content} />;
      case "core-team-hero":
        return <CoreTeamHero content={content} />;
      case "core-team-overview":
        return <CoreTeamOverview content={content} />;
      case "core-team-members":
        return <CoreTeamMembers content={content} />;
      case "vg-hero":
        return <ValuesGovernanceHero content={content} />;
      case "vg-core-values":
        return <ValuesGovernanceCoreValues content={content} />;
      case "vg-corporate-governance":
        return (
          <ValuesGovernanceCorporateGovernance content={content} />
        );
      case "vg-awards-quality":
        return <ValuesGovernanceAwardsQuality content={content} />;
      case "vg-ems-safety":
        return <ValuesGovernanceEMSSafety content={content} />;
      case "vg-commitment":
        return <ValuesGovernanceCommitment content={content} />;
      case "partnerships-hero":
        return <PartnershipsHero content={content} />;
      case "partnerships-intro":
        return <PartnershipsIntro content={content} />;
      case "industry-leaders":
        return <IndustryLeaders content={content} />;
      case "ecosystem-integration":
        return <EcosystemIntegration content={content} />;
      case "engineering-collaboration":
        return <EngineeringCollaboration content={content} />;
      case "global-network":
        return <GlobalNetwork content={content} />;
      case "supplier-partnerships":
        return <SupplierPartnerships content={content} />;
      case "industry-engagement":
        return <IndustryEngagement content={content} />;
      case "cert-hero":
        return <CertificationHero content={content} />;
      case "cert-list":
        return <CertificationList content={content} />;
      case "awards-list":
        return <AwardsList content={content} />;
      case "cert-content":
        return <CertificationContent content={content} />;
      case "testing-hero":
        return <TestingHero content={content} />;
      case "testing-capabilities":
        return <TestingCapabilities content={content} />;
      case "testing-accreditation":
        return <TestingAccreditation content={content} />;
      case "testing-process-flow":
        return <TestingProcessFlow content={content} />;
      case "testing-commitment":
        return <TestingCommitment content={content} />;
      case "automation-hero":
        return <AutomationHero content={content} />;
      case "automation-overview":
        return <AutomationOverview content={content} />;
      case "automation-capabilities":
        return <AutomationCapabilities content={content} />;
      case "automation-plating":
        return <AutomationPlatingLines content={content} />;
      case "lsr-hero":
        return <LSRHero content={content} />;
      case "lsr-overview":
        return <LSROverview content={content} />;
      case "lsr-capabilities":
        return <LSRCapabilities content={content} />;
      case "lsr-commitment":
        return <LSRCommitment content={content} />;
      case "lsr-video":
        return <LSRVideo content={content} />;
      case "green-energy-hero":
        return <GreenEnergyHero content={content} />;
      case "green-energy-overview":
        return <GreenEnergyOverview content={content} />;
      case "green-energy-metrics":
        return <GreenEnergyMetrics content={content} />;
      case "green-energy-commitment":
        return <GreenEnergyCommitment content={content} />;
      case "sustainable-hero":
        return <SustainableHero content={content} />;
      case "solar-energy-section":
        return <SolarEnergySection content={content} />;
      case "tree-plantation-section":
        return <TreePlantationSection content={content} />;
      case "green-initiatives-section":
        return <GreenInitiativesSection content={content} />;
      case "sm-commitment-section":
        return <SMCommitmentSection content={content} />;
      case "clean-energy-section":
        return <CleanEnergySection content={content} />;
      case "green-culture-section":
        return <GreenCultureSection content={content} />;
      case "measurable-impact-section":
        return <MeasurableImpactSection content={content} />;
      case "sm-cta-section":
        return <SMCtaSection content={section.content} sectionId={section.id} onUpdate={onUpdate} readonly={readonly} />;
      case "sm-responsible-section":
        return <SMResponsibleSection content={section.content} />;
      case "machinery-hero":
        return <MachineryHero content={content} />;
      case "machinery-capacity":
        return <PlantCapacity content={content} />;
      case "machinery-electric-injection":
        return <ElectricInjection content={content} />;
      case "machinery-stamping-division":
        return <StampingDivision content={content} />;
      case "machinery-high-speed-stamping":
        return <HighSpeedStamping content={content} />;
      case "machinery-precision-stamping":
        return <PrecisionStamping content={content} />;
      case "machinery-injection-moulding":
        return <InjectionMoulding content={content} />;
      case "machinery-cleanliness-standards":
        return <CleanlinessStandards content={content} />;
      case "machinery-facility-expansion":
        return <FacilityExpansion content={content} />;
      case "testing-certification":
        return <TestingCertification content={content} />;
      case "testing-types-detail":
        return <TestingTypesDetail />;
      case "terms-services":
        return <TermsServicesComponent content={content} />;
      case "privacy-policy":
        return <PrivacyPolicyComponent content={content} />;
      default:
        return null;
    }
  };

  return (
    <EditableWrapper
      sectionId={section.id}
      type={section.type}
      content={content}
      onUpdate={handleUpdate}
      readonly={readonly}
    >
      {renderContent()}
    </EditableWrapper>
  );
}
