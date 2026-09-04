<?php

namespace App\Http\Controllers;

use App\Models\LeaveRequest;
use Illuminate\Http\Request;

class ManagerController extends Controller
{
    /**
     * Dashboard du manager
     */
    public function dashboard(Request $request)
    {
        $requests = LeaveRequest::with('user')
            ->where('status', 'pending_manager')
            ->latest()
            ->get();

        return response()->json([
            'requests' => $requests,
        ]);
    }

    /**
     * Accepter une demande
     */
    public function approve(Request $request, $id)
    {
        $leaveRequest = LeaveRequest::findOrFail($id);

        // On vérifie que la demande est encore en attente
        if ($leaveRequest->status !== 'pending_manager') {
            return response()->json([
                'message' => 'Cette demande ne peut pas être traitée.'
            ], 400);
        }

        // Après validation du manager
        $leaveRequest->status = 'pending_hr';
        $leaveRequest->save();

        return response()->json([
            'message' => 'Demande acceptée par le manager.',
            'request' => $leaveRequest,
        ]);
    }

    /**
     * Refuser une demande
     */
    public function reject(Request $request, $id)
    {
        $leaveRequest = LeaveRequest::findOrFail($id);

        // On vérifie que la demande est encore en attente
        if ($leaveRequest->status !== 'pending_manager') {
            return response()->json([
                'message' => 'Cette demande ne peut pas être traitée.'
            ], 400);
        }

        $leaveRequest->status = 'rejected';
        $leaveRequest->save();

        return response()->json([
            'message' => 'Demande refusée.',
            'request' => $leaveRequest,
        ]);
    }
}