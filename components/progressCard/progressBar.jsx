import classes from "./progressBar.module.scss";

export default function ProgressBar() {
  return (
    <div className={classes.progress__bar__wrapper}>
      <div className={classes.progress__bar__text__wrapper}>
        <p className={classes.progress__bar__text}>800 / 1000 SOL</p>
        <p className={classes.progress__bar__text}>Progress 80%</p>
      </div>
      <div className={classes.progress__bar__container}>
        <div className={classes.progress__bar}>
          <div className={classes.progress__bar__inner}></div>
        </div>
      </div>
    </div>
  );
}
