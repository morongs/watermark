import React from "react";
import Watermark from "./Watermark";
import Block from "dxc-flex";
import Button from "./Button";
import { Input } from "dxc-input";
import ColorPicker from "./ColorPicker";
import Alpha from "./Alpha";
import example from "./example.jpg";
import styles from "./Main.css";
import Upload from "../../components/Upload";
import RangeSlider from "../../components/RangeSlider/RangeSlider";
import { filesToDataURL } from "../../utils/utils";

const labelWidth = 72;

export default class Main extends React.Component {
  watermark = [];
  mainCanvas = [];
  state = {
    isExist: true,
    text: "仅用于办理住房公积金，他用无效。",
    hex: "#000000",
    rgb: { r: 0, g: 0, b: 0, a: 0.4 },
    fontSize: 22,
    watermarkWidth: 350,
    watermarkHeight: 180,
    fileNumber: 1,
  };
  componentDidMount() {
    this.watermark = [new Watermark(this.mainCanvas[0])];
    this.setOptions();
    this.watermark[0].draw(example);
  }
  onChangeFile = (files) => {
    if (files.length > 1) {
      // 设置多个canvas
      this.setState(
        {
          fileNumber: files.length,
        },
        () => {
          this.watermark = [];
          // 遍历设置画布水印数据
          files.forEach((item, i) => {
            this.watermark.push(new Watermark(this.mainCanvas[i]));
          });
          this.getDataURL(files);
        }
      );
    } else {
      this.getDataURL(files);
    }
  };
  getDataURL = (files) => {
    filesToDataURL(files).then((dataUrls) => {
      // 有多个文件
      if (dataUrls.length > 1) {
        dataUrls.forEach((item, index) => {
          // 渲染
          this.watermark[index].draw(item);
        });
      } else {
        this.watermark[0].draw(dataUrls[0]);
      }
      this.setState({ isExist: true });
    });
  };
  rotate = () => {
    if (this.watermark.length > 1) {
      this.watermark.forEach((item) => {
        item.rotate();
      });
    } else {
      this.watermark[0].rotate();
    }
  };
  save = async () => {
    if (this.watermark.length > 1) {
      for (let index = 0; index < this.watermark.length; index++) {
        await this.watermark[index].save();
      }
    } else {
      await this.watermark[0].save();
    }
  };
  setOptions = (index = 0) => {
    const { text, rgb, fontSize, watermarkWidth, watermarkHeight } = this.state;
    const fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
    const options = {
      text,
      fillStyle,
      fontSize,
      watermarkWidth,
      watermarkHeight,
    };
    if (this.watermark.length > 1) {
      this.watermark.forEach((item) => {
        item.setOptions(options);
      });
    } else {
      this.watermark[index].setOptions(options);
    }
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
      <Block
        horizontal="center"
        style={{
          // position: "sticky",
          // top: "0",
          // background: "#fff",
          paddingTop: "20px",
        }}
      >
        <div style={{ width: 345 }}>
          <Block>
            <Upload multiple onChange={this.onChangeFile}>
              <Button>选择文件</Button>
            </Upload>
            {isExist ? <Button onClick={this.rotate}>旋转图片</Button> : null}
            {isExist ? (
              <Button
                onClick={() => {
                  this.save();
                }}
              >
                保存图片
              </Button>
            ) : null}
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
    const { fileNumber } = this.state;
    const list = Array(fileNumber).fill(1);
    return (
      <Block className={styles.main_box}>
        {this.renderControl()}
        <div
          className={styles.canvas_box}
          style={{ flex: 1, minWidth: 345, paddingTop: "20px" }}
        >
          {list.map((item, i) => (
            <canvas
              key={i}
              style={{ width: "100%" }}
              ref={(mainCanvas) => (this.mainCanvas[i] = mainCanvas)}
            />
          ))}
        </div>
      </Block>
    );
  }
}
