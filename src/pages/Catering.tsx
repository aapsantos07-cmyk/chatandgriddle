import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { UtensilsCrossed } from "lucide-react";

const Catering = () => {
  return (
    <>
      <SEO 
        title="Catering | Chat & Griddle"
        description="Let Chat & Griddle cater your next event in Kenilworth, NJ. Fresh breakfast and brunch options for corporate meetings, parties, and special occasions."
        canonical="https://chatandgriddle.com/catering"
      />
      <Navigation />
      
      <main className="pt-20">
        {/* Header */}
        <section className="bg-accent text-accent-foreground section-padding text-center">
          <h1 className="font-chalk text-4xl md:text-5xl lg:text-6xl mb-4">
            Catering
          </h1>
          <p className="text-accent-foreground/80 text-lg max-w-2xl mx-auto">
            Bring Chat & Griddle to your next event
          </p>
        </section>

        {/* Coming Soon Content */}
        <section className="section-padding">
          <div className="container-rustic">
            <div className="max-w-2xl mx-auto text-center py-16">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <UtensilsCrossed className="w-10 h-10 text-primary" />
              </div>
              <h2 className="font-chalk text-3xl md:text-4xl text-primary mb-4">
                Coming Soon
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                We're putting together our catering menu and packages. Check back soon for details on how we can bring fresh, homemade breakfast and brunch to your next event!
              </p>
              <p className="text-muted-foreground">
                In the meantime, give us a call at{" "}
                <a href="tel:+19082762222" className="text-primary font-semibold hover:underline">
                  (908) 276-2222
                </a>{" "}
                to discuss your catering needs.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Catering;
