import { useEffect, useState } from "react";
import sec01_big from "@img/home/parallaxSlide/sec01/section01_big.png";
import sec01_1 from "@img/home/parallaxSlide/sec01/section01_1.jpg";
import sec01_2 from "@img/home/parallaxSlide/sec01/section01_2.jpg";
import sec01_3 from "@img/home/parallaxSlide/sec01/section01_3.jpg";
import sec01_4 from "@img/home/parallaxSlide/sec01/section01_4.jpg";
import sec01_5 from "@img/home/parallaxSlide/sec01/section01_5.jpg";

import sec02_big from "@img/home/parallaxSlide/sec02/section02_big.png";
import sec02_1 from "@img/home/parallaxSlide/sec02/section02_1.jpg";
import sec02_2 from "@img/home/parallaxSlide/sec02/section02_2.jpg";
import sec02_3 from "@img/home/parallaxSlide/sec02/section02_3.jpg";
import sec02_4 from "@img/home/parallaxSlide/sec02/section02_4.jpg";
import sec02_5 from "@img/home/parallaxSlide/sec02/section02_5.jpg";

import sec03_big from "@img/home/parallaxSlide/sec03/section03_big.png";
import sec03_1 from "@img/home/parallaxSlide/sec03/section03_1.jpg";
import sec03_2 from "@img/home/parallaxSlide/sec03/section03_2.jpg";
import sec03_3 from "@img/home/parallaxSlide/sec03/section03_3.jpg";
import sec03_4 from "@img/home/parallaxSlide/sec03/section03_4.jpg";
import sec03_5 from "@img/home/parallaxSlide/sec03/section03_5.jpg";
import sec03_6 from "@img/home/parallaxSlide/sec03/section03_6.jpg";

export const SlideImages = {
  sec01: {
    big: [sec01_big],
    small: [sec01_1, sec01_2, sec01_3, sec01_4, sec01_5],
    text: "僕優しいからさ\u007E\n特別に死に方選ば\nせてあげるよ",
    pcText: "僕優しいからさ\u007E\n特別に死に方選ばせてあげるよ",
  },
  sec02: {
    big: [sec02_big],
    small: [sec02_1, sec02_2, sec02_3, sec02_4, sec02_5],
    text: "大丈夫ー殺しの免許は\nゴールドだから\u007E",
    pcText: "大丈夫ー殺しの免許は\nゴールドだから\u007E",
  },
  sec03: {
    big: [sec03_big],
    small: [sec03_1, sec03_2, sec03_3, sec03_4, sec03_5, sec03_6],
    text: "殺しに必要なのは\n嘘でしょ",
    pcText: "殺しに必要なのは\n嘘でしょ",
  },
};

export function useIsWidth(width) {
  const [isWide, setIsWide] = useState(window.innerWidth >= width);

  useEffect(() => {
    function handleResize() {
      setIsWide(window.innerWidth >= width);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isWide;
}
