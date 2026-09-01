<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // POST /api/login
    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $fields['email'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response()->json([
                'message' => 'Identifiants incorrects.'
            ], 401);
        }

        // Création du token d'accès
        $token = $user->createToken('enaa_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'is_teacher' => $user->is_teacher,
                'roles' => $user->getRoleNames(),
                'department' => $user->department ? $user->department->name : null,
            ]
        ], 200);
    }

    // GET /api/me (Récupérer le profil courant)
    public function me(Request $request)
    {
        $user = $request->user()->load('department');
        
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'is_teacher' => $user->is_teacher,
            'roles' => $user->getRoleNames(),
            'department' => $user->department ? $user->department->name : null,
        ]);
    }

    // POST /api/logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie.'
        ], 200);
    }
}