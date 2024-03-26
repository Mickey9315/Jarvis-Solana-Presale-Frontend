import classes from "./connectButton.module.scss";

export default function ConnectButton({ children, className, handleClick }) {
  return (
    <button
      onClick={handleClick}
      className={`${classes.connect__button} ${className}`}
    >
      {children}
    </button>
  );
}
