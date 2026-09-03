import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { getEmployeeDashboard } from "../../services/employeeService";

function EmployeeDashboard() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {
        try {
            const result = await getEmployeeDashboard();

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
                        Chargement...
                    </p>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="bg-red-50 text-red-600 p-4 rounded-xl">
                    {error}
                </div>
            </Layout>
        );
    }

    return (
        <Layout>

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">
                    Bonjour {data.user.name} 👋
                </h1>

                <p className="text-slate-500 mt-1">
                    Voici un aperçu de votre espace congés.
                </p>
            </div>


            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <p className="text-sm text-slate-500">
                        Solde annuel
                    </p>

                    <p className="text-3xl font-bold text-slate-900 mt-3">
                        {data.balance.total_days}
                    </p>

                    <p className="text-sm text-slate-400 mt-1">
                        jours
                    </p>
                </div>


                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <p className="text-sm text-slate-500">
                        Jours utilisés
                    </p>

                    <p className="text-3xl font-bold text-slate-900 mt-3">
                        {data.balance.used_days}
                    </p>

                    <p className="text-sm text-slate-400 mt-1">
                        jours
                    </p>
                </div>


                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <p className="text-sm text-slate-500">
                        Jours restants
                    </p>

                    <p className="text-3xl font-bold text-blue-600 mt-3">
                        {data.balance.remaining_days}
                    </p>

                    <p className="text-sm text-slate-400 mt-1">
                        jours
                    </p>
                </div>

            </div>


            {/* Requests */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 mt-6">

                <h2 className="font-semibold text-slate-900">
                    Mes dernières demandes
                </h2>

                <p className="text-sm text-slate-400 mt-1 mb-5">
                    Suivez l'état de vos demandes
                </p>


                {data.requests.length === 0 ? (

                    <div className="text-center py-10 text-slate-400">
                        Aucune demande pour le moment
                    </div>

                ) : (

                    <div className="space-y-3">

                        {data.requests.map((request) => (

                            <div
                                key={request.id}
                                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
                            >

                                <div>
                                    <p className="font-medium text-slate-800">
                                        {request.reason}
                                    </p>

                                    <p className="text-sm text-slate-400 mt-1">
                                        {request.start_date} → {request.end_date}
                                    </p>
                                </div>

                                <span className="text-sm font-medium text-blue-600">
                                    {request.status}
                                </span>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </Layout>
    );
}

export default EmployeeDashboard;