import { useParams, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Camera, FlipHorizontal, Settings, ArrowLeft, Share2, Heart, ShoppingCart, Maximize2 } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import glasses1 from "@/assets/glasses-1.png";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="min-h-screen">
      <Navigation />

      <div className="container mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Button variant="glass" asChild className="mb-4">
            <Link to={`/product/${id}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Product
            </Link>
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="relative glass-strong rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-muted to-background relative">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                
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

                <motion.div 
                  className="absolute top-4 left-4 flex items-center gap-2 glass-strong px-4 py-2 rounded-full text-sm shadow-lg"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.div 
                    className={`w-2 h-2 rounded-full ${faceDetected ? 'bg-green-500' : 'bg-red-500'}`}
                    animate={faceDetected ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                  <span className="font-medium">{faceDetected ? 'Face Detected' : 'No Face'}</span>
                </motion.div>

                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button variant="glass" size="icon" className="w-12 h-12 rounded-full shadow-lg" onClick={flipCamera}>
                      <FlipHorizontal className="w-5 h-5" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button variant="accent" size="icon" className="w-16 h-16 rounded-full shadow-xl" onClick={captureScreenshot}>
                      <Camera className="w-6 h-6" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button variant="glass" size="icon" className="w-12 h-12 rounded-full shadow-lg" onClick={() => setShowSettings(!showSettings)}>
                      <Settings className="w-5 h-5" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </motion.div>

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-6">
                <motion.div className="glass rounded-xl p-2" whileHover={{ scale: 1.05 }}>
                  <img src={product.image} alt="Product" className="w-20 h-20 object-contain" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-2xl font-bold gradient-text">${product.price}</p>
                </div>
              </div>

              <AnimatePresence>
                {showSettings && (
                  <motion.div 
                    className="space-y-6 pt-6 border-t border-border/20"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div>
                      <label className="text-sm font-medium mb-3 block flex items-center gap-2">
                        <Maximize2 className="w-4 h-4 text-accent" />
                        Size: {scale[0]}%
                      </label>
                      <Slider value={scale} onValueChange={setScale} min={80} max={120} step={1} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-3 block">Transparency: {transparency[0]}%</label>
                      <Slider value={transparency} onValueChange={setTransparency} min={50} max={100} step={1} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="accent" className="w-full" size="lg">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Buy Now
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="glass" className="w-full" size="lg">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </motion.div>
            </div>

            <motion.div className="glass-strong rounded-2xl p-5">
              <p className="text-sm">
                <span className="text-2xl mr-2">💡</span>
                <strong className="text-accent">Tip:</strong>{" "}
                <span className="text-muted-foreground">Adjust lighting for best results.</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TryOn;
