import { useEffect, useState } from "react";
import sec01_big from "@img/home/parallax/sec01/parallax_section01_big.png";
import sec01_1 from "@img/home/parallax/sec01/parallax_section01_1.png";
import sec01_2 from "@img/home/parallax/sec01/parallax_section01_2.png";
import sec01_3 from "@img/home/parallax/sec01/parallax_section01_3.png";
import sec01_4 from "@img/home/parallax/sec01/parallax_section01_4.png";
import sec01_5 from "@img/home/parallax/sec01/parallax_section01_5.png";
import sec01_6 from "@img/home/parallax/sec01/parallax_section01_6.png";
import sec01_7 from "@img/home/parallax/sec01/parallax_section01_7.png";

import sec02_big from "@img/home/parallax/sec02/parallax_section02_big.png";
import sec02_big_wide from "@img/home/parallax/sec02/parallax_section02_big_wide.png";
import sec02_1 from "@img/home/parallax/sec02/parallax_section02_1.png";
import sec02_2 from "@img/home/parallax/sec02/parallax_section02_2.png";
import sec02_3 from "@img/home/parallax/sec02/parallax_section02_3.png";
import sec02_4 from "@img/home/parallax/sec02/parallax_section02_4.png";
import sec02_5 from "@img/home/parallax/sec02/parallax_section02_5.png";
import sec02_6 from "@img/home/parallax/sec02/parallax_section02_6.png";

import sec03_big from "@img/home/parallax/sec03/parallax_section03_big.png";
import sec03_1 from "@img/home/parallax/sec03/parallax_section03_1.png";
import sec03_2 from "@img/home/parallax/sec03/parallax_section03_2.png";
import sec03_3 from "@img/home/parallax/sec03/parallax_section03_3.png";
import sec03_4 from "@img/home/parallax/sec03/parallax_section03_4.png";
import sec03_5 from "@img/home/parallax/sec03/parallax_section03_5.png";
import sec03_6 from "@img/home/parallax/sec03/parallax_section03_6.png";
import sec03_7 from "@img/home/parallax/sec03/parallax_section03_7.png";

export const ParallaxImages = {
  sec01: {
    big: [sec01_big],
    small: [sec01_1, sec01_2, sec01_3, sec01_4, sec01_5, sec01_6, sec01_7],
    lgText: "どれで逝きたい\u003f",
    smText: "特別に死に方選ばせてあげるよ",
  },
  sec02: {
    big: [sec02_big],
    bigWide: [sec02_big_wide],
    small: [sec02_1, sec02_2, sec02_3, sec02_4, sec02_5, sec02_6],
    lgText: "大丈夫ー殺しの免許は\nゴールドだから～",
    smText: "殺しに正義も悪もないよ",
  },
  sec03: {
    big: [sec03_big],
    small: [sec03_1, sec03_2, sec03_3, sec03_4, sec03_5, sec03_6, sec03_7],
    lgText: "殺しに必要なのは\n嘘でしょ",
    smText: "殺しに正義も悪もないよ",
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
