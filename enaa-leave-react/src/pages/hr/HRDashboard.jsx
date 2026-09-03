import { useEffect, useState } from "react";

import {
    CalendarDays,
    CheckCircle,
    XCircle,
    Clock,
} from "lucide-react";

import Layout from "../../components/layout/Layout";

import {
    getHRDashboard,
    approveLeaveRequest,
    rejectLeaveRequest,
} from "../../services/hrService";


function HRDashboard() {

    const [requests, setRequests] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [actionLoading, setActionLoading] = useState(null);


    /*
    |--------------------------------------------------------------------------
    | Charger les demandes
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        loadRequests();

    }, []);


    async function loadRequests() {

        try {

            const data = await getHRDashboard();

            setRequests(data.requests);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    }


    /*
    |--------------------------------------------------------------------------
    | Accepter
    |--------------------------------------------------------------------------
    */

    async function handleApprove(id) {

        try {

            setActionLoading(id);

            await approveLeaveRequest(id);

            setRequests(
                requests.filter(
                    (request) => request.id !== id
                )
            );

        } catch (error) {

            setError(error.message);

        } finally {

            setActionLoading(null);

        }
    }


    /*
    |--------------------------------------------------------------------------
    | Refuser
    |--------------------------------------------------------------------------
    */

    async function handleReject(id) {

        try {

            setActionLoading(id);

            await rejectLeaveRequest(id);

            setRequests(
                requests.filter(
                    (request) => request.id !== id
                )
            );

        } catch (error) {

            setError(error.message);

        } finally {

            setActionLoading(null);

        }
    }


    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (

            <Layout>

                <div className="flex items-center justify-center h-64">

                    <p className="text-slate-500">

                        Chargement des demandes...

                    </p>

                </div>

            </Layout>

        );

    }


    return (

        <Layout>


            {/* Header */}

            <div className="mb-8">

                <h1 className="text-2xl font-bold text-slate-900">

                    Dashboard RH

                </h1>

                <p className="text-slate-500 mt-1">

                    Gérez les demandes de congé validées par les managers.

                </p>

            </div>


            {/* Erreur */}

            {error && (

                <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl mb-5">

                    {error}

                </div>

            )}


            {/* Statistiques */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">


                {/* En attente */}

                <div className="bg-white border border-slate-200 rounded-2xl p-6">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-slate-500">

                                Demandes en attente

                            </p>

                            <p className="text-3xl font-bold text-slate-900 mt-2">

                                {requests.length}

                            </p>

                        </div>


                        <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center">

                            <Clock
                                size={22}
                                className="text-amber-600"
                            />

                        </div>

                    </div>

                </div>


                {/* À traiter */}

                <div className="bg-white border border-slate-200 rounded-2xl p-6">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-slate-500">

                                À traiter

                            </p>

                            <p className="text-3xl font-bold text-blue-600 mt-2">

                                {requests.length}

                            </p>

                        </div>


                        <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center">

                            <CalendarDays
                                size={22}
                                className="text-blue-600"
                            />

                        </div>

                    </div>

                </div>


                {/* Service RH */}

                <div className="bg-white border border-slate-200 rounded-2xl p-6">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-slate-500">

                                Service RH

                            </p>

                            <p className="text-lg font-semibold text-green-600 mt-3">

                                Actif

                            </p>

                        </div>


                        <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center">

                            <CheckCircle
                                size={22}
                                className="text-green-600"
                            />

                        </div>

                    </div>

                </div>

            </div>


            {/* Liste */}

            <div className="bg-white border border-slate-200 rounded-2xl">


                <div className="p-6 border-b border-slate-100">

                    <h2 className="font-semibold text-slate-900">

                        Demandes à valider

                    </h2>

                    <p className="text-sm text-slate-400 mt-1">

                        Vérifiez les demandes avant validation finale.

                    </p>

                </div>


                {requests.length === 0 ? (

                    <div className="text-center py-16">

                        <CheckCircle
                            size={45}
                            className="mx-auto text-green-300"
                        />

                        <h3 className="font-semibold text-slate-800 mt-4">

                            Aucune demande à traiter

                        </h3>

                        <p className="text-sm text-slate-400 mt-1">

                            Toutes les demandes ont été traitées.

                        </p>

                    </div>

                ) : (

                    <div className="divide-y divide-slate-100">

                        {requests.map((request) => (

                            <div
                                key={request.id}
                                className="p-6"
                            >

                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">


                                    {/* Informations */}

                                    <div className="flex-1">


                                        <div className="flex items-center gap-3">

                                            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">

                                                <CalendarDays
                                                    size={21}
                                                    className="text-blue-600"
                                                />

                                            </div>


                                            <div>

                                                <h3 className="font-semibold text-slate-900">

                                                    {request.user?.name}

                                                </h3>

                                                <p className="text-sm text-slate-400">

                                                    Demande #{request.id}

                                                </p>

                                            </div>

                                        </div>


                                        {/* Type */}

                                        <div className="mt-4">

                                            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">

                                                {getLeaveType(
                                                    request.leave_type
                                                )}

                                            </span>

                                        </div>


                                        {/* Dates */}

                                        <div className="flex items-center gap-2 mt-4 text-sm text-slate-600">

                                            <CalendarDays size={16} />

                                            <span>
                                                {request.start_date}
                                            </span>

                                            <span className="text-slate-300">
                                                →
                                            </span>

                                            <span>
                                                {request.end_date}
                                            </span>

                                        </div>


                                        {/* Motif */}

                                        <p className="text-sm text-slate-500 mt-3">

                                            <span className="font-medium text-slate-700">

                                                Motif :

                                            </span>{" "}

                                            {request.reason}

                                        </p>


                                        {/* Remplacement */}

                                        {request.replacement_plan && (

                                            <p className="text-sm text-slate-500 mt-2">

                                                <span className="font-medium text-slate-700">

                                                    Remplacement :

                                                </span>{" "}

                                                {request.replacement_plan}

                                            </p>

                                        )}

                                    </div>


                                    {/* Actions */}

                                    <div className="flex flex-col sm:flex-row gap-3">


                                        <button
                                            onClick={() =>
                                                handleReject(request.id)
                                            }
                                            disabled={
                                                actionLoading === request.id
                                            }
                                            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-red-200 text-red-600 font-medium hover:bg-red-50 transition disabled:opacity-50"
                                        >

                                            <XCircle size={18} />

                                            Refuser

                                        </button>


                                        <button
                                            onClick={() =>
                                                handleApprove(request.id)
                                            }
                                            disabled={
                                                actionLoading === request.id
                                            }
                                            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition disabled:opacity-50"
                                        >

                                            <CheckCircle size={18} />

                                            {actionLoading === request.id
                                                ? "Traitement..."
                                                : "Approuver"
                                            }

                                        </button>


                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>


        </Layout>

    );

}


/*
|--------------------------------------------------------------------------
| Type de congé
|--------------------------------------------------------------------------
*/

function getLeaveType(type) {

    if (type === "annual") {
        return "Congé annuel";
    }

    if (type === "sick") {
        return "Congé maladie";
    }

    if (type === "exceptional") {
        return "Congé exceptionnel";
    }

    return type;
}


export default HRDashboard;