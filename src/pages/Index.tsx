import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import BrandsSection from "@/components/BrandsSection";
import IndustriesSection from "@/components/IndustriesSection";
import InquirySection from "@/components/InquirySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <TopBar />
    <Header />
    <HeroSection />
    <ProductsSection />
    <BrandsSection />
    <IndustriesSection />
    <InquirySection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
