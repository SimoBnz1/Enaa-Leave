import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import { createLeaveRequest } from "../../services/leaveService";

function NewRequest() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        leave_type: "annual",
        start_date: "",
        end_date: "",
        duration_type: "full_day",
        reason: "",
        replacement_plan: "",
    });

    const [attachment, setAttachment] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleChange(e) {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });
    }

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {

            const formData = new FormData();

            formData.append("leave_type", form.leave_type);
            formData.append("start_date", form.start_date);
            formData.append("end_date", form.end_date);
            formData.append("duration_type", form.duration_type);
            formData.append("reason", form.reason);
            formData.append(
                "replacement_plan",
                form.replacement_plan
            );

            if (attachment) {
                formData.append("attachment", attachment);
            }

            const result = await createLeaveRequest(formData);

            console.log(result);

            setSuccess(
                "Votre demande a été envoyée avec succès."
            );

            setTimeout(() => {
                navigate("/employee/requests");
            }, 1500);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    }

    return (
        <Layout>

            <div className="max-w-3xl mx-auto">

                <div className="mb-8">

                    <h1 className="text-2xl font-bold text-slate-900">
                        Nouvelle demande
                    </h1>

                    <p className="text-slate-500 mt-1">
                        Créez une nouvelle demande de congé.
                    </p>

                </div>


                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-5">
                        {error}
                    </div>
                )}


                {success && (
                    <div className="bg-green-50 text-green-600 p-4 rounded-xl mb-5">
                        {success}
                    </div>
                )}


                <form
                    onSubmit={handleSubmit}
                    className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6"
                >

                    {/* Type */}
                    <div>

                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Type de congé
                        </label>

                        <select
                            name="leave_type"
                            value={form.leave_type}
                            onChange={handleChange}
                            className="w-full border border-slate-300 rounded-xl px-4 py-3"
                        >

                            <option value="annual">
                                Congé annuel
                            </option>

                            <option value="sick">
                                Congé maladie
                            </option>

                            <option value="exceptional">
                                Congé exceptionnel
                            </option>

                        </select>

                    </div>


                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Date début
                            </label>

                            <input
                                type="date"
                                name="start_date"
                                value={form.start_date}
                                onChange={handleChange}
                                required
                                className="w-full border border-slate-300 rounded-xl px-4 py-3"
                            />

                        </div>


                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Date fin
                            </label>

                            <input
                                type="date"
                                name="end_date"
                                value={form.end_date}
                                onChange={handleChange}
                                required
                                className="w-full border border-slate-300 rounded-xl px-4 py-3"
                            />

                        </div>

                    </div>


                    {/* Duration */}
                    <div>

                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Durée
                        </label>

                        <select
                            name="duration_type"
                            value={form.duration_type}
                            onChange={handleChange}
                            className="w-full border border-slate-300 rounded-xl px-4 py-3"
                        >

                            <option value="full_day">
                                Journée complète
                            </option>

                            <option value="half_day">
                                Demi-journée
                            </option>

                        </select>

                    </div>


                    {/* Reason */}
                    <div>

                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Motif
                        </label>

                        <textarea
                            name="reason"
                            value={form.reason}
                            onChange={handleChange}
                            required
                            rows="4"
                            placeholder="Expliquez le motif de votre demande..."
                            className="w-full border border-slate-300 rounded-xl px-4 py-3"
                        />

                    </div>


                    {/* Replacement */}
                    <div>

                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Remplacement / rattrapage
                        </label>

                        <textarea
                            name="replacement_plan"
                            value={form.replacement_plan}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Nom du collègue ou proposition de rattrapage..."
                            className="w-full border border-slate-300 rounded-xl px-4 py-3"
                        />

                    </div>


                    {/* Attachment */}
                    <div>

                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Justificatif
                        </label>

                        <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => {
                                setAttachment(e.target.files[0]);
                            }}
                            className="w-full border border-slate-300 rounded-xl px-4 py-3"
                        />

                        <p className="text-xs text-slate-400 mt-2">
                            PDF, JPG ou PNG — maximum 5 MB
                        </p>

                    </div>


                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition disabled:opacity-50"
                    >
                        {loading
                            ? "Envoi en cours..."
                            : "Envoyer la demande"
                        }
                    </button>

                </form>

            </div>

        </Layout>
    );
}

export default NewRequest;