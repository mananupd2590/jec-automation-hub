import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/919428673969?text=" +
  encodeURIComponent(
    "Hello Jalaram Automation, I want to inquire about industrial sensors/automation products. My requirement is:"
  );

const HeroSection = () => (
  <section
    id="home"
    className="relative overflow-hidden"
    style={{
      background:
        "linear-gradient(135deg, hsl(215 80% 35%) 0%, hsl(215 60% 25%) 100%)",
    }}
  >
    {/* Subtle pattern overlay */}
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

    <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
      <div className="max-w-3xl">
        <div className="inline-block bg-accent/20 text-accent-foreground border border-accent/30 text-sm font-medium px-3 py-1 rounded-full mb-6">
          Trusted Industrial Automation Partner in Vapi
        </div>
        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
          Industrial Sensors &<br />
          <span className="text-accent">Automation Solutions</span>
          <br />in Vapi
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mb-8 leading-relaxed">
          Importer, Distributor &amp; Stockist. Reliable supply for contracts and one-time project requirements — including exact model sourcing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#inquiry"
            className="inline-flex items-center justify-center px-6 py-3.5 bg-accent text-accent-foreground font-semibold rounded-md hover:opacity-90 transition-opacity text-base"
          >
            Request a Quote
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-foreground/10 border border-primary-foreground/30 text-primary-foreground font-semibold rounded-md hover:bg-primary-foreground/20 transition-colors text-base"
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
