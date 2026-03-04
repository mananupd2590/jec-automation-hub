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

const BrandsSection = () => (
  <section id="brands" className="section-padding bg-card">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Our Partners</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Brands We Source &amp; Deal In</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {brands.map((brand) => (
          <div
            key={brand}
            className="flex items-center justify-center h-20 bg-section-alt border border-border rounded-lg px-4 hover:shadow-md hover:border-primary/30 transition-all"
          >
            <span className="font-display font-semibold text-sm text-foreground/70 text-center">{brand}</span>
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-muted-foreground mt-8">
        Don't see your brand? We source from 50+ international manufacturers — just ask.
      </p>
    </div>
  </section>
);

export default BrandsSection;
