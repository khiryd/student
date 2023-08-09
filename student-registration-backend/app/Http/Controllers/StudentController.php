<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Student;

class StudentController extends Controller
{
    public function register(Request $request)
    {
    $validatedData = $request->validate([
        'name' => 'required|string',
        'email' => 'required|email|unique:students,email',
        'phone' => 'required|string',
        'documents.*' => 'required|file|mimes:jpeg,png,pdf',
        'subjects.*' => 'required|string',
    ]);

    $student = new Student();
    $student->name = $validatedData['name'];
    $student->email = $validatedData['email'];
    $student->phone = $validatedData['phone'];
    $student->documents = $request->file('documents')->store('documents');
    $student->subjects = $validatedData['subjects'];
    $student->save();

    return response()->json(['message' => 'Registration successful'], 201);
    }
    public function show($id)
    {
    $student = Student::findOrFail($id);

    return response()->json(['student' => $student]);
    }
}


