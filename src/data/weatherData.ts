
// This would ideally come from a real weather API
export interface WeatherData {
  location: string;
  current: {
    temp: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    icon: string;
  };
  forecast: ForecastDay[];
}

export interface ForecastDay {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  precipitation: number;
  icon: string;
}

export const mockWeatherData: WeatherData = {
  location: "General Santos City",
  current: {
    temp: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 10,
    icon: "partly-cloudy"
  },
  forecast: [
    {
      date: "2023-10-01",
      maxTemp: 29,
      minTemp: 22,
      condition: "Sunny",
      precipitation: 0,
      icon: "sunny"
    },
    {
      date: "2023-10-02",
      maxTemp: 30,
      minTemp: 23,
      condition: "Partly Cloudy",
      precipitation: 10,
      icon: "partly-cloudy"
    },
    {
      date: "2023-10-03",
      maxTemp: 27,
      minTemp: 22,
      condition: "Rain Showers",
      precipitation: 40,
      icon: "rain"
    },
    {
      date: "2023-10-04",
      maxTemp: 26,
      minTemp: 21,
      condition: "Thunderstorms",
      precipitation: 80,
      icon: "thunderstorm"
    },
    {
      date: "2023-10-05",
      maxTemp: 28,
      minTemp: 22,
      condition: "Partly Cloudy",
      precipitation: 20,
      icon: "partly-cloudy"
    }
  ]
};

export const getGardeningWeatherRecommendations = (weatherData: WeatherData): string[] => {
  const recommendations: string[] = [];
  
  // Temperature-based recommendations
  if (weatherData.current.temp > 30) {
    recommendations.push("High temperatures today - water plants in the early morning or evening to reduce evaporation.");
    recommendations.push("Consider providing shade for sensitive plants during the hottest part of the day.");
  } else if (weatherData.current.temp < 10) {
    recommendations.push("Cold temperatures expected - protect sensitive plants with covers or bring containers indoors.");
  }
  
  // Precipitation-based recommendations
  const upcomingRain = weatherData.forecast.slice(0, 3).some(day => day.precipitation > 30);
  if (upcomingRain) {
    recommendations.push("Rain expected in the next few days - hold off on watering and consider postponing fertilization.");
  } else if (weatherData.forecast.every(day => day.precipitation < 20)) {
    recommendations.push("Dry conditions expected for the week - ensure adequate watering, especially for container plants.");
  }
  
  // Wind-based recommendations
  if (weatherData.current.windSpeed > 15) {
    recommendations.push("Windy conditions today - check supports for climbing plants and consider protecting seedlings.");
  }
  
  // Humidity-based recommendations
  if (weatherData.current.humidity > 80) {
    recommendations.push("High humidity - monitor plants for fungal diseases and ensure good air circulation.");
  } else if (weatherData.current.humidity < 30) {
    recommendations.push("Low humidity - consider misting sensitive plants and grouping containers to increase local humidity.");
  }
  
  // If no specific recommendations, add general ones
  if (recommendations.length === 0) {
    recommendations.push("Ideal growing conditions today - a great time for general garden maintenance.");
    recommendations.push("Perfect weather for starting seeds or transplanting seedlings.");
  }
  
  return recommendations;
};
