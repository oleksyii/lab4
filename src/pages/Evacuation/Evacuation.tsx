import { useState } from "react";
import styles from "./Evacuation.module.css";
import { Link } from "react-router-dom";
import { useWeather, Criteria } from "../../WeatherContext";

interface EvacuationTransportProps {
  name: string;
  capacity: number;
  minAmount: number;
  maxAmount: number;
  imageUrl: string;
}

const initialCriteria: Criteria = {
  waterLevel: "",
  temperature: "",
  snow: "",
  rain: "",
};

function Evacuation() {
  const [numberOfPeople, setNumberOfPeople] = useState<number>(0);
  const { weatherCriteria, updateCriteria } = useWeather();

  // Function to calculate width based on input length
  const calculateWidth = (inputLength: number) => {
    // Minimum width is 120px, and each character adds an additional 10px
    const minWidth = 10;
    const widthPerChar = 10;
    return Math.max(minWidth, inputLength * widthPerChar);
  };

  const transports: EvacuationTransportProps[] = [
    {
      name: "Daevo Lanos",
      capacity: 4,
      minAmount: 1,
      maxAmount: 50,
      imageUrl: "/small_car.png",
    },
    {
      name: "Рено Мастер",
      capacity: 8,
      minAmount: 1,
      maxAmount: 200,
      imageUrl: "/medium_car.png",
    },
    {
      name: "Вантажний автомобіль ГАЗ-66",
      capacity: 20,
      minAmount: 1,
      maxAmount: 100,
      imageUrl: "/truck.png",
    },
    {
      name: "ПАЗ-3205",
      capacity: 40,
      minAmount: 1,
      maxAmount: 300,
      imageUrl: "/trailer.png",
    },
    {
      name: "БАЗ ʼВолошкаʼ",
      capacity: 45,
      minAmount: 1,
      maxAmount: 300,
      imageUrl: "/bus.png",
    },
    {
      name: "Гелікоптер МІ-8",
      capacity: 16,
      minAmount: 1,
      maxAmount: 10,
      imageUrl: "/helicopter.png",
    },
    {
      name: "Потяг ʼДніпроʼ",
      capacity: 40,
      minAmount: 1,
      maxAmount: 18,
      imageUrl: "/train.png",
    },
    {
      name: "Санітарний катер ʼЮний Орелʼ",
      capacity: 18,
      minAmount: 1,
      maxAmount: 10,
      imageUrl: "/boat.png",
    },
  ];

  function calculateR(
    transports: EvacuationTransportProps[],
    numberOfPeople: number
  ): number {
    let numerator = 0;
    let denominator = 0;

    transports.forEach((transport) => {
      const { capacity, minAmount, maxAmount } = transport;
      numerator += capacity * maxAmount - capacity * minAmount;
      denominator += capacity * minAmount;
    });

    if (numberOfPeople - denominator === 0) {
      return 0;
    }

    return numerator / (numberOfPeople - denominator);
  }

  const r = calculateR(transports, numberOfPeople);
  console.log("r:", r);

  function calculateK(transport: EvacuationTransportProps, r: number): number {
    const { minAmount, maxAmount } = transport;
    return (maxAmount + (r - 1) * minAmount) / r;
  }

  const KValues: number[] = transports.map((transport) => {
    const K = calculateK(transport, r);
    return K;
  });

  console.log("K Values:", KValues);
  const roundedKValues: number[] = KValues.map((value) => Math.round(value));

  const handleBakcClick = () => {
    updateCriteria(initialCriteria);
  };

  const totalTransportCapacity = transports.reduce(
    (acc, transport) => acc + transport.capacity * transport.maxAmount,
    0
  );

  const [showCapacityExceeded, setShowCapacityExceeded] =
    useState<boolean>(false);
  const handleCloseClick = () => {
    setShowCapacityExceeded(false);
  };
  return (
    <div className={styles.container}>
      {/* style={{ color: "white" }} */}
      <h1 className={styles.darkBgContainer}>Планування евакуації</h1>
      <div className={styles.evacuationContainer}>
        {numberOfPeople > totalTransportCapacity && (
          <h2 style={{ color: "red", fontWeight: "600" }}>
            Кількість людей для евакуації перевищує загальну місткість усіх
            транспортних засобів.
          </h2>
        )}
        <div className={styles.header}>
          <h3 className={styles.subtitle}>Кількість людей для евакуації</h3>
          <input
            type="number"
            className={styles.input}
            style={{
              width: `${calculateWidth(numberOfPeople.toString.length)}px`,
              // color:'black'
          }}
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
          />
        </div>
        {numberOfPeople != 0 && (
          <h3 className={styles.r}>
            r – коефіцієнт розбиття області обмежень = {r}
          </h3>
        )}
        {}
        <div className={styles.mainContentContainer}>
          <div className={styles.infoTableContainer}>
            <table>
              <thead>
                <tr>
                  <th>Назва</th>
                  <th>Місткість</th>
                  <th>Мін кількість</th>
                  <th>Макс кількість</th>
                  <th>Використано</th>
                  <th>Використана місткість</th>
                  <th>Макс місткість</th>
                </tr>
              </thead>
              <tbody>
                {transports.map((transport, index) => {
                  const required = roundedKValues[index];
                  return (
                    <tr key={index}>
                      <td>{transport.name}</td>
                      <td>{transport.capacity}</td>
                      <td>{transport.minAmount}</td>
                      <td>{transport.maxAmount}</td>
                      <td>{required}</td>
                      <td>{transport.capacity * required}</td>
                      <td>{transport.capacity * transport.maxAmount}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td>Сума</td>
                  <td></td>
                  <td></td>
                  <td>
                    {transports.reduce(
                      (acc, transport) => acc + transport.maxAmount,
                      0
                    )}
                  </td>
                  <td>{roundedKValues.reduce((acc, val) => acc + val, 0)}</td>
                  <td>
                    {transports.reduce(
                      (acc, transport, index) =>
                        acc + transport.capacity * roundedKValues[index],
                      0
                    )}
                  </td>
                  <td>
                    {transports.reduce(
                      (acc, transport) =>
                        acc + transport.capacity * transport.maxAmount,
                      0
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.transportContainer}>
            {transports.map((transport, index) => {
              const required = roundedKValues[index];
              return (
                <div key={index} className={styles.transportInfo}>
                  <p className={styles.title}>{transport.name}</p>
                  <img src={transport.imageUrl} />
                  <p>
                    {transport.capacity} x {required} одиниць
                  </p>
                  <p>Загальна місткість: {transport.capacity * required}</p>
                </div>
              );
            })}
          </div>
        </div>
        <Link to="/" onClick={handleBakcClick}>
          <button className={styles.backButton}>До погоди</button>
        </Link>
      </div>
    </div>
  );
}

export default Evacuation;
