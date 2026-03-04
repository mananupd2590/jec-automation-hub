import { useState } from "react";
import { MessageCircle, CheckCircle } from "lucide-react";
import { z } from "zod";

const WHATSAPP_URL =
  "https://wa.me/919428673969?text=" +
  encodeURIComponent(
    "Hello Jalaram Automation, I want to inquire about industrial sensors/automation products. My requirement is:"
  );

const categories = [
  "Sensors",
  "PLC/HMI",
  "VFD/Drives",
  "SSR/Relays",
  "Timers/Counters",
  "Encoders",
  "Energy Meters",
  "Other",
];

const inquirySchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  companyName: z.string().trim().max(100).optional(),
  phone: z.string().trim().min(1, "Phone / WhatsApp is required").max(20),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
  category: z.string().optional(),
  message: z.string().trim().min(1, "Please describe your requirement").max(2000),
});

type InquiryData = z.infer<typeof inquirySchema>;

const InquirySection = () => {
  const [form, setForm] = useState<InquiryData>({
    fullName: "",
    companyName: "",
    phone: "",
    email: "",
    category: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[e.target.name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = inquirySchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setLoading(true);
    // Simulate submission (backend needed for actual email sending)
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="inquiry" className="section-padding bg-card">
        <div className="container mx-auto max-w-2xl text-center">
          <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">Thank You!</h2>
          <p className="text-muted-foreground mb-6">
            Your inquiry has been received. Our team will get back to you within 24 hours.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-accent text-accent-foreground font-semibold rounded-md hover:opacity-90 transition-opacity"
          >
            <MessageCircle className="w-5 h-5" />
            Continue on WhatsApp for faster response
          </a>
        </div>
      </section>
    );
  }

  const fieldClass =
    "w-full px-4 py-2.5 bg-background border border-input rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm";

  return (
    <section id="inquiry" className="section-padding bg-card">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Get in Touch</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Request a Quote</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Tell us what you need — we'll source it and get back to you with pricing and availability.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="md:col-span-2 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Full Name *</label>
                <input name="fullName" value={form.fullName} onChange={handleChange} className={fieldClass} placeholder="Your full name" />
                {errors.fullName && <p className="text-destructive text-xs mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Company Name</label>
                <input name="companyName" value={form.companyName} onChange={handleChange} className={fieldClass} placeholder="Your company" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Phone / WhatsApp *</label>
                <input name="phone" value={form.phone} onChange={handleChange} className={fieldClass} placeholder="+91 XXXXX XXXXX" />
                {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className={fieldClass} placeholder="you@company.com" />
                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Requirement Category</label>
              <select name="category" value={form.category} onChange={handleChange} className={fieldClass}>
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Message / Part Number / Specs *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className={fieldClass}
                placeholder="Describe your requirement, mention part numbers, quantities, or attach specs..."
              />
              {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Inquiry"}
            </button>
          </form>

          {/* Side info */}
          <div className="space-y-6">
            <div className="bg-section-alt border border-border rounded-lg p-5">
              <h3 className="font-display font-semibold text-foreground mb-2">Prefer WhatsApp?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Get a faster response by messaging us directly on WhatsApp.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground font-semibold rounded-md text-sm hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
            <div className="bg-section-alt border border-border rounded-lg p-5">
              <h3 className="font-display font-semibold text-foreground mb-2">Why Choose Us?</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>✓ Contract supply & one-time projects</li>
                <li>✓ Exact model / part number sourcing</li>
                <li>✓ After-sales support</li>
                <li>✓ 50+ international brands</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquirySection;
