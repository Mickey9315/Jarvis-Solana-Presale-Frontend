import classes from "./connectButton.module.scss";

export default function ConnectButton({ className }) {
  return (
    <button className={`${classes.connect__button} ${className}`}>
      CONNECT
    </button>
  );
}
