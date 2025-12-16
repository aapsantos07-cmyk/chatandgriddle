import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { ChevronRight } from "lucide-react";

const About = () => {
  return (
    <>
      <SEO 
        title="About Us | Chat & Griddle"
        description="Learn about Chat & Griddle, Kenilworth's favorite neighborhood brunch spot. Fresh food, friendly faces, and local community spirit since day one."
        canonical="https://chatandgriddle.com/about"
      />
      <Navigation />
      
      <main className="pt-20">
        {/* Header */}
        <section className="bg-accent text-accent-foreground section-padding text-center">
          <h1 className="font-chalk text-4xl md:text-5xl lg:text-6xl mb-4">
            About Us
          </h1>
          <p className="text-accent-foreground/80 text-lg max-w-2xl mx-auto">
            Your neighborhood brunch spot in the heart of Kenilworth, NJ
          </p>
        </section>

        {/* Story Section */}
        <section className="section-padding">
          <div className="container-rustic">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-chalk text-3xl md:text-4xl text-primary mb-6 text-center">
                A Local Favorite
              </h2>
              
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p>
                  Chat & Griddle is more than just a restaurant—it's where Kenilworth comes together. 
                  Whether you're grabbing a quick coffee before work or settling in for a lazy Sunday brunch, 
                  we're here to serve you fresh, homemade food with a smile.
                </p>
                
                <p>
                  Our rustic, welcoming space features reclaimed wood, a cozy diner vibe, and the kind of 
                  warmth that makes you want to stay a little longer. We believe breakfast should be an experience, 
                  not just a meal.
                </p>

                <p>
                  From classic New Jersey Taylor Ham egg & cheese to our signature creations like The Mondo 
                  and Chicken & Waffles, every dish is made fresh to order. We source quality ingredients 
                  and put real care into everything that comes out of our kitchen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-card section-padding">
          <div className="container-rustic">
            <h2 className="font-chalk text-3xl md:text-4xl text-primary mb-12 text-center">
              What We Stand For
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-chalk text-3xl text-primary">🥚</span>
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">Fresh & Homemade</h3>
                <p className="text-muted-foreground">
                  Every dish is made to order with quality ingredients. No shortcuts, no compromises.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-chalk text-3xl text-primary">👋</span>
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">Community First</h3>
                <p className="text-muted-foreground">
                  We're proud to be part of Kenilworth. Supporting local families and being a gathering spot is what we do.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-chalk text-3xl text-primary">❤️</span>
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">Made With Love</h3>
                <p className="text-muted-foreground">
                  From our family to yours, we put heart into every plate that leaves our kitchen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Rating Section */}
        <section className="section-padding">
          <div className="container-rustic text-center">
            <div className="max-w-xl mx-auto">
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-3xl">⭐</span>
                ))}
              </div>
              <p className="font-chalk text-4xl text-primary mb-2">4.8</p>
              <p className="text-muted-foreground">
                Rated 4.8 stars on Google • $10–$20 price range
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary section-padding">
          <div className="container-rustic text-center">
            <h2 className="font-chalk text-3xl md:text-4xl text-primary-foreground mb-4">
              Come Say Hi
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              We'd love to see you! Stop by for breakfast, brunch, or lunch—or order ahead for pickup.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-md font-medium text-lg hover:bg-secondary transition-colors"
              >
                Visit Us
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                to="/menu"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded-md font-medium text-lg hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                See the Menu
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default About;
