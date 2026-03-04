import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Brands", href: "#brands" },
  { label: "Industries", href: "#industries" },
  { label: "Inquiry", href: "#inquiry" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground font-display font-bold text-xl px-3 py-1.5 rounded">
            JEC
          </div>
          <div className="hidden sm:block">
            <div className="font-display font-semibold text-foreground leading-tight">Jalaram Automation</div>
            <div className="text-xs text-muted-foreground leading-tight">Industrial Sensors & Solutions</div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-md hover:bg-secondary"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#inquiry"
            className="ml-2 px-4 py-2 text-sm font-semibold bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            Get a Quote
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-card px-4 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm font-medium text-foreground/80 hover:text-primary border-b border-border/50"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#inquiry"
            onClick={() => setMobileOpen(false)}
            className="block mt-3 text-center px-4 py-2.5 text-sm font-semibold bg-accent text-accent-foreground rounded-md"
          >
            Get a Quote
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
