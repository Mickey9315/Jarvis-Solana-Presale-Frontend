import classes from "./connectButton.module.scss";
import React from "react";

type ConnectButtonProps = {
  children: React.ReactNode;
  className?: string;
  handleClick?: () => void;
};

export default function ConnectButton({
  children,
  className = "",
  handleClick,
}: ConnectButtonProps) {

  return (
    <button
      onClick={handleClick}
      className={`${classes.connect__button} ${className}`}
    >
      {children}
    </button>
  );
}
