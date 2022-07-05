import { forwardRef, useImperativeHandle, useRef } from "react";
import video1 from "./assets/video.mp4";

function Video(props, ref) {
  const videoRef = useRef();

  useImperativeHandle(ref, () => ({
    play() {
      videoRef.current.play();
    },
    pause(){
        videoRef.current.pause();
    }
  }));

  return <video src={video1} style={{ width: "280px" }} />;
}

export default forwardRef(Video);
