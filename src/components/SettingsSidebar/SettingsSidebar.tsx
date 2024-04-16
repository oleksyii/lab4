import React, { useState } from "react";
import styles from "./SettingsSidebar.module.css";
import { useWeather } from "../../WeatherContext";

interface CriteriaOption {
  label: string;
  key: keyof Criteria;
  values: string[];
}

export interface Criteria {
  waterLevel: string;
  temperature: string;
  snow: string;
  rain: string;
}

const criteriaOptions: Criteria[] = [
  { waterLevel: "Високий", temperature: "", snow: "", rain: "Сильний" },
  {
    waterLevel: "Високий",
    temperature: "Висока",
    snow: "Багато",
    rain: "Помірний",
  },
  {
    waterLevel: "Високий",
    temperature: "Середня",
    snow: "Багато",
    rain: "Помірний",
  },
  {
    waterLevel: "Високий",
    temperature: "Середня",
    snow: "Багато",
    rain: "Немає",
  },
  { waterLevel: "Високий", temperature: "Висока", snow: "Мало", rain: "Немає" },
  {
    waterLevel: "Помірний",
    temperature: "Висока",
    snow: "Багато",
    rain: "Сильний",
  },
  {
    waterLevel: "Помірний",
    temperature: "Середня",
    snow: "Багато",
    rain: "Сильний",
  },
  { waterLevel: "Помірний", temperature: "", snow: "Мало", rain: "Сильний" },
  { waterLevel: "Високий", temperature: "", snow: "", rain: "Помірний" },
];

const SettingsSidebar: React.FC = () => {
  const { updateCriteria } = useWeather();

  const handleSelectChange = (selectedCriteria: Criteria) => {
    updateCriteria(selectedCriteria);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Таблиця вирішуючих фактів</h1>
        <img src="/settings.png" height={"32px"} alt="setting" />
      </div>
      <div className={styles.settingsContainer}>
        <select
          value=""
          onChange={(e) => {
            const selectedOption = criteriaOptions[e.target.selectedIndex - 1];
            handleSelectChange(selectedOption);
          }}
          className={styles.select}
        >
          <option value="" disabled hidden>
            Оберіть комбінацію погоди
          </option>
          {criteriaOptions.map((criteria, index) => (
            <option
              key={index}
            >{`Вода: ${criteria.waterLevel}, Температура: ${criteria.temperature}, Сніг: ${criteria.snow}, Дощ: ${criteria.rain}`}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SettingsSidebar;
