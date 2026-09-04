<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Department;
use App\Models\LeaveRequest;
use App\Models\LeaveBalance;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Dashboard Admin
     */
    public function dashboard(Request $request)
    {
        $users = User::with('roles', 'department')
            ->latest()
            ->get();

        $departments = Department::latest()->get();

        $totalUsers = User::count();

        $totalEmployees = User::role('employee')->count();

        $totalManagers = User::role('manager')->count();

        $totalHR = User::role('rh')->count();

        $pendingRequests = LeaveRequest::whereIn('status', [
            'pending_manager',
            'pending_hr'
        ])->count();

        $approvedRequests = LeaveRequest::where(
            'status',
            'approved'
        )->count();

        $rejectedRequests = LeaveRequest::where(
            'status',
            'rejected'
        )->count();

        return response()->json([
            'statistics' => [
                'total_users' => $totalUsers,
                'total_employees' => $totalEmployees,
                'total_managers' => $totalManagers,
                'total_hr' => $totalHR,
                'pending_requests' => $pendingRequests,
                'approved_requests' => $approvedRequests,
                'rejected_requests' => $rejectedRequests,
            ],

            'users' => $users,

            'departments' => $departments,
        ]);
    }
}