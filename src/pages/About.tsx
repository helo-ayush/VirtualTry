import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About VirtualTryOn</h1>
          <div className="prose prose-lg">
            <p className="text-muted-foreground mb-4">
              VirtualTryOn is revolutionizing the way people shop for accessories online. 
              Using cutting-edge computer vision and AI technology, we enable customers to 
              virtually try on eyeglasses, sunglasses, hats, and more before making a purchase.
            </p>
            <p className="text-muted-foreground mb-4">
              Our mission is to bridge the gap between online and in-store shopping experiences, 
              giving you the confidence to find products that perfectly match your style and fit.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Technology</h2>
            <p className="text-muted-foreground">
              We utilize advanced facial landmark detection and real-time rendering to provide 
              an accurate, natural-looking preview of how accessories will look on you. Our AI 
              ensures proper positioning, sizing, and perspective for a realistic try-on experience.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
