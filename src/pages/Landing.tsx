import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, ShoppingBag, Shield, ImageIcon } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-image.jpg";

const Landing = () => {
  const features = [
    {
      icon: Camera,
      title: "Real-Time Preview",
      description: "See accessories on your face instantly using advanced computer vision technology.",
    },
    {
      icon: ShoppingBag,
      title: "Wide Selection",
      description: "Browse hundreds of eyeglasses, hats, and premium accessories tailored to your style.",
    },
    {
      icon: Shield,
      title: "Perfect Fit Guarantee",
      description: "AI-powered facial landmark detection ensures accurate positioning and natural movement.",
    },
    {
      icon: ImageIcon,
      title: "Instant Capture",
      description: "Save and share your virtual try-on moments with a single click.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Browse",
      description: "Explore our curated collection of eyeglasses, hats, and accessories",
    },
    {
      number: "02",
      title: "Try",
      description: "Use your device camera to see how items look on your face in real-time",
    },
    {
      number: "03",
      title: "Capture & Share",
      description: "Capture moments and share your favorite looks with friends",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background to-muted overflow-hidden">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Try Before You Buy - Virtual Accessories for Everyone
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Experience our innovative Virtual Try-On technology. Browse our collection of eyeglasses, 
                hats, and more. See how they look on you in real-time with AI-powered facial landmark detection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="hero" size="xl">
                  <Link to="/store">Explore Store</Link>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <Link to="#how-it-works">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-slide-up">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Virtual Try-On Technology"
                  className="w-full h-auto"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-accent-teal/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose VirtualTryOn?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge technology meets fashion to bring you the best virtual try-on experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border border-border hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-accent-indigo rounded-2xl p-12 md:p-16 text-center text-primary-foreground shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Look?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Visit our store and start trying on accessories today. Find your perfect style with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="xl" variant="secondary">
                <Link to="/store">Go to Store</Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
