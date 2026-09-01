import Button from "@/components/ui/Button";

export default function CtaSection() {
  return (
    <section className="section-pad bg-lime">
      <div className="container-site text-center">
        <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-dark sm:text-4xl lg:text-5xl">
          Ready to activate sustainable mobility in your company?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-dark/70">
          Book a demo and discover how BeeToGreen simplifies the FMD, equips
          your teams, and measures your impact.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/contact" variant="primary" size="lg">
            Book a demo
          </Button>
          <Button href="/solutions/employeurs" variant="secondary" size="lg">
            Explore solutions
          </Button>
        </div>
      </div>
    </section>
  );
}
