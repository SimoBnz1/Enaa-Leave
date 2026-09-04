<?php

namespace App\Http\Controllers;

use App\Models\LeaveRequest;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function dashboard(Request $request)
    {
        $user = $request->user();

        $balance = $user->leaveBalances()
            ->where('year', now()->year)
            ->first();

        $requests = $user->leaveRequests()
            ->latest()
            ->take(5)
            ->get();

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],

            'balance' => [
                'total_days' => $balance?->total_days ?? 0,
                'used_days' => $balance?->used_days ?? 0,
                'remaining_days' =>
                    ($balance?->total_days ?? 0) -
                    ($balance?->used_days ?? 0),
            ],

            'requests' => $requests,
        ]);
    }

    public function storeLeaveRequest(Request $request)
    {
        $data = $request->validate([
            'leave_type' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'duration_type' => 'required|in:full_day,half_day',
            'reason' => 'required|string',
            'replacement_plan' => 'nullable|string',
            'attachment' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        $data['user_id'] = $request->user()->id;
        $data['status'] = 'pending_manager';

        if ($request->hasFile('attachment')) {
            $data['attachment'] = $request
                ->file('attachment')
                ->store('leave-attachments', 'public');
        }

        $leaveRequest = LeaveRequest::create($data);

        return response()->json([
            'message' => 'Demande envoyée avec succès',
            'request' => $leaveRequest,
        ], 201);
    }
    public function leaveRequests(Request $request)
{
    $requests = $request->user()
        ->leaveRequests()
        ->latest()
        ->get();

    return response()->json([
        'requests' => $requests,
    ]);
}
}