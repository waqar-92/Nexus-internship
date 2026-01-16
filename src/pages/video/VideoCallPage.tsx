import React, { useEffect, useRef, useState } from "react";

export const VideoCallPage: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [callActive, setCallActive] = useState(false);

  // Start Call
  const startCall = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setStream(mediaStream);
      setCameraOn(true);
      setMicOn(true);
      setCallActive(true);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      alert("Camera or microphone permission denied");
    }
  };

  // End Call
  const endCall = () => {
    stream?.getTracks().forEach(track => track.stop());
    setStream(null);
    setCameraOn(false);
    setMicOn(false);
    setCallActive(false);
  };

  // Toggle Camera
  const toggleCamera = () => {
    if (!stream) return;
    stream.getVideoTracks().forEach(track => {
      track.enabled = !cameraOn;
    });
    setCameraOn(!cameraOn);
  };

  // Toggle Microphone
  const toggleMic = () => {
    if (!stream) return;
    stream.getAudioTracks().forEach(track => {
      track.enabled = !micOn;
    });
    setMicOn(!micOn);
  };

  useEffect(() => {
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [stream]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Video Call</h2>
      <p>Frontend mock video calling interface</p>

      {/* Video Section */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {/* Local Video */}
        <div style={{ flex: 1, background: "#000", borderRadius: "8px" }}>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            style={{ width: "100%", height: "300px", borderRadius: "8px" }}
          />
          <p style={{ color: "#fff", textAlign: "center" }}>You</p>
        </div>

        {/* Remote Mock Video */}
        <div
          style={{
            flex: 1,
            background: "#1f2937",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9ca3af",
          }}
        >
          Remote User (Mock)
        </div>
      </div>

      {/* Controls */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        {!callActive && (
          <button
            onClick={startCall}
            style={{ background: "#22c55e", color: "#fff" }}
          >
            Start Call
          </button>
        )}

        {callActive && (
          <>
            <button
              onClick={toggleCamera}
              style={{ background: cameraOn ? "#2563eb" : "#9ca3af", color: "#fff" }}
            >
              {cameraOn ? "Camera ON" : "Camera OFF"}
            </button>

            <button
              onClick={toggleMic}
              style={{ background: micOn ? "#2563eb" : "#9ca3af", color: "#fff" }}
            >
              {micOn ? "Mic ON" : "Mic OFF"}
            </button>

            <button
              onClick={endCall}
              style={{ background: "#ef4444", color: "#fff" }}
            >
              End Call
            </button>
          </>
        )}
      </div>
    </div>
  );
};
