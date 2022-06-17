export default function App({ children, onClick = () => {}, selected = true }) {
  return (
    <div className="h-0">
      <div
        className={` relative rounded-t-md border border-gray-300 border-b-0  cursor-pointer ${
          selected ? "bg-white" : " bg-gray-50"
        }`}
        onClick={onClick}
        style={selected ? { height: "2.54rem" } : { height: "2.52rem" }}
      >
        <div className="flex justify-center items-center px-3 h-8 text-gray-900 font-medium ">
          {children}
        </div>
      </div>
    </div>
  );
}
