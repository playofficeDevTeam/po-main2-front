import { useRouter } from "next/router";

export default function App() {
  const router = useRouter();
  return () => {
    router.push("/service");
  };
}
