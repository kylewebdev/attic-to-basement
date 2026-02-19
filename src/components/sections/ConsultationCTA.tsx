import ConsultationForm from "@/components/forms/ConsultationForm";
import Button from "@/components/ui/Button";

interface ConsultationCTAProps {
  showForm?: boolean;
}

export default function ConsultationCTA({ showForm = false }: ConsultationCTAProps) {
  return (
    <section id="consultation" className="py-16 md:py-24 bg-sage-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-stone-200">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-stone-400 max-w-xl mx-auto">
            Schedule a free, no-obligation consultation. We respond to inquiries
            7 days a week.
          </p>
          <a
            href="tel:+19165211077"
            className="inline-block mt-3 text-sage-300 hover:text-sage-400 font-semibold transition-colors"
          >
            Or call us: (916) 521-1077
          </a>
        </div>

        {showForm ? (
          <ConsultationForm />
        ) : (
          <div className="text-center">
            <Button href="/#consultation" variant="primary">
              Schedule a Free Consultation
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
