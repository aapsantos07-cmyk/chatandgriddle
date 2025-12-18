import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Apparel = () => {
  return (
    <>
      <SEO 
        title="Apparel | Chat & Griddle"
        description="Rep your favorite Kenilworth brunch spot with Chat & Griddle merchandise. T-shirts, hats, and more coming soon."
        canonical="https://chatandgriddle.com/apparel"
      />
      <Navigation />
      
      <main className="pt-20">
        {/* Header */}
        <section className="bg-accent text-accent-foreground section-padding text-center">
          <h1 className="font-chalk text-4xl md:text-5xl lg:text-6xl mb-4">
            Apparel
          </h1>
          <p className="text-accent-foreground/80 text-lg max-w-2xl mx-auto">
            Wear your love for Chat & Griddle
          </p>
        </section>

        {/* Coming Soon Content */}
        <section className="section-padding">
          <div className="container-rustic">
            <div className="max-w-2xl mx-auto text-center py-16">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="font-chalk text-4xl text-primary">👕</span>
              </div>
              <h2 className="font-chalk text-3xl md:text-4xl text-primary mb-4">
                Coming Soon
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                We're working on some awesome Chat & Griddle merch! T-shirts, hats, and more are on the way. Stay tuned!
              </p>
              <p className="text-muted-foreground">
                Want to be notified when our apparel drops? Stop by the restaurant or give us a call at{" "}
                <a href="tel:+19082762222" className="text-primary font-semibold hover:underline">
                  (908) 276-2222
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Apparel;
