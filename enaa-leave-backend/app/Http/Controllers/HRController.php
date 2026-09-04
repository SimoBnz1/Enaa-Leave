<?php

namespace App\Http\Controllers;

use App\Models\LeaveRequest;
use Illuminate\Http\Request;

class HRController extends Controller
{
    /**
     * Dashboard RH
     */
    public function dashboard(Request $request)
    {
        $requests = LeaveRequest::with('user')
            ->where('status', 'pending_hr')
            ->latest()
            ->get();

        return response()->json([
            'requests' => $requests,
        ]);
    }

    /**
     * Approuver une demande
     */
    public function approve(Request $request, $id)
    {
        $leaveRequest = LeaveRequest::findOrFail($id);

        if ($leaveRequest->status !== 'pending_hr') {
            return response()->json([
                'message' => 'Cette demande ne peut pas être traitée.'
            ], 400);
        }

        $leaveRequest->status = 'approved';
        $leaveRequest->save();

        return response()->json([
            'message' => 'Demande approuvée par les RH.',
            'request' => $leaveRequest,
        ]);
    }

    /**
     * Refuser une demande
     */
    public function reject(Request $request, $id)
    {
        $leaveRequest = LeaveRequest::findOrFail($id);

        if ($leaveRequest->status !== 'pending_hr') {
            return response()->json([
                'message' => 'Cette demande ne peut pas être traitée.'
            ], 400);
        }

        $leaveRequest->status = 'rejected';
        $leaveRequest->save();

        return response()->json([
            'message' => 'Demande refusée par les RH.',
            'request' => $leaveRequest,
        ]);
    }
}