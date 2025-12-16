import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";

const Contact = () => {
  return (
    <>
      <SEO 
        title="Contact & Location | Chat & Griddle"
        description="Find Chat & Griddle at 242 Boulevard, Kenilworth, NJ 07033. Call (908) 276-2222. Open Tue-Sun for breakfast & lunch. Get directions and hours."
        canonical="https://chatandgriddle.com/contact"
      />
      <Navigation />
      
      <main className="pt-20">
        {/* Header */}
        <section className="bg-accent text-accent-foreground section-padding text-center">
          <h1 className="font-chalk text-4xl md:text-5xl lg:text-6xl mb-4">
            Contact & Location
          </h1>
          <p className="text-accent-foreground/80 text-lg max-w-2xl mx-auto">
            Find us on Boulevard in Kenilworth, NJ. We can't wait to serve you!
          </p>
        </section>

        <section className="section-padding">
          <div className="container-rustic">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="font-chalk text-3xl text-primary mb-8">
                  Get In Touch
                </h2>

                <div className="space-y-8">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg mb-1">Address</h3>
                      <address className="not-italic text-muted-foreground">
                        Chat & Griddle<br />
                        242 Boulevard<br />
                        Kenilworth, NJ 07033
                      </address>
                      <a
                        href="https://maps.google.com/?q=242+Boulevard+Kenilworth+NJ+07033"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:underline mt-2 font-medium"
                      >
                        Get Directions
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg mb-1">Phone</h3>
                      <a
                        href="tel:9082762222"
                        className="text-2xl font-chalk text-primary hover:text-secondary transition-colors"
                      >
                        (908) 276-2222
                      </a>
                      <p className="text-muted-foreground text-sm mt-1">
                        Tap to call on mobile
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg mb-3">Hours</h3>
                      <div className="space-y-2 text-muted-foreground">
                        <div className="flex justify-between gap-8">
                          <span>Tuesday – Friday</span>
                          <span className="font-medium text-foreground">6:00 AM – 3:00 PM</span>
                        </div>
                        <div className="flex justify-between gap-8">
                          <span>Saturday</span>
                          <span className="font-medium text-foreground">7:00 AM – 3:00 PM</span>
                        </div>
                        <div className="flex justify-between gap-8">
                          <span>Sunday</span>
                          <span className="font-medium text-foreground">7:00 AM – 2:00 PM</span>
                        </div>
                        <div className="flex justify-between gap-8">
                          <span>Monday</span>
                          <span className="font-medium text-rust">Closed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Order CTA */}
                <div className="mt-12 p-6 bg-card rounded-xl border border-border">
                  <h3 className="font-heading font-semibold text-lg mb-2">Skip the Wait</h3>
                  <p className="text-muted-foreground mb-4">
                    Order online for quick pickup—your food will be ready when you arrive.
                  </p>
                  <a
                    href="https://www.clover.com/online-ordering/chat--griddle-kenilworth-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-rustic inline-flex items-center gap-2"
                  >
                    Order Online
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Map */}
              <div>
                <h2 className="font-chalk text-3xl text-primary mb-8">
                  Find Us
                </h2>
                <div className="rounded-xl overflow-hidden border border-border shadow-lg h-[400px] lg:h-[500px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.4095076752385!2d-74.29087492404688!3d40.67688047139885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3b1d0c9d0d0d1%3A0x1234567890abcdef!2s242%20Boulevard%2C%20Kenilworth%2C%20NJ%2007033!5e0!3m2!1sen!2sus!4v1234567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Chat & Griddle Location"
                  />
                </div>
                <p className="text-center text-muted-foreground text-sm mt-4">
                  Located on Boulevard in Kenilworth, Union County, NJ
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Area */}
        <section className="bg-card section-padding">
          <div className="container-rustic text-center">
            <h2 className="font-chalk text-3xl text-primary mb-4">
              Serving Union County & Beyond
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chat & Griddle proudly serves Kenilworth, Cranford, Roselle Park, Union, Elizabeth, 
              and the greater Union County area. Just a short drive for the best brunch in New Jersey!
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Contact;
