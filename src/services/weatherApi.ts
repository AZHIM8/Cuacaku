
// API weatherapi.com menyediakan akses gratis dengan batas 1 juta panggilan per bulan
const API_KEY = "b02b84c7e1154f77a9210654251603"; // API key dari weatherapi.com
const BASE_URL = "https://api.weatherapi.com/v1";

export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
  };
}

/**
 * Mengambil data cuaca untuk kota yang ditentukan
 * @param city Nama kota di Indonesia (misalnya: Jakarta, Surabaya)
 * @returns Data cuaca terkini
 */
export const fetchWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${city}&lang=id`
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Kota tidak ditemukan. Coba nama kota lain.");
      } else if (response.status === 401 || response.status === 403) {
        throw new Error("API key tidak valid. Silakan periksa kembali API key Anda.");
      }
      throw new Error("Terjadi kesalahan saat mengambil data cuaca.");
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Terjadi kesalahan yang tidak diketahui.");
  }
};
