import {
  Factory, UtensilsCrossed, Package, Flame, Pill, FlaskConical,
  CircuitBoard, ArrowRightLeft, Settings
} from "lucide-react";

const industries = [
  { icon: Factory, name: "Machine Manufacturers" },
  { icon: UtensilsCrossed, name: "Food & Beverage" },
  { icon: Package, name: "Packaging" },
  { icon: Flame, name: "Plastics" },
  { icon: Pill, name: "Pharmaceuticals" },
  { icon: FlaskConical, name: "Chemicals" },
  { icon: CircuitBoard, name: "Control Panel Builders" },
  { icon: ArrowRightLeft, name: "Conveyor Manufacturers" },
  { icon: Settings, name: "General Manufacturing" },
];

const IndustriesSection = () => (
  <section id="industries" className="section-padding bg-section-alt">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Who We Serve</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Industries We Serve</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {industries.map((ind) => (
          <div
            key={ind.name}
            className="flex items-center gap-3 bg-card border border-border rounded-lg p-4 hover:shadow-md hover:border-primary/30 transition-all"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <ind.icon className="w-5 h-5 text-primary" />
            </div>
            <span className="font-medium text-sm text-foreground">{ind.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default IndustriesSection;
