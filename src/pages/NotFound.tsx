
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CloudOff } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-6 animate-scale-in">
        <CloudOff className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Halaman yang Anda cari tidak ditemukan
        </p>
        <Button asChild>
          <a href="/">Kembali ke Beranda</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
