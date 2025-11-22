import { useRef, useState } from "react";

export default function Player() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleVolume = (e: any) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);

    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  return (
    <div
      style={{
        background: "#000",
        color: "#fff",
        padding: 30,
        borderRadius: 20,
        maxWidth: 700,
        margin: "0 auto",
        textAlign: "center",
        boxShadow: "0 0 15px rgba(255,255,255,0.15)",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>Player de Vídeo</h2>

      <video
        ref={videoRef}
        width="100%"
        style={{ borderRadius: 16, marginBottom: 20 }}
        controls={false}
      >
        {/* 🔽🔽 AQUI VOCÊ COLOCA O LINK DO SEU VÍDEO 🔽🔽 */}
        <source src="/VIDEO_PARA_MULTIMIDIA.mp4" type="video/mp4" />
      </video>

      <div style={{ marginTop: 10 }}>
        <button
          onClick={togglePlay}
          style={{
            background: "#1e90ff",
            border: "none",
            padding: "12px 25px",
            borderRadius: 12,
            cursor: "pointer",
            fontSize: "1.1rem",
            color: "#fff",
            transition: "0.2s",
            marginBottom: 20,
          }}
        >
          {isPlaying ? "⏸ Pausar" : "▶️ Reproduzir"}
        </button>
      </div>

      <div style={{ marginTop: 10 }}>
        <label>
          Volume: {Math.round(volume * 100)}%
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolume}
            style={{
              width: "100%",
              marginTop: 10,
            }}
          />
        </label>
      </div>
    </div>
  );
}
