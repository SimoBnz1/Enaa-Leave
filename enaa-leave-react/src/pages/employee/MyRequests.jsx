import { useEffect, useState } from "react";
import { CalendarDays, Clock, CheckCircle, XCircle } from "lucide-react";

import Layout from "../../components/layout/Layout";
import { getEmployeeRequests } from "../../services/leaveService";

function MyRequests() {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadRequests();
    }, []);

    async function loadRequests() {

        try {

            const data = await getEmployeeRequests();

            setRequests(data.requests);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    }

    function getStatus(status) {

        if (status === "pending_manager") {
            return {
                label: "En attente du manager",
                className: "bg-amber-50 text-amber-600",
                icon: Clock,
            };
        }

        if (status === "pending_hr") {
            return {
                label: "En attente des RH",
                className: "bg-blue-50 text-blue-600",
                icon: Clock,
            };
        }

        if (status === "approved") {
            return {
                label: "Approuvée",
                className: "bg-green-50 text-green-600",
                icon: CheckCircle,
            };
        }

        if (status === "rejected") {
            return {
                label: "Refusée",
                className: "bg-red-50 text-red-600",
                icon: XCircle,
            };
        }

        return {
            label: status,
            className: "bg-slate-100 text-slate-600",
            icon: Clock,
        };
    }

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
                    Mes demandes
                </h1>

                <p className="text-slate-500 mt-1">
                    Consultez et suivez vos demandes de congé.
                </p>

            </div>


            {/* Error */}
            {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl mb-5">
                    {error}
                </div>
            )}


            {/* Empty */}
            {!error && requests.length === 0 && (

                <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">

                    <CalendarDays
                        size={40}
                        className="mx-auto text-slate-300"
                    />

                    <h2 className="font-semibold text-slate-800 mt-4">
                        Aucune demande
                    </h2>

                    <p className="text-sm text-slate-400 mt-1">
                        Vous n'avez pas encore créé de demande.
                    </p>

                </div>
            )}


            {/* Requests */}
            <div className="space-y-4">

                {requests.map((request) => {

                    const status = getStatus(request.status);

                    const StatusIcon = status.icon;

                    return (

                        <div
                            key={request.id}
                            className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-sm transition"
                        >

                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                {/* Left */}
                                <div>

                                    <div className="flex items-center gap-3">

                                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">

                                            <CalendarDays
                                                size={20}
                                                className="text-blue-600"
                                            />

                                        </div>

                                        <div>

                                            <h2 className="font-semibold text-slate-900">
                                                {getLeaveType(request.leave_type)}
                                            </h2>

                                            <p className="text-sm text-slate-400">
                                                Demande #{request.id}
                                            </p>

                                        </div>

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


                                    {/* Reason */}
                                    <p className="text-sm text-slate-500 mt-3">
                                        {request.reason}
                                    </p>

                                </div>


                                {/* Status */}
                                <div>

                                    <span
                                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium ${status.className}`}
                                    >

                                        <StatusIcon size={16} />

                                        {status.label}

                                    </span>

                                </div>

                            </div>

                        </div>

                    );
                })}

            </div>

        </Layout>
    );
}

export default MyRequests;