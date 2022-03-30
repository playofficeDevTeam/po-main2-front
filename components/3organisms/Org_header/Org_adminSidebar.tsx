import Link from "next/link";

const listsData = [
  {
    icon: <i className="fas fa-home"></i>,
    title: "대시보드",
    url: "/admin/dashboard",
  },
  {
    icon: <i className="fas fa-user-cog"></i>,
    title: "관리자",
    url: "/admin/admin",
  },
  {
    icon: <i className="fas fa-user"></i>,
    title: "유저",
    url: "/admin/user",
  },
  {
    icon: <i className="fas fa-tasks"></i>,
    title: "캠페인",
    url: "/admin/campaign",
  },
  {
    icon: <i className="fas fa-credit-card"></i>,
    title: "결제",
    url: "/admin/payment",
  },
  {
    icon: <i className="fas fa-question-circle"></i>,
    title: "문의",
    url: "/admin/question",
  },
  {
    icon: <i className="fas fa-shopping-basket"></i>,
    title: "서비스",
    url: "/admin/item",
  },
];

export default function App() {
  const pathname = window.location.pathname;

  return (
    <>
      <div className=" w-48 border-r shadow-md overflow-y-auto ">
        <div className="text-xl font-black text-orange-600 p-3 pl-4 mb-3">
          POKETING
        </div>
        <ul>
          {listsData.map((val, idx) => (
            <li className="px-1 pb-1" key={idx}>
              <Link href={val.url}>
                <a
                  className={`flex items-center p-2 pl-4 cursor-pointer  rounded-md hover:bg-gray-100 ${
                    pathname === val.url ? "bg-gray-100" : ""
                  } `}
                >
                  <div className="w-5 mr-3 text-gray-700">{val.icon}</div>
                  {val.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
