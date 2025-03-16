
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import SearchBox from "@/components/SearchBox";
import WeatherCard from "@/components/WeatherCard";
import ErrorMessage from "@/components/ErrorMessage";
import Footer from "@/components/Footer";
import { fetchWeatherByCity, WeatherData } from "@/services/weatherApi";

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherByCity(city);
      setWeatherData(data);
      toast({
        title: "Berhasil mengambil data",
        description: `Data cuaca untuk ${data.location.name} telah diperbarui.`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Terjadi kesalahan yang tidak diketahui.";
      setError(errorMessage);
      setWeatherData(null);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  // Membuat objek data yang kompatibel dengan komponen WeatherCard yang sudah ada
  const transformedWeatherData = weatherData ? {
    name: weatherData.location.name,
    main: {
      temp: weatherData.current.temp_c,
      humidity: weatherData.current.humidity
    },
    weather: [{
      description: weatherData.current.condition.text,
      icon: weatherData.current.condition.icon
    }],
    wind: {
      speed: weatherData.current.wind_kph / 3.6 // Konversi ke m/s untuk menjaga kompatibilitas
    }
  } : null;

  return (
    <div className="min-h-screen flex flex-col">
      <div
        className="fixed inset-0 -z-10 bg-background"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=2574&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
        }}
      />
      
      <div className="container px-4 py-8 flex-1 flex flex-col max-w-4xl mx-auto">
        <Header />
        
        <main className="flex-1 flex flex-col py-8 space-y-8">
          <SearchBox onSearch={handleSearch} loading={loading} />
          
          {error && <ErrorMessage message={error} />}
          
          {(transformedWeatherData || loading) && (
            <WeatherCard data={transformedWeatherData} loading={loading} />
          )}
          
          {!weatherData && !loading && !error && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md px-4 py-12 animate-fade-in">
                <h2 className="text-xl font-medium mb-3">
                  Selamat datang di Aplikasi Cuaca
                </h2>
                <p className="text-muted-foreground mb-6">
                  Masukkan nama kota di Indonesia untuk melihat informasi cuaca terkini, 
                  termasuk suhu, deskripsi cuaca, kelembapan, dan kecepatan angin.
                </p>
                <div className="bg-secondary/50 border border-border/50 rounded-lg p-4 shadow-sm">
                  <h3 className="font-medium mb-2">Cara Menggunakan:</h3>
                  <ol className="text-left text-sm space-y-2">
                    <li>1. Ketik nama kota di kotak pencarian (contoh: Jakarta, Surabaya, Bandung)</li>
                    <li>2. Klik tombol "Cari" atau tekan Enter</li>
                    <li>3. Lihat informasi cuaca yang muncul</li>
                    <li>4. Untuk mencari kota lain, ulangi langkah 1-2</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
