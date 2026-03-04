import { Phone, Mail } from "lucide-react";

const TopBar = () => (
  <div className="bg-topbar text-topbar-foreground text-sm py-2 px-4">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center gap-4">
        <a href="tel:+919428673969" className="flex items-center gap-1 hover:text-accent transition-colors">
          <Phone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">+91 94286 73969</span>
        </a>
        <a href="tel:+917984996649" className="flex items-center gap-1 hover:text-accent transition-colors">
          <Phone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">+91 79849 96649</span>
        </a>
      </div>
      <a href="mailto:jalaramengcorp@gmail.com" className="flex items-center gap-1 hover:text-accent transition-colors">
        <Mail className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">jalaramengcorp@gmail.com</span>
      </a>
    </div>
  </div>
);

export default TopBar;
