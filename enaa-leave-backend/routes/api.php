<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ManagerController;
use App\Http\Controllers\HRController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CalendarController;
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Auth
    |--------------------------------------------------------------------------
    */

    Route::post('/logout', [AuthController::class, 'logout']);


    /*
    |--------------------------------------------------------------------------
    | Employee
    |--------------------------------------------------------------------------
    */

    Route::get('/employee/dashboard', [
        EmployeeController::class,
        'dashboard'
    ]);

    Route::post('/employee/leave-requests', [
        EmployeeController::class,
        'storeLeaveRequest'
    ]);

    Route::get('/employee/leave-requests', [
        EmployeeController::class,
        'leaveRequests'
    ]);


    /*
    |--------------------------------------------------------------------------
    | Manager
    |--------------------------------------------------------------------------
    */

    Route::get('/manager/dashboard', [
        ManagerController::class,
        'dashboard'
    ]);

    Route::put('/manager/leave-requests/{id}/approve', [
        ManagerController::class,
        'approve'
    ]);

    Route::put('/manager/leave-requests/{id}/reject', [
        ManagerController::class,
        'reject'
    ]);


    /*
    |--------------------------------------------------------------------------
    | RH
    |--------------------------------------------------------------------------
    */

    Route::get('/hr/dashboard', [
        HRController::class,
        'dashboard'
    ]);

    Route::put('/hr/leave-requests/{id}/approve', [
        HRController::class,
        'approve'
    ]);

    Route::put('/hr/leave-requests/{id}/reject', [
        HRController::class,
        'reject'
    ]);


    /*
    |--------------------------------------------------------------------------
    | Admin
    |--------------------------------------------------------------------------
    */

    Route::get('/admin/dashboard', [
        AdminController::class,
        'dashboard'
    ]);
    Route::get('/calendar', [
    CalendarController::class,
    'index'
]);
});