import { useEffect, useRef, useState } from "react";

const videos = [
  { title: "Vídeo 1", src: "/VIDEO_PARA_MULTIMIDIA.mp4" },
  { title: "Vídeo 2", src: "/VIDEO-02.mp4" },
  { title: "Vídeo 3", src: "/video-03.mp4" },
];

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [currentIndex]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleSliderChange = (e) => {
    videoRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", color: "white" }}>
      <h2>Player de Vídeo</h2>

      <video
        ref={videoRef}
        width="100%"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={nextVideo}
        controls
      >
        <source src={videos[currentIndex].src} type="video/mp4" />
      </video>

      <div>
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>

      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={handleSliderChange}
        style={{ width: "100%" }}
      />

      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <button onClick={() => (videoRef.current.currentTime -= 10)}>-10s</button>
        <button onClick={() => (videoRef.current.currentTime += 10)}>+10s</button>
        <button onClick={prevVideo}>Anterior</button>
        <button onClick={nextVideo}>Próximo</button>
      </div>

      <ul style={{ marginTop: 20 }}>
        {videos.map((video, index) => (
          <li
            key={index}
            style={{ cursor: "pointer", fontWeight: index === currentIndex ? "bold" : "normal" }}
            onClick={() => setCurrentIndex(index)}
          >
            {video.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
