import { useParams, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Camera, FlipHorizontal, Settings, ArrowLeft, Share2, Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import glasses1 from "@/assets/glasses-1.png";

const TryOn = () => {
  const { id } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [scale, setScale] = useState([100]);
  const [transparency, setTransparency] = useState([100]);
  const [cameraActive, setCameraActive] = useState(false);

  // Mock product data
  const product = {
    id: parseInt(id || "1"),
    name: "Premium Blue Eyeglasses",
    price: 149.99,
    image: glasses1,
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setCameraActive(true);
      // Simulate face detection after a moment
      setTimeout(() => setFaceDetected(true), 1000);
      toast.success("Camera activated");
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Could not access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setCameraActive(false);
      setFaceDetected(false);
    }
  };

  const captureScreenshot = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `tryon-${Date.now()}.png`;
            a.click();
            toast.success("Screenshot captured!");
          }
        });
      }
    }
  };

  const flipCamera = async () => {
    stopCamera();
    toast.info("Flipping camera...");
    setTimeout(() => startCamera(), 500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button asChild variant="ghost">
            <Link to={`/product/${id}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Product
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            {faceDetected ? (
              <div className="flex items-center gap-2 bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                Face Detected
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-red-500/10 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-red-600 rounded-full" />
                No Face Detected
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Camera Feed - Takes up 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative bg-black rounded-2xl overflow-hidden aspect-video">
              {/* Video Feed */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              
              {/* Overlay for glasses - simplified placeholder */}
              {faceDetected && (
                <div 
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{ opacity: transparency[0] / 100 }}
                >
                  <img
                    src={product.image}
                    alt="Virtual Try-On"
                    className="max-w-[40%] h-auto"
                    style={{ transform: `scale(${scale[0] / 100})` }}
                  />
                </div>
              )}

              {/* Camera Controls */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
                <Button
                  variant="camera"
                  size="icon"
                  onClick={flipCamera}
                  className="w-12 h-12"
                >
                  <FlipHorizontal className="w-5 h-5" />
                </Button>
                <Button
                  variant="camera"
                  size="icon"
                  onClick={captureScreenshot}
                  className="w-16 h-16"
                >
                  <Camera className="w-6 h-6" />
                </Button>
                <Button
                  variant="camera"
                  size="icon"
                  onClick={() => setShowSettings(!showSettings)}
                  className="w-12 h-12"
                >
                  <Settings className="w-5 h-5" />
                </Button>
              </div>

              {/* Helper Text */}
              {!faceDetected && cameraActive && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="bg-background/90 backdrop-blur-sm rounded-lg p-6">
                    <p className="text-lg font-medium mb-2">Position your face in the frame</p>
                    <p className="text-sm text-muted-foreground">
                      Make sure your face is well-lit and clearly visible
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Tip */}
            <div className="bg-accent/50 rounded-lg p-4 text-sm">
              <span className="font-medium">💡 Tip:</span> Adjust the lighting in your room for best results. 
              Keep your face clearly visible to the camera.
            </div>

            {/* Hidden canvas for screenshots */}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            {/* Product Info */}
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex gap-4 mb-4">
                <div className="w-20 h-20 bg-muted rounded-lg p-2">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-xl font-bold text-primary">${product.price}</p>
                </div>
              </div>

              {/* Adjustments */}
              {showSettings && (
                <div className="space-y-6 pt-6 border-t border-border animate-fade-in">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Size/Scale: {scale[0]}%
                    </label>
                    <Slider
                      value={scale}
                      onValueChange={setScale}
                      min={80}
                      max={120}
                      step={1}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Transparency: {transparency[0]}%
                    </label>
                    <Slider
                      value={transparency}
                      onValueChange={setTransparency}
                      min={50}
                      max={100}
                      step={1}
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setScale([100]);
                      setTransparency([100]);
                      toast.success("Settings reset");
                    }}
                  >
                    Reset to Default
                  </Button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button size="lg" className="w-full">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy Now
              </Button>
              <Button size="lg" variant="secondary" className="w-full">
                <Share2 className="w-4 h-4 mr-2" />
                Share Try-On
              </Button>
              <Button size="lg" variant="outline" className="w-full">
                <Heart className="w-4 h-4 mr-2" />
                Add to Wishlist
              </Button>
              <Button asChild variant="ghost" className="w-full">
                <Link to={`/product/${id}`}>Back to Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryOn;
