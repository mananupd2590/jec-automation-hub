import { useState } from "react";
import QuoteModal from "./QuoteModal";

const brands = [
  "Carlo Gavazzi",
  "Takex",
  "Lanbao",
  "Datalogic",
  "Omron",
  "Panasonic",
  "Gefran",
  "Autonics",
  "Mitsubishi",
  "Lika",
  "Rechner Sensors",
];

const BrandsSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();
  const [isCustom, setIsCustom] = useState(false);

  const handleBrandClick = (brand: string) => {
    setSelectedBrand(brand);
    setIsCustom(false);
    setModalOpen(true);
  };

  return (
    <>
      <section id="brands" className="section-padding bg-card">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Our Partners</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Brands We Source &amp; Deal In</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => handleBrandClick(brand)}
                className="flex items-center justify-center h-20 bg-section-alt border border-border rounded-lg px-4 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer"
              >
                <span className="font-display font-semibold text-sm text-foreground/70 text-center">{brand}</span>
              </button>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground mb-3">
              Don't see your brand? We source from 50+ international manufacturers.
            </p>
            <button
              onClick={() => {
                setSelectedBrand(undefined);
                setIsCustom(true);
                setModalOpen(true);
              }}
              className="inline-flex items-center px-5 py-2.5 border border-accent text-accent font-semibold rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Request Any Brand
            </button>
          </div>
        </div>
      </section>

      <QuoteModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialBrand={isCustom ? undefined : selectedBrand}
        customSourcing={isCustom}
      />
    </>
  );
};

export default BrandsSection;
