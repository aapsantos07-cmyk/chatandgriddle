import { Link } from "react-router-dom";
import { MapPin, Phone, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container-rustic section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-chalk text-2xl text-primary-foreground mb-4">
              Chat & Griddle
            </h3>
            <p className="text-accent-foreground/80 leading-relaxed">
              Your neighborhood brunch spot in Kenilworth, NJ. Fresh food, friendly faces, and the best breakfast in Union County.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <Link to="/menu" className="block text-accent-foreground/80 hover:text-primary-foreground transition-colors">
                Menu
              </Link>
              <Link to="/order" className="block text-accent-foreground/80 hover:text-primary-foreground transition-colors">
                Order Online
              </Link>
              <Link to="/about" className="block text-accent-foreground/80 hover:text-primary-foreground transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block text-accent-foreground/80 hover:text-primary-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Visit Us</h4>
            <div className="space-y-3 text-accent-foreground/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-green-light flex-shrink-0" />
                <span>242 Boulevard<br />Kenilworth, NJ 07033</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-light flex-shrink-0" />
                <a href="tel:9082762222" className="hover:text-primary-foreground transition-colors">
                  (908) 276-2222
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-0.5 text-green-light flex-shrink-0" />
                <div>
                  <p>Tue–Fri: 6:00 AM – 3:00 PM</p>
                  <p>Sat: 7:00 AM – 3:00 PM</p>
                  <p>Sun: 7:00 AM – 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-accent-foreground/20 text-center text-accent-foreground/60 text-sm">
          <p>© {new Date().getFullYear()} Chat & Griddle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
