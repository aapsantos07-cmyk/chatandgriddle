import { Link } from "react-router-dom";
import { MapPin, Clock, Phone, ChevronRight, Coffee, Sandwich, Home } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { MonthlyWinnerSection } from "@/components/home/MonthlyWinnerSection";
import heroImage from "@/assets/hero-brunch.jpg";

const Index = () => {
  return (
    <>
      <SEO 
        title="Chat & Griddle | Best Brunch & Breakfast in Kenilworth, NJ"
        description="Chat & Griddle is Kenilworth's favorite brunch spot. Serving all-day breakfast, signature sandwiches, and fresh lunch in Union County, NJ. Order online for pickup!"
      />
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Delicious brunch spread at Chat & Griddle"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-accent/70 via-accent/50 to-accent/80" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 container-rustic px-4 text-center pt-20">
            <p className="text-green-light font-medium mb-4 animate-fade-in">
              Kenilworth, NJ's Favorite Brunch Spot
            </p>
            <h1 className="font-chalk text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Chat & Griddle
            </h1>
            <p className="text-xl md:text-2xl text-accent-foreground/90 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              All-day breakfast, fresh brunch classics & neighborhood vibes in the heart of Union County
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <a
                href="https://www.clover.com/online-ordering/chat--griddle-kenilworth-2"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-rustic text-lg px-8 py-4"
              >
                Order Online
              </a>
              <Link to="/menu" className="btn-outline-rustic border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-accent text-lg px-8 py-4">
                View Menu
              </Link>
              <a href="tel:9082762222" className="flex items-center gap-2 text-primary-foreground hover:text-green-light transition-colors">
                <Phone className="w-5 h-5" />
                (908) 276-2222
              </a>
            </div>

            {/* Quick Info */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-accent-foreground/80 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-light" />
                <span>242 Boulevard, Kenilworth, NJ</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-light" />
                <span>Open Tue–Sun • Closed Monday</span>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronRight className="w-8 h-8 text-primary-foreground/60 rotate-90" />
          </div>
        </section>

        {/* Hours & Location Quick Section */}
        <section className="bg-card section-padding">
          <div className="container-rustic">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Hours */}
              <div className="text-center md:text-left">
                <h2 className="font-chalk text-3xl md:text-4xl text-primary mb-6">
                  Hours of Operation
                </h2>
                <div className="space-y-3 text-lg">
                  <div className="flex justify-between max-w-xs mx-auto md:mx-0">
                    <span className="text-muted-foreground">Tuesday</span>
                    <span className="font-medium">6:00 AM – 3:00 PM</span>
                  </div>
                  <div className="flex justify-between max-w-xs mx-auto md:mx-0">
                    <span className="text-muted-foreground">Wednesday</span>
                    <span className="font-medium">6:00 AM – 3:00 PM</span>
                  </div>
                  <div className="flex justify-between max-w-xs mx-auto md:mx-0">
                    <span className="text-muted-foreground">Thursday</span>
                    <span className="font-medium">6:00 AM – 3:00 PM</span>
                  </div>
                  <div className="flex justify-between max-w-xs mx-auto md:mx-0">
                    <span className="text-muted-foreground">Friday</span>
                    <span className="font-medium">6:00 AM – 3:00 PM</span>
                  </div>
                  <div className="flex justify-between max-w-xs mx-auto md:mx-0">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-medium">7:00 AM – 3:00 PM</span>
                  </div>
                  <div className="flex justify-between max-w-xs mx-auto md:mx-0">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-medium">7:00 AM – 2:00 PM</span>
                  </div>
                  <div className="flex justify-between max-w-xs mx-auto md:mx-0">
                    <span className="text-muted-foreground">Monday</span>
                    <span className="font-medium text-rust">Closed</span>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="text-center md:text-left">
                <h2 className="font-chalk text-3xl md:text-4xl text-primary mb-6">
                  Find Us
                </h2>
                <address className="not-italic space-y-4">
                  <p className="text-lg">
                    <strong>Chat & Griddle</strong><br />
                    242 Boulevard<br />
                    Kenilworth, NJ 07033
                  </p>
                  <a
                    href="tel:9082762222"
                    className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors text-lg font-medium"
                  >
                    <Phone className="w-5 h-5" />
                    (908) 276-2222
                  </a>
                </address>
                <div className="mt-6">
                  <a
                    href="https://maps.google.com/?q=242+Boulevard+Kenilworth+NJ+07033"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-rustic inline-flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Monthly Winner Section */}
        <MonthlyWinnerSection />

        {/* Featured Section */}
        <section className="section-padding">
          <div className="container-rustic text-center">
            <h2 className="font-chalk text-3xl md:text-4xl text-primary mb-4">
              What We're About
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
              Fresh ingredients, made-to-order breakfast & brunch favorites, and the kind of neighborhood warmth that makes every visit feel like home. From classic Taylor Ham sandwiches to creative brunch bowls, there's something for everyone.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="menu-card text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coffee className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">All-Day Breakfast</h3>
                <p className="text-muted-foreground">
                  From fluffy pancakes to loaded omelettes, breakfast is served all day long.
                </p>
              </div>

              <div className="menu-card text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sandwich className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">Signature Sammies</h3>
                <p className="text-muted-foreground">
                  Creative sandwiches like The Mondo, Mighty Quinn & Yoel's Torta you won't find anywhere else.
                </p>
              </div>

              <div className="menu-card text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">Local & Fresh</h3>
                <p className="text-muted-foreground">
                  A neighborhood spot where everyone knows your name and the food is always fresh.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <Link to="/menu" className="btn-rustic inline-flex items-center gap-2">
                Explore Our Full Menu
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary section-padding">
          <div className="container-rustic text-center">
            <h2 className="font-chalk text-3xl md:text-4xl text-primary-foreground mb-4">
              Ready to Eat?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Skip the wait and order online for quick pickup. Your breakfast favorites, ready when you are.
            </p>
            <a
              href="https://www.clover.com/online-ordering/chat--griddle-kenilworth-2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-md font-medium text-lg hover:bg-secondary transition-colors"
            >
              Order Online Now
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Index;
