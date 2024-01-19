import React from "react";
// import GitHup from "./GitHup";
import Block from "dxc-flex";
import Main from "./Main/Main";
import Donation from "./Donation/Donation";
// import qqShare from "qq-share";
// qqShare({
//   title: "身份证盗用所造成的损失，你想象不到！",
//   desc: "这是一款最安全，最快速的纯前端图片加水印，拒绝上传保证个人信息安全。",
//   imgUrl: "https://oss.tuobacco.com/wop2/2018-06-01/5b10dde28a12d.jpg",
// });
export default class IndexPage extends React.Component {
  render() {
    return (
      <div style={{ padding: "30px 15px" }}>
        <div
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 5,
          }}
        >
          最安全，最快速的纯前端图片加水印
        </div>
        <div
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 15,
            color: "red",
          }}
        >
          不上传任何文件，保证个人信息安全
        </div>
        <Block
          horizontal="center"
          style={{ fontSize: 16, fontWeight: 700, marginTop: 15 }}
        >
          主要用途
        </Block>
        <Block style={{ margin: "15px 0" }} horizontal="center">
          在各种证件上添加“仅用于办理XXXX，他用无效。”，防止证件被他人盗用！
        </Block>
        <Block horizontal="center" style={{ marginBottom: 10 }}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1b9af7" }}
            href="https://www.gov.cn/xinwen/2014-09/04/content_2745541.htm"
          >
            参考：不加签注，身份证复印件会让你“危机四伏”
          </a>
        </Block>
        <Block horizontal="center">
          温馨提示：本项目支持批量上传图片添加水印，下载为zip包，手机微信可使用《金山文档》小程序在线解压缩，手机浏览器有自带解压缩，点击保存图片后稍等片刻即下载。
        </Block>
        <Main />
        <Donation />
      </div>
    );
  }
}
