export function BackgroundVideo() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="
        fixed top-0 left-0 w-full h-full object-cover -z-10
        motion-reduce:hidden 
      "
    >
      <source src="/videos/bg-loop.webm" type="video/webm" />
      <source src="/videos/bg-loop.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

