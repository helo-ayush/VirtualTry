import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, Heart, Share2, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import glasses1 from "@/assets/glasses-1.png";
import glasses2 from "@/assets/glasses-2.png";
import glasses3 from "@/assets/glasses-3.png";
import glasses4 from "@/assets/glasses-4.png";

const ProductDetail = () => {
  const { id } = useParams();

  // Mock product data - in real app, fetch based on id
  const product = {
    id: parseInt(id || "1"),
    name: "Premium Blue Eyeglasses",
    category: "Eyeglasses",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviews: 234,
    description:
      "Elevate your style with these premium blue eyeglasses. Crafted with precision and comfort in mind, featuring a modern acetate frame that's both durable and lightweight. Perfect for everyday wear.",
    images: [glasses1, glasses2, glasses3, glasses4],
    features: [
      "High-quality acetate frame",
      "Blue light blocking lenses",
      "Comfortable nose pads",
      "Spring hinges for durability",
      "Comes with protective case",
    ],
    details: {
      material: "Acetate Frame",
      color: "Navy Blue",
      shape: "Rectangular",
      lensType: "Blue Light Blocking",
      size: "Medium Fit",
    },
  };

  const relatedProducts = [
    { id: 2, name: "Classic Black Sunglasses", price: 199.99, image: glasses2 },
    { id: 3, name: "Aviator Gold Frame", price: 179.99, image: glasses3 },
    { id: 4, name: "Navy Cat-Eye Glasses", price: 159.99, image: glasses4 },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/store" className="hover:text-primary">Store</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.category}</span>
        </div>

        {/* Product Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-xl overflow-hidden p-8">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className="aspect-square bg-muted rounded-lg overflow-hidden p-2 hover:ring-2 ring-primary transition-all"
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {product.category}
              </div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-semibold">{product.rating}</span>
                </div>
                <button className="text-sm text-primary hover:underline">
                  Read {product.reviews} reviews
                </button>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-primary">${product.price}</span>
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
                <span className="bg-destructive text-destructive-foreground text-sm font-semibold px-2 py-1 rounded">
                  25% OFF
                </span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6">{product.description}</p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Key Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Details */}
              <div className="bg-muted rounded-lg p-4 mb-6">
                <h3 className="font-semibold mb-3">Product Details:</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {Object.entries(product.details).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-muted-foreground">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className="ml-2 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button asChild size="xl" variant="hero" className="w-full">
                <Link to={`/try-on/${product.id}`}>
                  <Camera className="w-5 h-5 mr-2" />
                  TRY ME
                </Link>
              </Button>
              <Button size="xl" variant="secondary" className="w-full">
                Buy Now
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  <Heart className="w-4 h-4 mr-2" />
                  Add to Wishlist
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-accent/50 rounded-lg p-4 text-sm">
              <p className="font-medium mb-1">🚚 Free shipping on orders over $50</p>
              <p className="text-muted-foreground">30-day returns policy</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="group bg-card rounded-xl border border-border overflow-hidden hover-lift"
              >
                <div className="aspect-square bg-muted p-6">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2">{item.name}</h3>
                  <p className="text-lg font-bold text-primary">${item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
