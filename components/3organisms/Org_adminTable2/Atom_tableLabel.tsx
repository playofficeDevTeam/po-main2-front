import Link from "next/link";
import { useRouter } from "next/router";

export default function App({ children, input, className = "" }) {
  const route = useRouter();
  const isMatched = input.url === route.pathname;
  return (
    input && (
      <div className={`h-0 ${className}`}>
        <Link href={input.url}>
          <div
            className={` relative rounded-t-md border border-gray-300 border-b-0  cursor-pointer ${
              isMatched ? "bg-white" : " bg-gray-50"
            }`}
            style={isMatched ? { height: "2.54rem" } : { height: "2.52rem" }}
          >
            <div className="flex justify-center items-center px-3 h-8 text-gray-900 font-medium ">
              {children}
            </div>
          </div>
        </Link>
      </div>
    )
  );
}
