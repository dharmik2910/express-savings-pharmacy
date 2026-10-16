import ContactForm from "@/components/contact-form";
import FeaturesSection from "@/components/features-section";
import HeroSection from "@/components/hero-section";
import MedicationAvailabilitySearch from "@/components/MedicationAvailabilitySearch";
import ServiceRegionsSection from "@/components/ServiceRegionsSection";
import ServicesSection from "@/components/services-page";
import TransferPrescriptionBanner from "@/components/TransferPrescriptionBanner";

// Section rhythm: dark → white → muted → white → brand → muted → white
export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <MedicationAvailabilitySearch />
      <FeaturesSection />
      <TransferPrescriptionBanner />
      <ServiceRegionsSection />
      <ContactForm />
    </>
  );
}
