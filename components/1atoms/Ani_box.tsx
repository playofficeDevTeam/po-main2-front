import useIsMobile from "/home/app/components/hooks/useIsMobile";

export default function App({ children, trigger, className = "" }) {
  return (
    <div className={`h-0 ${className}`}>
      <div
        className={`bg-white border-2 relative ${
          trigger ? "" : "-translate-y-3"
        }`}
        style={
          trigger
            ? {
                opacity: "100%",
                bottom: "0.2rem",
                transition:
                  "bottom ease 0s 0s, opacity ease 0.2s, transform ease 0.2s ",
              }
            : {
                opacity: "0%",
                bottom: "10000rem",
                transition:
                  " bottom ease 0s 0.2s,  opacity ease 0.2s, transform ease 0.2s ",
              }
        }
      >
        {children}
      </div>
    </div>
  );
}
