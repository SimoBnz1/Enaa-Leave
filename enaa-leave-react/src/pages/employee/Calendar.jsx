import { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import Layout from "../../components/layout/Layout";
import { getCalendarEvents } from "../../services/calendarService";

function Calendar() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadCalendar();
    }, []);

    async function loadCalendar() {
        try {
            const data = await getCalendarEvents();

            setEvents(data.events);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Layout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">
                    Calendrier 📅
                </h1>

                <p className="text-slate-500 mt-1">
                    Consultez les congés approuvés.
                </p>
            </div>

            {loading && (
                <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
                    <p className="text-slate-500">
                        Chargement du calendrier...
                    </p>
                </div>
            )}

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-5">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5">
                    <FullCalendar
                        plugins={[
                            dayGridPlugin,
                            interactionPlugin
                        ]}
                        initialView="dayGridMonth"
                        events={events}
                        height="auto"
                        locale="fr"
                        firstDay={1}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth"
                        }}
                    />
                </div>
            )}
        </Layout>
    );
}

export default Calendar;