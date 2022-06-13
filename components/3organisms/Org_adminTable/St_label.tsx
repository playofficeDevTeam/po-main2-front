export default function App({ children, onClick, selected }) {
  return (
    <div className="h-0 mr-1">
      <div
        className={` relative rounded-t-md border border-gray-300 border-b-0  cursor-pointer ${
          selected ? "bg-white" : " bg-gray-100"
        }`}
        onClick={onClick}
        style={{ height: "2.56rem" }}
      >
        <div className="flex justify-center items-center px-3 h-8 text-gray-900 font-medium ">
          {children}
        </div>
      </div>
    </div>
  );
}
