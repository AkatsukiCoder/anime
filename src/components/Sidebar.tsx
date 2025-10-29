import { useRef, useEffect } from "react";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

function Sidebar({ open, onClose, searchTerm, setSearchTerm }: SidebarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white/90 border-r border-gray-300 shadow-xl z-40 transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-6 space-y-4">
        <h2 className="font-bold text-lg">Search Filters</h2>

        <input
          ref={inputRef}
          type="text"
          placeholder="Search Anime..."
          className="w-full p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          onClick={onClose}
          className="w-full bg-gray-600 text-white p-2 rounded hover:bg-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
