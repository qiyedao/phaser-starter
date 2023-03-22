import React, { useState } from 'react';

import CanvasPoster from '@/components/Poster';
import { Button } from 'antd-mobile';

export default () => {
  const [imgurl, setImgUrl] = useState('');
  const [startDraw, setStartDraw] = useState(false);
  const [painting, setPainting] = useState({});

  const generateShareImg = () => {
    const paintingData = {
      debug: true,
      width: 300,
      height: 350,
      views: [
        {
          type: 'rect',
          width: 300,
          height: 350,
          top: 0,
          left: 0,
          background: 'white',
          radius: 8,
        },
        {
          type: 'text',
          top: 30,
          left: 15,
          content: 'hellow reactjs-canvas-poster',
          fontSize: 18,
          lineHeight: 25,
          width: 250,
          breakWord: true,
        },
        {
          type: 'text',
          top: 60,
          left: 15,
          content: `作者：foxfly  2022-03-26`,
          fontSize: 12,
          lineHeight: 17,
          width: 250,
          breakWord: false,
          MaxLineNumber: 1,
          color: '#999',
        },
        {
          type: 'image',
          width: 270,
          height: 126,
          top: 90,
          left: 15,
          url: 'poster.jpg',
          radius: 6,
        },
        {
          type: 'text',
          top: 270,
          left: 15,
          content: `查看更多内容，请扫码~`,
          fontSize: 12,
          lineHeight: 17,
          width: 70,
          breakWord: true,
          MaxLineNumber: 2,
          color: '#999',
        },
        {
          type: 'qrcode',
          width: 80,
          height: 80,
          top: 240,
          left: 200,
          content: 'https://blogapi.mylifed.cn/foxfly',
        },
      ],
    };
    setPainting(paintingData);
    setStartDraw(true);
  };
  return (
    <div>
      <Button color="primary" onClick={() => generateShareImg()}>
        生成海报
      </Button>

      {startDraw && <CanvasPoster drawData={painting} onSuccess={(img) => setImgUrl(img)} />}
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        {imgurl && (
          <img src={imgurl} style={{ width: painting?.width, height: painting?.height }} />
        )}
      </div>
    </div>
  );
};
