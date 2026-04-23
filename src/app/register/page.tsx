"use client"; // Must be the very first line for Next.js
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function RegisterPage(){
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [studentId, setStudentId] = useState('');
const [role, setRole] = useState('student'); // Default to student
const [teacherName, setTeacherName] = useState('');
const [classTime, setClassTime] = useState('');
const [middleName, setMiddleName] = useState('');

const handleRegister = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        student_id: studentId,
        teacher_name: teacherName,
        class_time: classTime,
        role: role,
      },
    },
  });

  if (error) console.error("Error signing up:", error.message);
  else console.log("User registered:", data);
    // You can redirect the user to the login or dashboard here
  };
return (
    <div className="grid grid-cols-3 gap-4">
  <input placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} className="p-3 bg-slate-100 rounded-lg" />
  <input placeholder="Middle Name" onChange={(e) => setMiddleName(e.target.value)} className="p-3 bg-slate-100 rounded-lg" />
  <input placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} className="p-3 bg-slate-100 rounded-lg" />
<button 
  onClick={handleRegister}
  className="w-full bg-blue-600 text-white p-4 rounded-lg font-bold"
>
  Complete Registration
</button>
</div>
);
};
