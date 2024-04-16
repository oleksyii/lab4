import React from "react";
import styles from "./Weather.module.css";
import SettingsSidebar from "../../components/SettingsSidebar/SettingsSidebar";
import { useWeather, Criteria } from "../../WeatherContext";
import AlertModal from "../../components/AlertModal/AlertModal";
import { useEffect, useState } from "react";

const labelMapping: { [key: string]: string } = {
  waterLevel: "Рівень води",
  temperature: "Температура",
  snow: "Сніг",
  rain: "Дощ",
};
const initialCriteria: Criteria = {
  waterLevel: "",
  temperature: "",
  snow: "",
  rain: "",
};

function Weather() {
  const { weatherCriteria, updateCriteria } = useWeather();

  const [showAttentionModal, setShowAttentionModal] = useState(false);
  const [showEvacuationModal, setShowEvacuationModal] = useState(false);

  useEffect(() => {
    updateCriteria(initialCriteria);
  }, []);

  useEffect(() => {
    if (
      weatherCriteria.waterLevel === "Високий" &&
      ((weatherCriteria.temperature === "Висока" &&
        weatherCriteria.snow === "Багато" &&
        weatherCriteria.rain === "Помірний") ||
        (weatherCriteria.temperature === "" &&
          weatherCriteria.snow === "" &&
          weatherCriteria.rain === "Сильний"))
    ) {
      setShowEvacuationModal(true);
    }

    // Show/hide attention modal based on weather criteria
    if (
      (weatherCriteria.waterLevel === "Високий" &&
        weatherCriteria.temperature === "Середня" &&
        weatherCriteria.snow === "Багато" &&
        weatherCriteria.rain === "Помірний") ||
      (weatherCriteria.waterLevel === "Помірний" &&
        weatherCriteria.temperature === "Висока" &&
        weatherCriteria.snow === "Багато" &&
        weatherCriteria.rain === "Сильний")
    ) {
      setShowAttentionModal(true);
    }
  }, [weatherCriteria]);

  return (
    <div className={styles.container}>
      <SettingsSidebar />
      <div className={styles.weatherVisualizationContainer}>
        <h1>Погода</h1>
        <div className={styles.weatherContainer}>
          {Object.entries(weatherCriteria).map(
            ([key, value], index) =>
              value && ( // Check if value is not empty string
                <div className={styles.weatherItem} key={index}>
                  <p className={styles.valueHeader}>
                    {labelMapping[key as keyof typeof labelMapping]}
                  </p>
                  {labelMapping[key as keyof typeof labelMapping] ===
                  "Рівень води" ? (
                    <img
                      src={
                        value === "Високий"
                          ? "water_high.png"
                          : "water_normal.png"
                      }
                      className={styles.weatherImage}
                    />
                  ) : labelMapping[key as keyof typeof labelMapping] ===
                    "Температура" ? (
                    <img
                      src={
                        value === "Висока" ? "high_temp.png" : "normal_temp.png"
                      }
                      className={styles.weatherImage}
                    />
                  ) : labelMapping[key as keyof typeof labelMapping] ===
                    "Сніг" ? (
                    <img
                      src={
                        value === "Багато" ? "heavy_snow.png" : "light_snow.png"
                      }
                      className={styles.weatherImage}
                    />
                  ) : (
                    <img
                      src={
                        value === "Сильний"
                          ? "heavy_rain.png"
                          : value === "Помірний"
                          ? "light_rain.png"
                          : "sun.png"
                      }
                      className={styles.weatherImage}
                    />
                  )}
                  <p>{value}</p>
                </div>
              )
          )}
        </div>
      </div>
      {showAttentionModal && (
        <AlertModal
          title="Посилити увагу"
          imageUrl="/medium_alert.png"
          soundUrl="/notification.mp3"
          show={showAttentionModal}
          setShow={setShowAttentionModal}
        />
      )}
      {showEvacuationModal && (
        <AlertModal
          title="Евакуювати"
          imageUrl="/high_alert.png"
          soundUrl="/evacuation.mp3"
          show={showEvacuationModal}
          setShow={setShowEvacuationModal}
        />
      )}
    </div>
  );
}

export default Weather;
