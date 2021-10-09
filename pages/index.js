import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const calculateTimeLeft = () => {
    const arrivalDate = new Date(2021, 9, 12, 18, 0, 1).getTime();
    const now = Date.now();
    const difference = arrivalDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        giorni: Math.floor(difference / (1000 * 60 * 60 * 24)),
        ore: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minuti: Math.floor((difference / 1000 / 60) % 60),
        secondi: Math.floor((difference / 1000) % 60),
      };
    }
    console.log({ timeLeft });
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval, index) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={index}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>👰🏻‍♀️🤵🏻‍♂️ 10/10/2021 🎉❤️</title>
        <meta name="description" content="Regalo per Luca & Rosa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="title">
          <em>
            Vi aspetta un viaggio nel quotidiano,
            <br />
            dove tutto succede sempre,
            <br />
            ma in modo differente.
          </em>
        </h1>
        {timerComponents.length > 0 && (
          <h2 className={styles.timer}>{timerComponents}</h2>
        )}

        {timerComponents.length === 0 && (
          <>
            <h2 className={styles.regalo}>🎁</h2>
            <Image
              src="/LaBuca-white.svg"
              alt="Ristorante La Buca"
              width="150"
              height="75"
            />
          </>
        )}
      </main>

      <footer className={styles.footer}>by Nico & Marion ❤️ </footer>
    </div>
  );
}
