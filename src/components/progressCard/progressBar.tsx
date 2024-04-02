import { useContext } from "react";
import classes from "./progressBar.module.scss";

import { PersonalInfoContext } from "../../web3/PersonalInfo";

export default function ProgressBar() {
  const { poolState } = useContext(PersonalInfoContext);
  const percentage = (poolState.raised / poolState.hardcap) * 100;
  return (
    <div className={classes.progress__bar__wrapper}>
      <div className={classes.progress__bar__text__wrapper}>
        <p className={classes.progress__bar__text}>
          {poolState.raised} / {poolState.hardcap} SOL
        </p>
        <p className={classes.progress__bar__text}>Progress {percentage}%</p>
      </div>
      <div className={classes.progress__bar__container}>
        <div className={classes.progress__bar}>
          <div
            className={classes.progress__bar__inner}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
