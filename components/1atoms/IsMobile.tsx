import useIsMobile from "../hooks/useIsMobile";

export default function App({ mo, pc }) {
  const isMobile = useIsMobile();
  return isMobile ? <>{mo}</> : <>{pc}</>;
}
