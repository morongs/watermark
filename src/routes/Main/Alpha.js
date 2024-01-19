import React from "react";
import Block from "dxc-flex";
import { AlphaPicker } from "react-color";

export default class Alpha extends React.Component {
  render() {
    const { color, onChange, labelWidth } = this.props;
    return (
      <Block style={{ marginTop: 15 }}>
        <div style={{ width: labelWidth, textAlign: 'center', marginRight: 20 }}>透明度:</div>
        <AlphaPicker onChange={onChange} color={color} />
      </Block>
    );
  }
}
