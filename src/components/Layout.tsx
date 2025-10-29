import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import background from "../assets/images/background.jpg";
import { FaSearch, FaHome } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { ROUTES } from "../routes";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isDetailPage = location.pathname.startsWith(
    ROUTES.ANIME_DETAIL.replace(":id", "")
  );

  return (
    <div
      className="h-screen w-screen bg-center bg-cover pt-12 px-12 overflow-y-scroll hide-scrollbar relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${background})`,
      }}
    >
      {!open && (
        <div className="fixed left-3 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
          <button
            onClick={() => setOpen(true)}
            className="bg-gray-400 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-700 transition-transform duration-300 hover:-translate-y-1 hover:scale-110 active:scale-90"
            title="Filter"
          >
            <FaSearch size={20} />
          </button>

          {isDetailPage && (
            <button
              onClick={() => navigate(ROUTES.HOME)}
              className="bg-gray-400 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-800 transition-transform duration-300 hover:-translate-y-1 hover:scale-110 active:scale-90"
              title="Go Home"
            >
              <FaHome size={20} />
            </button>
          )}
        </div>
      )}

      <Sidebar open={open} onClose={() => setOpen(false)} />

      <div
        className={`relative z-10 max-h-screen p-6 transition-all duration-300 ${
          open ? "ml-64 scale-[0.95]" : ""
        }`}
      >
        <div className="bg-white/70 border border-gray-300 rounded-lg p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
