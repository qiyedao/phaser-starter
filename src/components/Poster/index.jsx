// @ts-nocheck

import React, { Component } from 'react';
import { createRef } from 'react';

export class CanvasPoster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ctx: '',
      context: '',
      debug: false,
      drawData: props.drawData,
    };
    this.canvas = createRef();
    this.canvasCodeDom = createRef();
  }

  componentDidMount() {
    this.initCanvas();
  }

  render() {
    return (
      <div className="canvas-poster">
        <div
          ref={this.canvasCodeDom}
          style={{ display: this.state.debug ? 'block' : 'none' }}
        ></div>
        <canvas
          height={this.props.drawData.height}
          width={this.props.drawData.width}
          className="canvas-poster-hidca"
          ref={this.canvas}
          style={{ display: this.state.debug ? 'block' : 'none' }}
        ></canvas>
      </div>
    );
  }

  initCanvas() {
    console.log('this.props', this.props, 'this.canvas', this.canvas.current.getContext('2d'));
    if (
      !this.props.drawData.width ||
      !this.props.drawData.height ||
      this.props.drawData.views.length === 0
    ) {
      return;
    }

    this.setState(
      (prevState, props) => ({
        debug: props.drawData.debug || false,
        ctx: this.canvas.current.getContext('2d'),
        context: this.canvas.current.getContext('2d'),
      }),
      () => {
        this.drawArr();
      },
    );
  }

  async drawArr() {
    if (this.props.drawData.backgroundColor) {
      this.state.context.save();
      this.setState({
        ctx: { ...this.state.ctx, fillStyle: this.props.drawData.backgroundColor },
      });
      this.state.context.fillRect(0, 0, this.props.drawData.width, this.props.drawData.height);
      this.state.context.restore();
    }
    for (let i = 0; i < this.props.drawData.views.length; i += 1) {
      if (this.props.drawData.views[i].type === 'image') {
        // eslint-disable-next-line no-await-in-loop
        await this.drawImg(this.props.drawData.views[i]);
      } else if (this.props.drawData.views[i].type === 'text') {
        this.drawText(this.props.drawData.views[i]);
      } else if (this.props.drawData.views[i].type === 'rect') {
        this.drawBlock(this.props.drawData.views[i]);
      } else if (this.props.drawData.views[i].type === 'line') {
        this.drawLine(this.props.drawData.views[i]);
      } else if (this.props.drawData.views[i].type === 'qcode') {
        // this.drawQcode(this.props.drawData.views[i]);
      }
    }
    this.props.onSuccess(this.canvas.current.toDataURL('image/png'));
  }

  // drawImg
  drawImg(data) {
    return new Promise((resolve) => {
      const {
        url,
        top = 0,
        left = 0,
        width = 0,
        height = 0,
        borderRadius = 0,
        borderWidth = 0,
        borderColor = 'rgba(255,255,255,0)',
      } = data;
      this.state.context.save();
      const img = new Image();

      img.src = url;
      img.onload = () => {
        console.log('this.state.ctx', this.state.ctx);
        if (borderRadius > 0) {
          this.drawRadiusRect(left, top, width, height, borderRadius, borderWidth, borderColor);
          this.state.context.clip();
          this.state.context.drawImage(img, left, top, width, height);
        } else {
          this.state.context.drawImage(img, left, top, width, height);
        }
        this.state.context.restore();
        setTimeout(() => {
          resolve();
        }, 100);
      };
    });
  }

  // drawRadiusRect
  drawRadiusRect(x, y, w, h, r, borderWidth, borderColor) {
    const br = r / 2;
    this.state.context.beginPath();
    if (borderWidth > 0) {
      this.setState({
        ctx: { ...this.state.ctx, lineWidth: borderWidth },
      });
    }
    this.setState({
      ctx: { ...this.state.ctx, strokeStyle: borderColor },
    });
    this.state.context.moveTo(x + br, y); // 移动到左上角的点
    this.state.context.lineTo(x + w - br, y);
    this.state.context.arc(x + w - br, y + br, br, 2 * Math.PI * (3 / 4), 2 * Math.PI * (4 / 4));
    this.state.context.lineTo(x + w, y + h - br);
    this.state.context.arc(x + w - br, y + h - br, br, 0, 2 * Math.PI * (1 / 4));
    this.state.context.lineTo(x + br, y + h);
    this.state.context.arc(x + br, y + h - br, br, 2 * Math.PI * (1 / 4), 2 * Math.PI * (2 / 4));
    this.state.context.lineTo(x, y + br);
    this.state.context.arc(x + br, y + br, br, 2 * Math.PI * (2 / 4), 2 * Math.PI * (3 / 4));
    this.state.context.closePath();
    this.state.context.stroke();
  }

  // drawText
  drawText({
    top = 0,
    left = 0,
    fontSize = 16,
    color = '#000',
    baseLine = 'bottom',
    textAlign = 'left',
    content,
    opacity = 1,
    width,
    lineNum = 1,
    lineHeight = 0,
    fontWeight = 'normal',
    fontStyle = 'normal',
    fontFamily = 'Microsoft YaHei',
  }) {
    this.state.context.save();
    this.state.context.beginPath();

    this.setState({
      ctx: {
        ...this.state.ctx,
        textAlign,
        textBaseline: baseLine,
        fillStyle: color,
        globalAlpha: opacity,
        font: `normal ${fontWeight} ${fontSize}px ${fontFamily}`,
      },
    });
    let textWidth = this.state.context.measureText(content).width;
    const textArr = [];

    if (textWidth > width) {
      let fillText = '';
      let line = 1;
      for (let i = 0; i <= content.length - 1; i += 1) {
        // 将文字转为数组
        fillText += content[i];
        if (this.state.context.measureText(fillText).width >= width) {
          if (line === lineNum) {
            if (i !== content.length - 1) {
              fillText = `${fillText.substring(0, fillText.length - 1)}...`;
            }
          }
          if (line <= lineNum) {
            textArr.push(fillText);
          }
          fillText = '';
          line += 1;
        } else if (line <= lineNum) {
          if (i === content.length - 1) {
            textArr.push(fillText);
          }
        }
      }
      textWidth = width;
    } else {
      textArr.push(content);
    }

    textArr.forEach((item, index) => {
      this.state.context.fillText(item, left, top + (lineHeight || fontSize) * index);
    });

    this.state.context.restore();
  }

  // drawLine
  drawLine({ startX, startY, endX, endY, color = '#000', width = 1, lineCap = 'butt' }) {
    this.state.context.save();
    this.state.context.beginPath();
    this.setState({
      ctx: {
        ...this.state.ctx,
        lineCap,
        strokeStyle: strokeStyle,
        lineWidth: width,
      },
    });
    this.state.context.moveTo(startX, startY);
    this.state.context.lineTo(endX, endY);
    this.state.context.stroke(); // 进行绘制
    this.state.context.closePath();
    this.state.context.restore();
  }

  drawBlock({
    text,
    width = 0,
    height,
    x,
    y,
    paddingLeft = 0,
    paddingRight = 0,
    borderWidth,
    backgroundColor,
    borderColor,
    borderRadius = 0,
    opacity = 1,
  }) {
    // 判断是否块内有文字
    let blockWidth = 0; // 块的宽度
    let textX = 0;
    let textY = 0;
    if (typeof text !== 'undefined') {
      // 如果有文字并且块的宽度小于文字宽度，块的宽度为 文字的宽度 + 内边距
      const textWidth = this.getTextWidth(typeof text.content === 'string' ? text : text.content);
      blockWidth = textWidth > width ? textWidth : width;
      blockWidth += paddingLeft + paddingLeft;

      // eslint-disable-next-line
      const { textAlign = 'left', text: textCon } = text;
      textY = height / 2 + y; // 文字的y轴坐标在块中线
      if (textAlign === 'left') {
        // 如果是右对齐，那x轴在块的最左边
        textX = x + paddingLeft;
      } else if (textAlign === 'center') {
        textX = blockWidth / 2 + x;
      } else {
        textX = x + blockWidth - paddingRight;
      }
    } else {
      blockWidth = width;
    }

    if (backgroundColor) {
      // 画面
      this.state.context.save();

      this.setState({
        ctx: { ...this.state.ctx, globalAlpha: opacity, fillStyle: backgroundColor },
      });
      if (borderRadius > 0) {
        // 画圆角矩形
        this.drawRadiusRect(x, y, blockWidth, height, borderRadius);
        this.state.context.fill();
      } else {
        this.state.context.fillRect(x, y, blockWidth, height);
      }
      this.state.context.restore();
    }
    if (borderWidth) {
      // 画线
      this.state.context.save();

      this.setState({
        ctx: {
          ...this.state.ctx,
          globalAlpha: opacity,
          fillStyle: borderColor,
          lineWidth: borderWidth,
        },
      });
      if (borderRadius > 0) {
        // 画圆角矩形边框
        this.drawRadiusRect(x, y, blockWidth, height, borderRadius);
        this.state.context.stroke();
      } else {
        this.state.context.strokeRect(x, y, blockWidth, height);
      }
      this.state.context.restore();
    }

    if (text) {
      this.drawText(Object.assign(text, { x: textX, y: textY }));
    }
  }

  // 绘制二维码
  drawQcode({
    text = '', // 绘制的文字或者是url
    width = 200, // 宽度
    height = 200, // 高度
    top = 0, // 最上边
    left = 0, // 左边
    background = '#f0f', // 背景色
    foreground = '#ff0', // 块颜色
    padding = 5, // 是否有边距 0 为 没有
  }) {
    if (text === '') {
      console.warn('您设置的二维码 text 字段内容不能为空'); // eslint-disable-line
    } else {
      this.canvasCodeDom.innerHTML = ''; // 重置
      if (padding !== 0) {
        // 如果没有边距
        this.drawBlock({
          x: left - padding,
          y: top - padding,
          width: width + padding * 2,
          height: height + padding * 2,
          backgroundColor: '#fff',
        });
      }
      new QRcode(this.canvasCodeDom, {
        width,
        height, // 高度
        text, // 二维码内容
        image: '',
        correctLevel: QRcode.CorrectLevel.L,
        background,
        foreground,
      });
      this.state.context.drawImage(
        this.canvasCodeDom.querySelector('canvas'),
        left,
        top,
        width,
        height,
      );
    }
  }

  /**
   * 计算文本长度
   * @param {Array|Object}} text 数组 或者 对象
   */
  getTextWidth(text) {
    let texts = [];
    if (Object.prototype.toString.call(text) === '[object Object]') {
      texts.push(text);
    } else {
      texts = text;
    }
    let width = 0;
    texts.forEach(
      ({
        // eslint-disable-next-line
        fontSize,
        text,
        marginLeft = 0,
        marginRight = 0,
      }) => {
        this.setState({
          ctx: { ...this.state.ctx, font: `${fontSize}` },
        });
        width += this.state.context.measureText(text).width + marginLeft + marginRight;
      },
    );

    return width;
  }
}

export default CanvasPoster;
