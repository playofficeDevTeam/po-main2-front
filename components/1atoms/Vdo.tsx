export default function App({
  src,
  className,
  style,
}: {
  src: string;
  className?: string;
  style?: object;
}) {
  return (
    <video
      loop
      muted
      autoPlay
      playsInline
      className={`object-cover w-full h-full ${className}`}
      style={style}
    >
      <source src={`${src}.webm`} type="video/webm" />
      <source src={`${src}.mp4`} type="video/mp4" />
      브라우저 버전이 너무 낮습니다. 크롬 브라우저를 이용해주세요.
    </video>
  );
}
