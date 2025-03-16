
import React from "react";
import { CloudSun } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="w-full py-8 text-center animate-slide-down">
      <div className="flex items-center justify-center mb-2">
        <CloudSun className="h-8 w-8 text-primary mr-2" />
        <h1 className="text-3xl font-semibold tracking-tight">Cuacaku</h1>
      </div>
      <p className="text-muted-foreground max-w-md mx-auto">
        Aplikasi cuaca untuk Indonesia
      </p>
      <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
        Cukup ketik nama kota di Indonesia untuk mendapatkan informasi cuaca terkini
      </p>
    </header>
  );
};

export default Header;
