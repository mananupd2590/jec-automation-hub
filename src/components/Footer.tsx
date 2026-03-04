const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Brands", href: "#brands" },
  { label: "Industries", href: "#industries" },
  { label: "Inquiry", href: "#inquiry" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => (
  <footer className="bg-foreground text-background/80">
    <div className="container mx-auto px-4 py-12">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-accent text-accent-foreground font-display font-bold text-lg px-2.5 py-1 rounded">
              JEC
            </div>
            <span className="font-display font-semibold text-background text-lg">Jalaram Automation</span>
          </div>
          <p className="text-sm text-background/60 leading-relaxed max-w-md">
            A Proprietorship Firm — Jalaram Engineering Corporation (JEC). Your trusted partner for industrial sensors, automation solutions, and custom sourcing in Vapi, Gujarat.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-semibold text-background mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-background/60 hover:text-accent transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-semibold text-background mb-4">Contact</h4>
          <div className="text-sm text-background/60 space-y-2">
            <p>Ratna Mall, Near Morarji Circle,<br />Vapi, Gujarat 396195</p>
            <p>
              <a href="tel:+919428673969" className="hover:text-accent transition-colors">+91 94286 73969</a>
            </p>
            <p>
              <a href="mailto:jalaramengcorp@gmail.com" className="hover:text-accent transition-colors">jalaramengcorp@gmail.com</a>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10 mt-10 pt-6 text-center text-xs text-background/40">
        © {new Date().getFullYear()} Jalaram Engineering Corporation. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
