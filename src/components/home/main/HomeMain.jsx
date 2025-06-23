import { useState, useEffect } from "react";
import video from "@assets/video/nagumo_video.mp4";
import webp from "@assets/video/nagumo_video.webp";
import styles from "./HomeMain.module.scss";
import classNames from "classnames";
import mini01 from "@img/home/main/main_sBox_01.jpg";
import mini02 from "@img/home/main/main_sBox_02.jpg";
import mini03 from "@img/home/main/main_sBox_03.jpg";
import mini04 from "@img/home/main/main_sBox_04.jpg";
import mini05 from "@img/home/main/main_sBox_05.jpg";
import nameJapen01_dark from "@img/home/main/nagumo_name01_dark.png";
import nameJapen01_light from "@img/home/main/nagumo_name01_light.png";
import nameJapen02_dark from "@img/home/main/nagumo_name02_dark.png";
import nameJapen02_light from "@img/home/main/nagumo_name02_light.png";
import paperBox_dark from "@img/home/main/main_paper_box_dark.jpg";
import paperBox_light from "@img/home/main/main_paper_box_light.jpg";
import nagumo from "@img/home/main/main_nagumo.png";
import pcTitle from "@img/home/main/main_pc_title.png";
import longBox from "@img/home/main/main_longBox.jpg";
import useDarkMode from "@utils/useDarkMode";

const HomeMain = ({ mobile, videoRef }) => {
  const isDark = useDarkMode();
  const [videoError, setVideoError] = useState(false);

  const miniBoxs = [
    { src: mini01 },
    { src: mini02 },
    { src: mini03 },
    {
      src: mobile ? (isDark ? nameJapen01_dark : nameJapen01_light) : mini04,
      isNameJapen: mobile ? true : false,
    },
  ];

  return (
    <div
      className={classNames(styles.homeMainContainer, mobile ? "" : styles.pc)}
    >
      <div className={styles.sectionVideo}>
        {videoError ? (
          <img src={webp} alt="fallback animation" className={styles.mainVideo} />
        ) : (
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            autoPlay
            preload="auto"
            className={styles.mainVideo}
            onError={() => setVideoError(true)}
          >
            <source src={video} type="video/mp4" />
          </video>
        )}

        <div className={styles.imgMiniBoxs}>
          {miniBoxs.map((item, num) => {
            return item.isNameJapen ? (
              <div
                key={num}
                style={{ backgroundImage: `url(${item.src})` }}
                className={classNames(
                  isDark ? styles.dark : styles.light,
                  styles.nameJapen
                )}
              ></div>
            ) : (
              <img src={item.src} key={num} alt="" />
            );
          })}
        </div>

        <div className={styles.mainTitle}>
          {mobile ? (
            <>
              <h3>
                <span>Nagumo</span>Yoichi{mobile ? <br /> : " "}Days
              </h3>
              <p>Happy Birthday{mobile ? <br /> : " "}1993.07.09</p>
            </>
          ) : (
            <img src={pcTitle} alt="" />
          )}
        </div>
      </div>

      <div className={styles.sectionPart2}>
        {mobile ? (
          <div
            style={{
              backgroundImage: `url(${isDark ? nameJapen02_dark : nameJapen02_light})`,
            }}
            className={classNames(
              isDark ? styles.dark : styles.light,
              styles.nameJapen
            )}
          ></div>
        ) : (
          <img src={mini05} className={styles.miniBox} alt="" />
        )}
        <div className={styles.paperLongBox}>
          <img src={nagumo} className={styles.nagumo} alt="nagumo" />
          {!mobile ? (
            <div className={styles.pcNagumoName}>
              <img src={nameJapen01_light} alt="" />
              <img src={nameJapen02_light} alt="" />
            </div>
          ) : (
            ""
          )}
          <img
            src={isDark ? paperBox_dark : paperBox_light}
            className={styles.paperBg}
            alt=""
          />
        </div>
      </div>

      {mobile && (
        <div className={styles.sectionPart3}>
          <img src={longBox} className={styles.longBox} alt="" />
          <img src={mini04} className={styles.miniBox} alt="" />
        </div>
      )}
    </div>
  );
};

export default HomeMain;
