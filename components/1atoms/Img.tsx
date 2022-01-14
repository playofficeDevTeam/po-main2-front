import Image from "next/image";

export default function App({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width="100%"
      height="100%"
      layout="fill"
      objectFit="contain"
    />
  );
}
