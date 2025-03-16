
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 text-center text-sm text-muted-foreground animate-fade-in">
      <div className="max-w-md mx-auto space-y-2">
        <p>
          Data cuaca disediakan oleh{" "}
          <a
            href="https://www.weatherapi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            WeatherAPI.com
          </a>
        </p>
        <p className="mt-1">
          Aplikasi Cuaca Untuk Indonesia &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
