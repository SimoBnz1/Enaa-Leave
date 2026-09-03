import {
    LayoutDashboard,
    CalendarDays,
    FilePlus2,
    User,
    LogOut,
    ClipboardList,
    Users,
    Building2,
} from "lucide-react";

import {
    NavLink,
    useNavigate,
} from "react-router-dom";

import {
    getUser,
    logout,
} from "../../services/authService";


function Sidebar() {

    const user = getUser();

    const navigate = useNavigate();


    /*
    |--------------------------------------------------------------------------
    | Employee
    |--------------------------------------------------------------------------
    */

    const employeeMenu = [

        {
            name: "Dashboard",
            path: "/employee/dashboard",
            icon: LayoutDashboard,
        },

        {
            name: "Mes demandes",
            path: "/employee/requests",
            icon: ClipboardList,
        },

        {
            name: "Nouvelle demande",
            path: "/employee/new-request",
            icon: FilePlus2,
        },


        
        {
            name: "Calendrier",
            path: "/employee/calendar",
            icon: CalendarDays,
        },

        {
            name: "Mon profil",
            path: "/employee/profile",
            icon: User,
        },

    ];


    const managerMenu = [

        {
            name: "Dashboard",
            path: "/manager/dashboard",
            icon: LayoutDashboard,
        },

        {
            name: "Demandes",
            path: "/manager/dashboard",
            icon: ClipboardList,
        },

        {
            name: "Calendrier",
            path: "/manager/calendar",
            icon: CalendarDays,
        },

        {
            name: "Mon profil",
            path: "/manager/profile",
            icon: User,
        },

    ];

    const hrMenu = [

        {
            name: "Dashboard",
            path: "/hr/dashboard",
            icon: LayoutDashboard,
        },

        {
            name: "Demandes",
            path: "/hr/dashboard",
            icon: ClipboardList,
        },

        {
            name: "Calendrier",
            path: "/hr/calendar",
            icon: CalendarDays,
        },

        {
            name: "Mon profil",
            path: "/hr/profile",
            icon: User,
        },

    ];


    /*
    |--------------------------------------------------------------------------
    | Admin
    |--------------------------------------------------------------------------
    */

    const adminMenu = [

        {
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: LayoutDashboard,
        },

        {
            name: "Utilisateurs",
            path: "/admin/dashboard",
            icon: Users,
        },

        {
            name: "Départements",
            path: "/admin/dashboard",
            icon: Building2,
        },

        {
            name: "Demandes",
            path: "/admin/dashboard",
            icon: ClipboardList,
        },

        {
            name: "Mon profil",
            path: "/admin/profile",
            icon: User,
        },

    ];


    /*
    |--------------------------------------------------------------------------
    | Choisir le menu
    |--------------------------------------------------------------------------
    */

    let menuItems = employeeMenu;


    if (user?.role === "manager") {

        menuItems = managerMenu;

    }


    if (user?.role === "rh") {

        menuItems = hrMenu;

    }


    if (user?.role === "admin") {

        menuItems = adminMenu;

    }


    /*
    |--------------------------------------------------------------------------
    | Logout
    |--------------------------------------------------------------------------
    */

    function handleLogout() {

        logout();

        navigate("/login");

    }


    return (

        <aside className="w-64 min-h-screen bg-white border-r border-slate-200 flex flex-col">


            {/* Logo */}

            <div className="h-16 flex items-center px-6 border-b border-slate-100">

                <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">

                    E

                </div>


                <div className="ml-3">

                    <h1 className="font-bold text-slate-800">

                        ENAA

                    </h1>

                    <p className="text-xs text-slate-400">

                        Leave Management

                    </p>

                </div>

            </div>


            {/* User */}

            <div className="px-4 py-5">

                <div className="bg-slate-50 rounded-2xl p-3">

                    <p className="text-xs text-slate-400 mb-1">

                        Connecté en tant que

                    </p>


                    <p className="font-semibold text-sm text-slate-800 truncate">

                        {user?.name}

                    </p>


                    <p className="text-xs text-blue-600 mt-1 capitalize">

                        {user?.role}

                    </p>

                </div>

            </div>


            {/* Menu */}

            <nav className="flex-1 px-3">

                <p className="text-xs font-semibold text-slate-400 uppercase px-3 mb-3">

                    Menu

                </p>


                <div className="space-y-1">

                    {menuItems.map((item) => {

                        const Icon = item.icon;


                        return (

                            <NavLink
                                key={item.path}
                                to={item.path}

                                className={({ isActive }) =>

                                    `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition ${
                                        isActive
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    }`

                                }
                            >

                                <Icon size={19} />

                                <span>

                                    {item.name}

                                </span>

                            </NavLink>

                        );

                    })}

                </div>

            </nav>


            {/* Logout */}

            <div className="p-3 border-t border-slate-100">

                <button
                    onClick={handleLogout}

                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition"
                >

                    <LogOut size={19} />

                    <span>

                        Déconnexion

                    </span>

                </button>

            </div>


        </aside>

    );

}


export default Sidebar;