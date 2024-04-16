import { useEffect, useState } from "react";
import styles from "./AlertModal.module.css";
import { Link } from "react-router-dom";

interface AlertModalProps {
  title: string;
  imageUrl: string;
  soundUrl: string;
  show: boolean;
  setShow: (show: boolean) => void;
}

function AlertModal({
  title,
  imageUrl,
  soundUrl,
  show,
  setShow,
}: AlertModalProps) {
  useEffect(() => {
    const audio = new Audio(soundUrl);
    audio.play();
  }, [soundUrl]);

  const toggleVisibility = () => {
    setShow(!show);
  };

  return (
    <>
      {show && (
        <div className={styles.background}>
          <div className={styles.container}>
            <h1>УВАГА!</h1>
            <h2>{title}</h2>
            <img src={imageUrl} alt="alertImage" />
            {title === "Евакуювати" ? (
              <Link to="/evacuation">
                <button
                  className={styles.planButton}
                  onClick={toggleVisibility}
                >
                  Спланувати евакуацію
                </button>
              </Link>
            ) : (
              <button className={styles.okButton} onClick={toggleVisibility}>
                Добре
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AlertModal;
