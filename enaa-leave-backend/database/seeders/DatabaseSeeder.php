<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Roles
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $managerRole = Role::firstOrCreate(['name' => 'manager']);
        $rhRole = Role::firstOrCreate(['name' => 'rh']);
        $employeeRole = Role::firstOrCreate(['name' => 'employee']);


        // Admin
        $admin = User::create([
            'name' => 'Admin ENAA',
            'email' => 'admin@enaa.ma',
            'password' => Hash::make('123456'),
        ]);

        $admin->assignRole($adminRole);


        // Manager
        $manager = User::create([
            'name' => 'Manager ENAA',
            'email' => 'manager@enaa.ma',
            'password' => Hash::make('123456'),
        ]);

        $manager->assignRole($managerRole);


        // RH
        $rh = User::create([
            'name' => 'RH ENAA',
            'email' => 'rh@enaa.ma',
            'password' => Hash::make('123456'),
        ]);

        $rh->assignRole($rhRole);


        // Employee
        $employee = User::create([
            'name' => 'Employee ENAA',
            'email' => 'employee@enaa.ma',
            'password' => Hash::make('123456'),
        ]);

        $employee->assignRole($employeeRole);
    }
}