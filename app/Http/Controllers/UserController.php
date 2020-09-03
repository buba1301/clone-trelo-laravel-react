<?php

namespace App\Http\Controllers;

use App\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
          'first_name' => 'required|string|max:255',
          'last_name' => 'required|string|max:255',
          'email' => 'required|string|unique:App\User,email|email:rfc,dns|max:255',
          'password' => 'required|string|min:6|confirmed'
      ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create([
            'first_name' => $request->get('first_name'),
            'last_name' => $request->get('last_name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
        ]);


        $token = JWTAuth::fromUser($user);

        return response()->json(
            compact('user', 'token'),
            201,
        );
    }

    public function authenticate(Request $request)
    {
      $credentials = $request->only('email', 'password');

      $user = User::where('email', $request->get('email'))->get();

      try {
          $token = JWTAuth::attempt($credentials);

          if (! $token) {
            return response()->json(['userNotFound' => 'User is not found. Check your email or password.'], 400);
          }
        } catch (JWTException $e) {
            return response()->json(['tokenProblem' => 'could_not_create_token'], 500);
      }
        return response()->json(compact('token', 'user'));
    }

    public function getAuthenticatedUser()
    {
        try {

            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], 401);
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['token_invalid'], 401);
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());
        }

        return response()->json(compact('user'));
    }
}
