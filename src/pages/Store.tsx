import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Search, Heart } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import glasses1 from "@/assets/glasses-1.png";
import glasses2 from "@/assets/glasses-2.png";
import glasses3 from "@/assets/glasses-3.png";
import glasses4 from "@/assets/glasses-4.png";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
  rating: number;
  reviews: number;
}

const Store = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const products: Product[] = [
    {
      id: 1,
      name: "Premium Blue Eyeglasses",
      category: "eyeglasses",
      price: 149.99,
      image: glasses1,
      badge: "Popular",
      rating: 4.8,
      reviews: 234,
    },
    {
      id: 2,
      name: "Classic Black Sunglasses",
      category: "sunglasses",
      price: 199.99,
      image: glasses2,
      badge: "New",
      rating: 4.9,
      reviews: 189,
    },
    {
      id: 3,
      name: "Aviator Gold Frame",
      category: "sunglasses",
      price: 179.99,
      image: glasses3,
      rating: 4.7,
      reviews: 156,
    },
    {
      id: 4,
      name: "Navy Cat-Eye Glasses",
      category: "eyeglasses",
      price: 159.99,
      image: glasses4,
      badge: "Popular",
      rating: 4.8,
      reviews: 201,
    },
    {
      id: 5,
      name: "Modern Blue Frame",
      category: "eyeglasses",
      price: 139.99,
      image: glasses1,
      rating: 4.6,
      reviews: 98,
    },
    {
      id: 6,
      name: "Sport Sunglasses",
      category: "sunglasses",
      price: 189.99,
      image: glasses2,
      rating: 4.7,
      reviews: 167,
    },
  ];

  const categories = [
    { id: "all", label: "All Products" },
    { id: "eyeglasses", label: "Eyeglasses" },
    { id: "sunglasses", label: "Sunglasses" },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Browse Our Collection</h1>
          <p className="text-muted-foreground">Discover the perfect accessories for your style</p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "secondary"}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-xl border border-border overflow-hidden hover-lift"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-muted p-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
                {product.badge && (
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {product.badge}
                  </div>
                )}
                <button
                  className="absolute top-3 left-3 w-8 h-8 bg-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:scale-110 transition-transform"
                  aria-label="Add to wishlist"
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground uppercase mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-semibold line-clamp-2">{product.name}</h3>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1">{product.rating}</span>
                  </div>
                  <span className="text-muted-foreground">({product.reviews})</span>
                </div>

                {/* Price */}
                <p className="text-xl font-bold text-primary">${product.price}</p>

                {/* Actions */}
                <div className="space-y-2">
                  <Button asChild className="w-full" size="sm">
                    <Link to={`/product/${product.id}`}>
                      <Camera className="w-4 h-4 mr-2" />
                      Try Me
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" className="w-full" size="sm">
                    <Link to={`/product/${product.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No products found matching your search.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Store;
