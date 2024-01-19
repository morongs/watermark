import React from "react";
import styles from "./Main.css";

const Button = (props) => {
  const { children, onClick } = props;
  return <button className={styles.button} onClick={onClick}>{children}</button>;
  // return (
  //   <Block
  //     horizontal="center"
  //     vertical="center"
  //     style={{
  //       userSelect: "none",
  //       cursor: "pointer",
  //       marginRight: 15,
  //       background: "#1B9AF7",
  //       height: 45,
  //       padding: "0 20px",
  //       color: "#fff",
  //       borderRadius: 4
  //     }}
  //     {...this.props}
  //   />
  // );
};

export default Button;
