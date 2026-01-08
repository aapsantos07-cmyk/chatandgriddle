import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { useAuth } from "@/hooks/useAdmin";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { data: user } = useAuth();

  const allLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Build Sandwich", path: "/sandwich-builder" },
    { name: "Gallery", path: "/sandwich-gallery", adminOnly: true },
    { name: "Order Online", path: "/order" },
    { name: "Catering", path: "/catering" },
    { name: "Apparel", path: "/apparel" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const links = allLinks.filter(link => !link.adminOnly || user);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container-rustic">
        <div className="flex items-center justify-between h-16 md:h-20 px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-chalk text-xl md:text-2xl text-primary">
              Chat & Griddle
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                  isActive(link.path)
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-foreground/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="tel:9082762222"
              className="btn-rustic flex items-center gap-2 text-sm"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border bg-background animate-fade-in">
            <div className="py-4 px-4 space-y-3">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 px-3 rounded-md font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/80 hover:bg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="tel:9082762222"
                className="btn-rustic flex items-center justify-center gap-2 w-full mt-4"
              >
                <Phone className="w-4 h-4" />
                (908) 276-2222
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
