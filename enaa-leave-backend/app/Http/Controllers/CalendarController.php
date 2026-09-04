<?php

namespace App\Http\Controllers;

use App\Models\LeaveRequest;
use Illuminate\Http\Request;

class CalendarController extends Controller
{
    public function index(Request $request)
    {
        $requests = LeaveRequest::with('user')
            ->where('status', 'approved')
            ->get();

        $events = $requests->map(function ($request) {

            return [
                'id' => $request->id,
                'title' => 'Congé - ' . $request->user->name,
                'start' => $request->start_date,
                'end' => date(
                    'Y-m-d',
                    strtotime($request->end_date . ' +1 day')
                ),
                'status' => $request->status,
            ];
        });

        return response()->json([
            'events' => $events,
        ]);
    }
}