import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { ExternalLink, Clock, MapPin, Phone } from "lucide-react";

const Order = () => {
  return (
    <>
      <SEO 
        title="Order Online | Chat & Griddle"
        description="Order online from Chat & Griddle for quick pickup. Fresh breakfast & lunch, ready when you arrive. Serving Kenilworth, NJ and Union County."
        canonical="https://chatandgriddle.com/order"
      />
      <Navigation />
      
      <main className="pt-20">
        {/* Header */}
        <section className="bg-primary text-primary-foreground section-padding text-center">
          <h1 className="font-chalk text-4xl md:text-5xl lg:text-6xl mb-4">
            Order Online
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Skip the line! Order ahead for quick & easy pickup at Chat & Griddle.
          </p>
        </section>

        {/* Order Section */}
        <section className="section-padding">
          <div className="container-rustic">
            <div className="max-w-2xl mx-auto">
              {/* Main CTA Card */}
              <div className="bg-card border border-border rounded-xl p-8 md:p-12 text-center shadow-lg mb-12">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="font-chalk text-4xl">🍳</span>
                </div>
                
                <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                  Ready to Order?
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Browse our full menu, customize your order, and pick it up fresh when you arrive. Fast, easy, delicious.
                </p>

                <a
                  href="https://www.clover.com/online-ordering/chat--griddle-kenilworth-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-rustic inline-flex items-center gap-3 text-lg px-10 py-5"
                >
                  Order Now on Clover
                  <ExternalLink className="w-5 h-5" />
                </a>

                <p className="text-sm text-muted-foreground mt-6">
                  Powered by Clover Online Ordering
                </p>
              </div>

              {/* How It Works */}
              <div className="mb-12">
                <h3 className="font-chalk text-2xl text-primary text-center mb-8">
                  How It Works
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                      1
                    </div>
                    <h4 className="font-heading font-semibold mb-2">Browse & Order</h4>
                    <p className="text-muted-foreground text-sm">
                      Pick your favorites from our full menu online
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                      2
                    </div>
                    <h4 className="font-heading font-semibold mb-2">We Prepare</h4>
                    <p className="text-muted-foreground text-sm">
                      Our kitchen fires up your order fresh
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                      3
                    </div>
                    <h4 className="font-heading font-semibold mb-2">Pick Up</h4>
                    <p className="text-muted-foreground text-sm">
                      Swing by and grab your food—no wait!
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-muted rounded-xl p-6 md:p-8">
                <h3 className="font-heading font-semibold text-xl mb-6 text-center">
                  Pickup Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">242 Boulevard, Kenilworth, NJ 07033</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Pickup Hours</p>
                      <p className="text-muted-foreground">
                        Tue–Fri: 6:00 AM – 3:00 PM<br />
                        Sat: 7:00 AM – 3:00 PM<br />
                        Sun: 7:00 AM – 2:00 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Questions?</p>
                      <a href="tel:9082762222" className="text-primary hover:underline">
                        (908) 276-2222
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Order;
