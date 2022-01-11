import AnimatedNumber from "animated-number-react";

function App({
  trigger,
  value,
  duration = 1000,
  fixed = 0,
}: {
  trigger: boolean;
  value: number;
  duration?: number;
  fixed?: number;
}) {
  return (
    <>
      <AnimatedNumber
        value={trigger && value}
        formatValue={(value: number) => value.toFixed(fixed)}
        duration={duration}
      />
    </>
  );
}

export default App;
