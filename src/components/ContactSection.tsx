import { MapPin, Phone, Mail } from "lucide-react";

const ContactSection = () => (
  <section id="contact" className="section-padding bg-section-alt">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Reach Us</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Contact Us</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mt-0.5">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground mb-1">Address</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ratna Mall, Near Morarji Circle,<br />
                Vapi, Gujarat, India 396195
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mt-0.5">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground mb-1">Phone</h3>
              <p className="text-sm text-muted-foreground">
                <a href="tel:+919428673969" className="hover:text-primary transition-colors">+91 94286 73969</a><br />
                <a href="tel:+917984996649" className="hover:text-primary transition-colors">+91 79849 96649</a>
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mt-0.5">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground mb-1">Email</h3>
              <a href="mailto:jalaramengcorp@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                jalaramengcorp@gmail.com
              </a>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <a
              href="tel:+919428673969"
              className="px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-md text-sm hover:opacity-90 transition-opacity"
            >
              Call Now
            </a>
            <a
              href="mailto:jalaramengcorp@gmail.com"
              className="px-5 py-2.5 bg-secondary text-secondary-foreground font-semibold rounded-md text-sm hover:bg-secondary/80 transition-colors border border-border"
            >
              Send Email
            </a>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="rounded-lg overflow-hidden border border-border shadow-sm h-72 md:h-auto min-h-[280px]">
          <iframe
            title="Jalaram Automation Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735.3!2d72.9!3d20.37!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDIyJzEyLjAiTiA3MsKwNTQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
