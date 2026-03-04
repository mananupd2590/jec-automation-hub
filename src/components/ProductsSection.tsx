import {
  Radio, Cpu, Monitor, Zap, ToggleLeft, Timer, Gauge, RotateCcw,
  Power, Wrench, Search
} from "lucide-react";

const products = [
  { icon: Radio, name: "Industrial Sensors", desc: "Inductive, Capacitive, Photoelectric, Level, Magnetic, Pressure" },
  { icon: Cpu, name: "PLC / Control Systems", desc: "Programmable Logic Controllers" },
  { icon: Monitor, name: "HMI Panels", desc: "Human Machine Interface displays" },
  { icon: Zap, name: "VFD / Drives", desc: "Variable Frequency Drives" },
  { icon: ToggleLeft, name: "SSR & Relays", desc: "Solid State Relays & switching" },
  { icon: Timer, name: "Timers & Counters", desc: "Digital timers, counters, tachometers" },
  { icon: Gauge, name: "Energy Meters", desc: "Power & energy monitoring" },
  { icon: RotateCcw, name: "Encoders", desc: "Rotary & linear encoders" },
  { icon: Power, name: "Industrial Switches", desc: "Limit, toggle & safety switches" },
  { icon: Wrench, name: "Automation Accessories", desc: "Connectors, cables, brackets" },
  { icon: Search, name: "Custom Sourcing", desc: "Exact models & part numbers on demand" },
];

const ProductsSection = () => (
  <section id="products" className="section-padding bg-section-alt">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">What We Supply</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Product Categories</h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          We are not limited to predefined inventory — we source specific models and brands as per your requirement.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <div
            key={p.name}
            className="bg-card border border-border rounded-lg p-5 hover:shadow-lg hover:border-primary/30 transition-all group"
          >
            <p.icon className="w-8 h-8 text-primary mb-3 group-hover:text-accent transition-colors" />
            <h3 className="font-display font-semibold text-sm text-foreground mb-1">{p.name}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductsSection;
