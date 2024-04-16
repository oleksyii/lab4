import React, { createContext, useContext, useState } from "react";

export interface Criteria {
  waterLevel: string;
  temperature: string;
  snow: string;
  rain: string;
}

interface WeatherContext {
  updateCriteria: (criteria: Criteria) => void;
  weatherCriteria: Criteria;
}

const WeatherContext = createContext<WeatherContext | undefined>(undefined);

export const useWeather = (): WeatherContext => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [weatherCriteria, setWeatherCriteria] = useState<Criteria>({
    waterLevel: "",
    temperature: "",
    snow: "",
    rain: "",
  });

  const updateCriteria = (newCriteria: Criteria) => {
    setWeatherCriteria(newCriteria);
  };

  return (
    <WeatherContext.Provider value={{ updateCriteria, weatherCriteria }}>
      {children}
    </WeatherContext.Provider>
  );
};
