import React from "react";
import styles from "./Main.css";

const Button = (props) => {
  const { children, onClick } = props;
  return <button className={styles.button} onClick={onClick}>{children}</button>;
};

export default Button;
