import React, { useState, useEffect } from "react";
import styles from "./index.css";

const RangeSlider = (props) => {
  const {
    label = "字体大小",
    min = 12,
    max = 100,
    value = 20,
    labelWidth = 62,
    onChange = () => {},
  } = props;
  const [rangeValue, setRangeValue] = useState(value);

  useEffect(() => {
    if (value !== rangeValue) {
      setRangeValue(rangeValue);
    }
  }, [value]);

  const handleChange = (event) => {
    let changeValue = event.target.value;
    setRangeValue(changeValue);
    onChange(changeValue);
  };

  const handleBlur = (event) => {
    let changeValue = event.target.value;
    if (changeValue < min) {
      changeValue = min;
    }
    if (changeValue > max) {
      changeValue = max;
    }
    setRangeValue(changeValue);
    onChange(changeValue);
  };

  return (
    <div className={styles.range_flex}>
      <div className={styles.range_label} style={{ width: labelWidth, textAlign: 'center' }}>
        {label}
      </div>
      <div className={styles.range_item}>
        <input
          type="range"
          min={min}
          max={max}
          value={rangeValue}
          className={styles.range_input}
          onChange={handleChange}
        />
      </div>
      <div className={styles.range_item_input}>
        <input
          type="number"
          value={rangeValue}
          className={styles.input}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};

export default RangeSlider;
