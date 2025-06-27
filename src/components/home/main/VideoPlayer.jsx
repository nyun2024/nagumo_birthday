import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import poster from "@assets/video/video_poster.jpg";
import video from "@assets/video/test222.mp4";
import webp from "@assets/video/nagumo_video.webp";
import styles from './VideoPlayer.module.scss'

const VideoPlayer = forwardRef(
  (
    {
      loop = true,
      muted = true,
      playsInline = true,
      forcePlay = false,
    },
    ref
  ) => {
    const videoRef = useRef(null);
    const [showFallback, setShowFallback] = useState(false);
    const bufferingTimeoutRef = useRef(null);

    useImperativeHandle(ref, () => videoRef.current);

    const tryPlay = async () => {
      const video = videoRef.current;
      if (!video) return;

      video.muted = muted;
      video.playsInline = playsInline;

      try {
        await video.play();
        setShowFallback(false);
      } catch (err) {
        console.warn("자동재생 실패 → fallback으로 대체", err);
        setShowFallback(true);
      }
    };

    const handleWaiting = () => {
      clearTimeout(bufferingTimeoutRef.current);
      bufferingTimeoutRef.current = setTimeout(() => {
        console.warn("5초 이상 버퍼링 → fallback으로 대체");
        setShowFallback(true);
      }, 5000);
    };

    const handlePlaying = () => {
      clearTimeout(bufferingTimeoutRef.current);
    };

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      video.addEventListener("playing", handlePlaying);
      video.addEventListener("waiting", handleWaiting);

      if (forcePlay) {
        tryPlay();
      }

      return () => {
        clearTimeout(bufferingTimeoutRef.current);
        video.removeEventListener("playing", handlePlaying);
        video.removeEventListener("waiting", handleWaiting);
      };
    }, [forcePlay]);

    return (
      <>
        {!showFallback && (
          <video
            className={styles.mainVideo}
            ref={videoRef}
            src={video}
            poster={poster}
            loop={loop}
            muted={muted}
            playsInline={playsInline}
          />
        )}
        {showFallback && (
          <img
            className={styles.mainVideo}
            src={webp}
            alt="Fallback animation"
          />
        )}
      </>
    );
  }
);

export default VideoPlayer;
