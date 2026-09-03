import { Bell, ChevronDown } from "lucide-react";
import { getUser } from "../../services/authService";

function Navbar() {
    const user = getUser();

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">

            {/* Left */}
            <div>
                <p className="text-sm text-slate-500">
                    Espace de travail
                </p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-5">

                {/* Notification */}
                <button className="relative p-2 rounded-xl hover:bg-slate-100 transition">
                    <Bell size={20} className="text-slate-600" />

                    <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
                </button>

                {/* User */}
                <div className="flex items-center gap-3">

                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-semibold">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="hidden sm:block">
                        <p className="text-sm font-semibold text-slate-800">
                            {user?.name}
                        </p>

                        <p className="text-xs text-slate-500 capitalize">
                            {user?.role}
                        </p>
                    </div>

                    <ChevronDown size={16} className="text-slate-400" />

                </div>

            </div>

        </header>
    );
}

export default Navbar;