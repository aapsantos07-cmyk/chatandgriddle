import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { menuData } from "@/data/menuData";
import { ChevronRight } from "lucide-react";

const Menu = () => {
  return (
    <>
      <SEO 
        title="Menu | Chat & Griddle"
        description="View the full Chat & Griddle menu. Taylor Ham egg & cheese, pancakes, chicken cutlet sandwiches, salads & more. Breakfast & lunch in Kenilworth, NJ."
        canonical="https://chatandgriddle.com/menu"
      />
      <Navigation />
      
      <main className="pt-20">
        {/* Header */}
        <section className="bg-accent text-accent-foreground section-padding text-center">
          <h1 className="font-chalk text-4xl md:text-5xl lg:text-6xl mb-4">
            Our Menu
          </h1>
          <p className="text-accent-foreground/80 text-lg max-w-2xl mx-auto">
            Fresh, made-to-order breakfast & lunch favorites. From classic NJ Taylor Ham to creative chef specials.
          </p>
        </section>

        {/* Quick Order CTA */}
        <section className="bg-primary py-4">
          <div className="container-rustic text-center">
            <a
              href="https://www.clover.com/online-ordering/chat--griddle-kenilworth-2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-foreground hover:underline font-medium"
            >
              Order online for pickup
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Menu Categories */}
        <section className="section-padding">
          <div className="container-rustic">
            {menuData.map((category) => (
              <div key={category.name} className="mb-16 last:mb-0">
                <h2 className="menu-category-header">{category.name}</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {category.items.map((item, index) => (
                    <div
                      key={`${category.name}-${index}`}
                      className="menu-card flex justify-between items-start gap-4"
                    >
                      <div className="flex-1">
                        <h3 className="font-heading font-semibold text-lg text-foreground">
                          {item.name}
                        </h3>
                        {item.description && (
                          <p className="text-muted-foreground text-sm mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <span className="font-chalk text-xl text-primary whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-card section-padding">
          <div className="container-rustic text-center">
            <h2 className="font-chalk text-3xl md:text-4xl text-primary mb-4">
              Hungry Yet?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Order ahead online and skip the wait. Fresh breakfast & lunch, ready for pickup.
            </p>
            <a
              href="https://www.clover.com/online-ordering/chat--griddle-kenilworth-2"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-rustic inline-flex items-center gap-2 text-lg"
            >
              Order Online
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Menu;
