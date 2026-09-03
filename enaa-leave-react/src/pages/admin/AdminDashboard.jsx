import { useEffect, useState } from "react";

import {
    Users,
    UserCheck,
    UserCog,
    ShieldCheck,
    Clock,
    CheckCircle,
    XCircle,
} from "lucide-react";

import Layout from "../../components/layout/Layout";

import { getAdminDashboard } from "../../services/adminService";


function AdminDashboard() {

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        loadDashboard();

    }, []);


    async function loadDashboard() {

        try {

            const result = await getAdminDashboard();

            setData(result);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }

    }




    if (loading) {

        return (

            <Layout>

                <div className="flex items-center justify-center h-64">

                    <p className="text-slate-500">

                        Chargement du dashboard...

                    </p>

                </div>

            </Layout>

        );

    }



    if (error) {

        return (

            <Layout>

                <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl">

                    {error}

                </div>

            </Layout>

        );

    }


    const stats = data.statistics;


    return (

        <Layout>


            {/* Header */}

            <div className="mb-8">

                <h1 className="text-2xl font-bold text-slate-900">

                    Dashboard Admin

                </h1>

                <p className="text-slate-500 mt-1">

                    Vue générale de la plateforme ENAA.

                </p>

            </div>


            {/* Statistics */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">


                {/* Utilisateurs */}

                <StatCard
                    title="Utilisateurs"
                    value={stats.total_users}
                    icon={Users}
                    iconBg="bg-blue-50"
                    iconColor="text-blue-600"
                />


                {/* Employés */}

                <StatCard
                    title="Employés"
                    value={stats.total_employees}
                    icon={UserCheck}
                    iconBg="bg-green-50"
                    iconColor="text-green-600"
                />


                {/* Managers */}

                <StatCard
                    title="Managers"
                    value={stats.total_managers}
                    icon={UserCog}
                    iconBg="bg-purple-50"
                    iconColor="text-purple-600"
                />


                {/* RH */}

                <StatCard
                    title="RH"
                    value={stats.total_hr}
                    icon={ShieldCheck}
                    iconBg="bg-cyan-50"
                    iconColor="text-cyan-600"
                />

            </div>


            {/* Requests Statistics */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">


                <RequestCard
                    title="En attente"
                    value={stats.pending_requests}
                    icon={Clock}
                    iconBg="bg-amber-50"
                    iconColor="text-amber-600"
                />


                <RequestCard
                    title="Approuvées"
                    value={stats.approved_requests}
                    icon={CheckCircle}
                    iconBg="bg-green-50"
                    iconColor="text-green-600"
                />


                <RequestCard
                    title="Refusées"
                    value={stats.rejected_requests}
                    icon={XCircle}
                    iconBg="bg-red-50"
                    iconColor="text-red-600"
                />

            </div>


            {/* Users */}

            <div className="bg-white border border-slate-200 rounded-2xl mt-6">


                <div className="p-6 border-b border-slate-100">

                    <h2 className="font-semibold text-slate-900">

                        Utilisateurs

                    </h2>

                    <p className="text-sm text-slate-400 mt-1">

                        Liste des utilisateurs de la plateforme.

                    </p>

                </div>


                {data.users.length === 0 ? (

                    <div className="text-center py-12 text-slate-400">

                        Aucun utilisateur.

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b border-slate-100 text-left">

                                    <th className="px-6 py-4 text-sm font-semibold text-slate-500">

                                        Nom

                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-slate-500">

                                        Email

                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-slate-500">

                                        Rôle

                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-slate-500">

                                        Département

                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {data.users.map((user) => (

                                    <tr
                                        key={user.id}
                                        className="border-b border-slate-50 last:border-0"
                                    >

                                        <td className="px-6 py-4">

                                            <div className="flex items-center gap-3">

                                                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-semibold">

                                                    {user.name
                                                        ?.charAt(0)
                                                        .toUpperCase()
                                                    }

                                                </div>

                                                <span className="font-medium text-slate-800">

                                                    {user.name}

                                                </span>

                                            </div>

                                        </td>


                                        <td className="px-6 py-4 text-sm text-slate-500">

                                            {user.email}

                                        </td>


                                        <td className="px-6 py-4">

                                            <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-sm font-medium">

                                                {user.roles?.[0]?.name || "Aucun rôle"}

                                            </span>

                                        </td>


                                        <td className="px-6 py-4 text-sm text-slate-500">

                                            {user.department?.name || "Non défini"}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>


            {/* Departments */}

            <div className="bg-white border border-slate-200 rounded-2xl mt-6">


                <div className="p-6 border-b border-slate-100">

                    <h2 className="font-semibold text-slate-900">

                        Départements

                    </h2>

                    <p className="text-sm text-slate-400 mt-1">

                        Départements enregistrés dans le système.

                    </p>

                </div>


                <div className="p-6">

                    {data.departments.length === 0 ? (

                        <p className="text-center text-slate-400 py-8">

                            Aucun département.

                        </p>

                    ) : (

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                            {data.departments.map((department) => (

                                <div
                                    key={department.id}
                                    className="p-4 bg-slate-50 rounded-xl"
                                >

                                    <p className="font-medium text-slate-800">

                                        {department.name}

                                    </p>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>


        </Layout>

    );
}


function StatCard({
    title,
    value,
    icon: Icon,
    iconBg,
    iconColor,
}) {

    return (

        <div className="bg-white border border-slate-200 rounded-2xl p-6">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-slate-500">

                        {title}

                    </p>

                    <p className="text-3xl font-bold text-slate-900 mt-2">

                        {value}

                    </p>

                </div>


                <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}
                >

                    <Icon
                        size={22}
                        className={iconColor}
                    />

                </div>

            </div>

        </div>

    );
}


/*
|--------------------------------------------------------------------------
| Request Card
|--------------------------------------------------------------------------
*/

function RequestCard({
    title,
    value,
    icon: Icon,
    iconBg,
    iconColor,
}) {

    return (

        <div className="bg-white border border-slate-200 rounded-2xl p-6">

            <div className="flex items-center gap-4">

                <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}
                >

                    <Icon
                        size={22}
                        className={iconColor}
                    />

                </div>


                <div>

                    <p className="text-sm text-slate-500">

                        {title}

                    </p>

                    <p className="text-2xl font-bold text-slate-900 mt-1">

                        {value}

                    </p>

                </div>

            </div>

        </div>

    );
}




export default AdminDashboard;