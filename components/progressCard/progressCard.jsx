import Image from "next/image";
import classes from "./progressCard.module.scss";

// logo image
import logoImage from "@/assets/logo-small.png";

// components
import ConnectButton from "../connectButton/connectButton";
import ProgressBar from "./progressBar";

export default function ProgressCard() {
  return (
    <div className={classes.progress__meter__outer__wrapper}>
      <div className={classes.progress__meter}>
        <div className={classes.progress__total__wrapper}>
          <p className={classes.progress__total__title}>TOTAL RAISED</p>
          <div className={classes.progress__total__sol}>
            <Image
              className={classes.progress__total__logo__image}
              src={logoImage}
              alt="logo"
            />
            <span className={classes.progress__total__amount}>800 SOL</span>
          </div>
        </div>
        <ProgressBar />
        <ConnectButton className={classes.progress__card__connect__button} />
      </div>
    </div>
  );
}
