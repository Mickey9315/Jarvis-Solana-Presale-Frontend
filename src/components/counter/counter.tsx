import classes from "./counter.module.scss";
import { useState, useEffect } from "react";

type TimeLeft = {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};

type CounterProps = {
  targetDate: string;
};

export default function Counter({ targetDate }: CounterProps): JSX.Element {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [time, setTime] = useState<TimeLeft>({});

  useEffect(() => {
    setTime(calculateTimeLeft());

    const timer = setInterval(() => {
      setTime(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={classes.counter}>
      <div className={classes.counter__wrapper}>
        <div className={classes.counter__title__wrapper}>
          <p className={classes.counter__title}>REGISTRATION STARTS IN</p>
          <p>14 Apr 2024, 1PM UTC</p>
        </div>
        <div className={classes.counter__time__wrapper}>
          <div className={classes.counter__digit__wrapper}>
            <p className={classes.counter__data}>{time.days}</p>
            <p className={classes.counter__text}>Days</p>
          </div>
          <div className={classes.counter__digit__wrapper}>
            <p className={classes.counter__data}>{time.hours}</p>
            <p className={classes.counter__text}>Hours</p>
          </div>
          <div className={classes.counter__digit__wrapper}>
            <p className={classes.counter__data}>{time.minutes}</p>
            <p className={classes.counter__text}>Minutes</p>
          </div>
          <div className={classes.counter__digit__wrapper}>
            <p className={classes.counter__data}>{time.seconds}</p>
            <p className={classes.counter__text}>Seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
}
