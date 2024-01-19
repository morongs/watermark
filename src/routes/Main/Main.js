import React from "react";
import Upload, { filesToDataURL } from "dxc-upload";
import Watermark from "./Watermark";
import Block from "dxc-flex";
import Button from "./Button";
import { Input, normalize } from "dxc-input";
import ColorPicker from "./ColorPicker";
import Alpha from "./Alpha";
import example from "./example.jpg";
import styles from "./Main.css";
import RangeSlider from "../../components/RangeSlider/RangeSlider";

const labelWidth = 72;

export default class Main extends React.Component {
  state = {
    isExist: true,
    text: "仅用于办理住房公积金，他用无效。",
    hex: "#000000",
    rgb: { r: 0, g: 0, b: 0, a: 0.4 },
    fontSize: 22,
    watermarkWidth: 350,
    watermarkHeight: 180,
  };
  componentDidMount() {
    this.watermark = new Watermark(this.mainCanvas);
    this.setOptions();
    this.watermark.draw(example);
  }
  onChangeFile = (files) => {
    filesToDataURL(files).then((dataUrls) => {
      this.watermark.draw(dataUrls[0]);
      this.setState({ isExist: true });
    });
  };
  rotate = () => {
    this.watermark.rotate();
  };
  save = () => {
    this.watermark.save();
  };
  setOptions = () => {
    const { text, rgb, fontSize, watermarkWidth, watermarkHeight } = this.state;
    const fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
    this.watermark.setOptions({
      text,
      fillStyle,
      fontSize,
      watermarkWidth,
      watermarkHeight,
    });
  };
  onChangeText = (key, value) => {
    this.setState({ [key]: value }, () => {
      this.setOptions();
    });
  };
  onChangeColor = ({ rgb, hex }) => {
    rgb.a = this.state.rgb.a;
    this.setState({ rgb, hex }, () => {
      this.setOptions();
    });
  };
  onChangeAlpha = (color) => {
    const { rgb, hex } = color;
    this.setState({ rgb, hex }, () => {
      this.setOptions();
    });
  };
  renderControl = () => {
    const {
      isExist,
      text,
      hex,
      rgb,
      fontSize,
      watermarkHeight,
      watermarkWidth,
    } = this.state;
    return (
      <Block horizontal="center">
        <div style={{ width: 345 }}>
          <Block>
            <Upload onChange={this.onChangeFile}>
              <Button>选择文件</Button>
            </Upload>
            {isExist ? <Button onClick={this.rotate}>旋转</Button> : null}
            {isExist ? <Button onClick={this.save}>保存</Button> : null}
          </Block>
          <Input
            labelWidth={labelWidth}
            style={{ marginTop: 15 }}
            maxLength={130}
            value={text}
            onChange={this.onChangeText.bind(this, "text")}
            label="水印文案:"
          />

          <ColorPicker
            labelWidth={labelWidth}
            color={hex}
            onChange={this.onChangeColor}
          />
          <Alpha
            labelWidth={labelWidth}
            color={rgb}
            onChange={this.onChangeAlpha}
          />
          <RangeSlider
            label="字体大小:"
            min={10}
            max={80}
            value={fontSize}
            labelWidth={labelWidth}
            onChange={this.onChangeText.bind(this, "fontSize")}
          />
          <RangeSlider
            label="水印框宽:"
            min={100}
            max={1000}
            value={watermarkWidth}
            labelWidth={labelWidth}
            onChange={this.onChangeText.bind(this, "watermarkWidth")}
          />
          <RangeSlider
            label="水印框高:"
            min={100}
            max={1000}
            value={watermarkHeight}
            labelWidth={labelWidth}
            onChange={this.onChangeText.bind(this, "watermarkHeight")}
          />
        </div>
      </Block>
    );
  };
  render() {
    return (
      <Block className={styles.main_box} style={{ marginTop: 30 }}>
        {this.renderControl()}
        <div className={styles.canvas_box} style={{ flex: 1, minWidth: 345 }}>
          <canvas
            style={{ width: "100%" }}
            ref={(mainCanvas) => (this.mainCanvas = mainCanvas)}
          />
        </div>
      </Block>
    );
  }
}
