
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBoxProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, loading }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto animate-slide-up">
      <div className="space-y-2">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Masukkan nama kota di Indonesia..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-white/90 backdrop-blur-sm border-border/50 pr-10"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Search size={18} />
            </div>
          </div>
          <Button type="submit" disabled={loading || !city.trim()}>
            {loading ? "Mencari..." : "Cari"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Contoh: Jakarta, Bandung, Surabaya, Yogyakarta, Makassar
        </p>
      </div>
    </form>
  );
};

export default SearchBox;
