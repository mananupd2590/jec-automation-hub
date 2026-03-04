import { useState } from "react";
import { MessageCircle, Mail, ArrowLeft, ArrowRight, CheckCircle, X } from "lucide-react";
import { z } from "zod";
import {
  brands,
  productCategories,
  buildWhatsAppUrl,
  buildMailtoUrl,
  type ProductCategory,
} from "@/lib/catalog-data";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  phone: z.string().trim().min(1, "Phone is required").max(20),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Please describe your requirement").max(2000),
  quantity: z.string().trim().max(50).optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
  /** Pre-select a category */
  initialCategory?: string;
  /** Pre-select a brand */
  initialBrand?: string;
  /** Skip to custom sourcing form directly */
  customSourcing?: boolean;
}

const QuoteModal = ({
  open,
  onClose,
  initialCategory,
  initialBrand,
  customSourcing,
}: QuoteModalProps) => {
  const isCustom = customSourcing || initialCategory === "Custom Sourcing";

  // Determine starting step
  const getInitialStep = () => {
    if (isCustom) return 3;
    if (initialCategory && initialBrand) return 2;
    if (initialCategory) return 1;
    if (initialBrand) return 1;
    return 0;
  };

  const [step, setStep] = useState(getInitialStep);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(
    initialCategory
      ? productCategories.find((c) => c.name === initialCategory) || null
      : null
  );
  const [selectedBrand, setSelectedBrand] = useState(initialBrand || "");
  const [selectedType, setSelectedType] = useState("");
  const [form, setForm] = useState<FormData>({
    name: "",
    company: "",
    phone: "",
    email: "",
    message: "",
    quantity: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[e.target.name];
        return next;
      });
    }
  };

  const handleSubmit = () => {
    const result = formSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const mailtoUrl = buildMailtoUrl({
      name: form.name,
      company: form.company || undefined,
      phone: form.phone,
      email: form.email || undefined,
      category: selectedCategory?.name,
      brand: selectedBrand || undefined,
      productType: selectedType || undefined,
      message: form.message,
      quantity: form.quantity || undefined,
    });

    window.open(mailtoUrl, "_blank");
    setSubmitted(true);
  };

  const whatsappUrl = buildWhatsAppUrl(
    selectedCategory?.name,
    selectedBrand,
    selectedType
  );

  const fieldClass =
    "w-full px-4 py-2.5 bg-background border border-input rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm";

  const stepLabels = isCustom
    ? ["Inquiry"]
    : ["Category", "Brand", "Product", "Inquiry"];

  const currentStepLabel = stepLabels[isCustom ? 0 : step];

  // ---- Render helpers ----

  const renderStepIndicator = () => {
    if (isCustom) return null;
    return (
      <div className="flex items-center gap-2 mb-6">
        {stepLabels.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                i <= step
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i + 1}
            </div>
            <span className={`text-xs hidden sm:inline ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
              {label}
            </span>
            {i < stepLabels.length - 1 && (
              <div className={`w-6 h-0.5 ${i < step ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderStep0 = () => (
    <div>
      <h3 className="font-display text-lg font-semibold text-foreground mb-4">
        {initialBrand ? `Select a Product Category for ${initialBrand}` : "Select Product Category"}
      </h3>
      <div className="grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {productCategories
          .filter((c) => c.key !== "custom")
          .map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setSelectedCategory(cat);
                setStep(1);
              }}
              className="text-left p-3 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all text-sm font-medium text-foreground"
            >
              {cat.name}
            </button>
          ))}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div>
      <h3 className="font-display text-lg font-semibold text-foreground mb-4">
        Select Brand {selectedCategory ? `for ${selectedCategory.name}` : ""}
      </h3>
      <div className="grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => {
              setSelectedBrand(brand);
              if (selectedCategory && selectedCategory.subtypes.length > 0) {
                setStep(2);
              } else {
                setStep(3);
              }
            }}
            className={`text-left p-3 border rounded-lg transition-all text-sm font-medium ${
              selectedBrand === brand
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-foreground hover:border-primary/50 hover:bg-primary/5"
            }`}
          >
            {brand}
          </button>
        ))}
        <button
          onClick={() => {
            setSelectedBrand("Other / Any");
            if (selectedCategory && selectedCategory.subtypes.length > 0) {
              setStep(2);
            } else {
              setStep(3);
            }
          }}
          className="text-left p-3 border border-dashed border-accent rounded-lg hover:bg-accent/5 transition-all text-sm font-medium text-accent"
        >
          Other / Not Listed
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h3 className="font-display text-lg font-semibold text-foreground mb-2">
        Select Product Type
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        {selectedBrand && selectedCategory
          ? `${selectedBrand} › ${selectedCategory.name}`
          : ""}
      </p>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {selectedCategory?.subtypes.map((type) => (
          <button
            key={type}
            onClick={() => {
              setSelectedType(type);
              setStep(3);
            }}
            className="text-left p-3 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all text-sm font-medium text-foreground"
          >
            {type}
          </button>
        ))}
        <button
          onClick={() => {
            setSelectedType("Other");
            setStep(3);
          }}
          className="text-left p-3 border border-dashed border-accent rounded-lg hover:bg-accent/5 transition-all text-sm font-medium text-accent"
        >
          Other / Custom
        </button>
      </div>
      <p className="text-xs text-muted-foreground italic">
        We can source exact models even if not listed. Share your part number/specs.
      </p>
    </div>
  );

  const renderStep3 = () => {
    if (submitted) {
      return (
        <div className="text-center py-8">
          <CheckCircle className="w-14 h-14 text-accent mx-auto mb-4" />
          <h3 className="font-display text-xl font-bold text-foreground mb-2">Thank You!</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Your inquiry has been prepared. Complete the email to send it, or chat on WhatsApp for a faster response.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground font-semibold rounded-md text-sm hover:opacity-90 transition-opacity"
          >
            <MessageCircle className="w-4 h-4" />
            Continue on WhatsApp
          </a>
        </div>
      );
    }

    return (
      <div>
        <h3 className="font-display text-lg font-semibold text-foreground mb-1">
          {isCustom ? "Custom Sourcing Request" : "Complete Your Inquiry"}
        </h3>
        {!isCustom && (
          <p className="text-xs text-muted-foreground mb-4">
            {[selectedCategory?.name, selectedBrand, selectedType].filter(Boolean).join(" › ")}
          </p>
        )}

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input name="name" value={form.name} onChange={handleChange} className={fieldClass} placeholder="Full Name *" />
              {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <input name="company" value={form.company} onChange={handleChange} className={fieldClass} placeholder="Company" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input name="phone" value={form.phone} onChange={handleChange} className={fieldClass} placeholder="Phone / WhatsApp *" />
              {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <input name="email" type="email" value={form.email} onChange={handleChange} className={fieldClass} placeholder="Email" />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          {isCustom && (
            <select
              name="categorySelect"
              className={fieldClass}
              onChange={(e) => {
                const cat = productCategories.find((c) => c.name === e.target.value);
                if (cat) setSelectedCategory(cat);
              }}
            >
              <option value="">Select Category</option>
              {productCategories.filter(c => c.key !== "custom").map((c) => (
                <option key={c.key} value={c.name}>{c.name}</option>
              ))}
            </select>
          )}

          <div>
            <input name="quantity" value={form.quantity} onChange={handleChange} className={fieldClass} placeholder="Quantity (optional)" />
          </div>
          <div>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={3}
              className={fieldClass}
              placeholder="Part number, specs, or describe your requirement *"
            />
            {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
          </div>

          <p className="text-xs text-muted-foreground italic">
            We can source exact models even if not listed. Share your part number/specs.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleSubmit}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-md text-sm hover:opacity-90 transition-opacity"
            >
              <Mail className="w-4 h-4" />
              Request Quote via Email
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground font-semibold rounded-md text-sm hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Now
            </a>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (isCustom) return renderStep3();
    switch (step) {
      case 0: return renderStep0();
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {!isCustom && step > 0 && !submitted && (
              <button
                onClick={() => setStep(step - 1)}
                className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {isCustom ? "Custom Sourcing" : `Step ${step + 1} — ${currentStepLabel}`}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {renderStepIndicator()}
        {renderContent()}
      </div>
    </div>
  );
};

export default QuoteModal;
