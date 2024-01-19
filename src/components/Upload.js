import React, { Component } from "react";

class Upload extends Component {
  static defaultProps = {
    paste: true, //是否支持粘贴
    drop: true, //是否支持拖拽
    domain: "document", //域 document或者self 指drop或paste在什么域上
    accept: "image/png,image/gif,image/jpeg", //允许上传文件格式
    multiple: false,
    onError: msg => {
      console.error(msg);
    },
    onChange: () => {}
  };

  componentDidMount() {
    const { paste, drop, domain } = this.props;
    let dom = null;
    if (domain === "document") {
      dom = document;
    } else {
      dom = this.refs.self;
    }

    if (drop) {
      this.stopBrowserAction = e => {
        e.stopPropagation();
        e.preventDefault();
      };
      //阻止浏览器默行为。
      document.addEventListener("dragover", this.stopBrowserAction);
      document.addEventListener("drop", this.stopBrowserAction);
      this.dropEvent = e => {
        e.stopPropagation();
        e.preventDefault();
        this.drop(e);
      };
      //添加拖拽事件
      dom.addEventListener("drop", this.dropEvent);
    }
    if (paste) {
      this.pasteEvent = e => {
        this.paste(e);
      };
      dom.addEventListener("paste", this.pasteEvent);
    }
  }

  //组件移除前调用。
  componentWillUnmount() {
    const { domain } = this.props;
    let dom = null;
    if (domain === "document") {
      dom = document;
    } else {
      dom = this.refs.self;
    }
    document.removeEventListener("dragover", this.stopBrowserAction);
    document.removeEventListener("drop", this.stopBrowserAction);
    dom.removeEventListener("drop", this.dropEvent);
    dom.removeEventListener("paste", this.pasteEvent);
  }

  //过滤
  filter(file) {
    const { accept } = this.props;
    if (!accept || accept === "") {
      return true;
    }
    if (!file.type || file.type === "") {
      return false;
    }
    const index = accept.indexOf(file.type);
    if (index < 0) {
      return false;
    }
    return true;
  }

  //拖拽
  drop(e) {
    const fileList = e.dataTransfer.files;
    if (!fileList || !fileList.length) return;
    const files = [];
    for (let i = 0, item; (item = fileList[i]); i++) {
      if (this.filter(item)) {
        files.push(item);
      }
    }
    const { onChange, onError } = this.props;
    if (files.length === 0) {
      onError("文件类型错误!");
      return false;
    }
    onChange(files);
  }

  //粘贴
  paste(e) {
    if (e.clipboardData && e.clipboardData.items && e.clipboardData.items.length) {
      const files = [];
      for (let i = 0, item; (item = e.clipboardData.items[i]); i++) {
        if (this.filter(item)) {
          files.push(item.getAsFile());
        }
      }
      const { onChange, onError } = this.props;
      if (files.length === 0) {
        onError("文件类型错误!");
        return false;
      }
      onChange(files);
    }
  }

  onClick() {
    this.refs.inputFile.click();
  }

  onInputChange(e) {
    let files = e.target.files;
    var file = files[0];
    if (file == null) {
      return false;
    }
    const filesArr = [];
    Object.keys(files).forEach(key => {
      if (this.filter(files[key])) {
        filesArr.push(files[key]);
      }
    })

    const { onChange, onError } = this.props;
    if (filesArr.length <= 0) {
      onError("文件类型错误!");
      return false;
    }
    this.refs.inputFile.value = "";
    onChange(filesArr);
  }

  render() {
    const {
      children,
      onClick,
      paste,
      drop,
      domain,
      accept,
      onError,
      onChange,
      multiple,
      ...other
    } = this.props;
    return (
      <div {...other} onClick={this.onClick.bind(this)} ref="self">
        <input
          accept={accept}
          multiple={multiple}
          onChange={this.onInputChange.bind(this)}
          type="file"
          ref="inputFile"
          style={{ display: "none" }}
        />
        {children}
      </div>
    );
  }
}

export default Upload;
