
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Cloud, 
  CloudRain, 
  Droplets, 
  Thermometer, 
  Wind, 
  Sun,
  CloudSun,
  CloudLightning,
  CloudSnow,
  CloudDrizzle,
  CloudFog
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WeatherCardProps {
  data: {
    name: string;
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
  } | null;
  loading: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto glass-card overflow-hidden animate-pulse-slow">
        <CardContent className="p-6">
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4 mx-auto rounded-md" />
            <div className="flex justify-center">
              <Skeleton className="h-24 w-24 rounded-full" />
            </div>
            <Skeleton className="h-8 w-1/2 mx-auto rounded-md" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-16 rounded-md" />
              <Skeleton className="h-16 rounded-md" />
              <Skeleton className="h-16 rounded-md" />
              <Skeleton className="h-16 rounded-md" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  const getWeatherIcon = (condition: string) => {
    // Gunakan kondisi cuaca untuk menentukan ikon yang sesuai
    const weatherLower = condition.toLowerCase();
    
    if (weatherLower.includes("hujan") || weatherLower.includes("rain")) {
      return <CloudRain className="h-32 w-32 text-blue-500" />;
    } else if (weatherLower.includes("cerah berawan") || weatherLower.includes("partly cloudy")) {
      return <CloudSun className="h-32 w-32 text-yellow-500" />;
    } else if (weatherLower.includes("berawan") || weatherLower.includes("cloudy") || weatherLower.includes("mendung")) {
      return <Cloud className="h-32 w-32 text-gray-500" />;
    } else if (weatherLower.includes("cerah") || weatherLower.includes("sunny") || weatherLower.includes("clear")) {
      return <Sun className="h-32 w-32 text-yellow-500" />;
    } else if (weatherLower.includes("badai") || weatherLower.includes("petir") || weatherLower.includes("thunder")) {
      return <CloudLightning className="h-32 w-32 text-purple-500" />;
    } else if (weatherLower.includes("salju") || weatherLower.includes("snow")) {
      return <CloudSnow className="h-32 w-32 text-sky-200" />;
    } else if (weatherLower.includes("kabut") || weatherLower.includes("fog") || weatherLower.includes("mist")) {
      return <CloudFog className="h-32 w-32 text-gray-400" />;
    } else if (weatherLower.includes("gerimis") || weatherLower.includes("drizzle")) {
      return <CloudDrizzle className="h-32 w-32 text-blue-400" />;
    }
    
    // Default icon jika tidak ada yang cocok
    return <Cloud className="h-32 w-32 text-gray-500" />;
  };
  
  // Simpan fungsi getWeatherIconFromCode untuk kompatibilitas jika dibutuhkan
  const getWeatherIconFromCode = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  const capitalize = (str: string) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const WeatherIconComponent = getWeatherIcon(data.weather[0].description);

  return (
    <Card className="w-full max-w-md mx-auto glass-card overflow-hidden animate-scale-in">
      <CardContent className="p-6">
        <div className="space-y-6">
          <h2 className="text-3xl font-medium text-center tracking-tight">
            {data.name}
          </h2>
          
          <div className="flex justify-center">
            {WeatherIconComponent}
          </div>
          
          <div className="text-center">
            <div className="text-5xl font-light mb-2">
              {Math.round(data.main.temp)}°C
            </div>
            <div className="text-lg text-muted-foreground">
              {capitalize(data.weather[0].description)}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4">
            <WeatherStat 
              icon={<Thermometer className="h-6 w-6" />} 
              label="Suhu" 
              value={`${Math.round(data.main.temp)}°C`} 
            />
            <WeatherStat 
              icon={getWeatherStatIcon(data.weather[0].description)} 
              label="Cuaca" 
              value={capitalize(data.weather[0].description)} 
            />
            <WeatherStat 
              icon={<Droplets className="h-6 w-6" />} 
              label="Kelembapan" 
              value={`${data.main.humidity}%`} 
            />
            <WeatherStat 
              icon={<Wind className="h-6 w-6" />} 
              label="Angin" 
              value={`${data.wind.speed} m/s`} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const getWeatherStatIcon = (condition: string) => {
  const weatherLower = condition.toLowerCase();
  
  if (weatherLower.includes("hujan") || weatherLower.includes("rain")) {
    return <CloudRain className="h-6 w-6" />;
  } else if (weatherLower.includes("cerah berawan") || weatherLower.includes("partly cloudy")) {
    return <CloudSun className="h-6 w-6" />;
  } else if (weatherLower.includes("berawan") || weatherLower.includes("cloudy") || weatherLower.includes("mendung")) {
    return <Cloud className="h-6 w-6" />;
  } else if (weatherLower.includes("cerah") || weatherLower.includes("sunny") || weatherLower.includes("clear")) {
    return <Sun className="h-6 w-6" />;
  } else if (weatherLower.includes("badai") || weatherLower.includes("petir") || weatherLower.includes("thunder")) {
    return <CloudLightning className="h-6 w-6" />;
  } else if (weatherLower.includes("salju") || weatherLower.includes("snow")) {
    return <CloudSnow className="h-6 w-6" />;
  } else if (weatherLower.includes("kabut") || weatherLower.includes("fog") || weatherLower.includes("mist")) {
    return <CloudFog className="h-6 w-6" />;
  } else if (weatherLower.includes("gerimis") || weatherLower.includes("drizzle")) {
    return <CloudDrizzle className="h-6 w-6" />;
  }
  
  // Default icon jika tidak ada yang cocok
  return <Cloud className="h-6 w-6" />;
};

interface WeatherStatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const WeatherStat: React.FC<WeatherStatProps> = ({ icon, label, value }) => {
  return (
    <div className={cn(
      "flex flex-col items-center p-3 rounded-lg",
      "bg-secondary/50 border border-border/50"
    )}>
      <div className="text-primary mb-1">{icon}</div>
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="font-medium text-sm">{value}</div>
    </div>
  );
};

export default WeatherCard;
