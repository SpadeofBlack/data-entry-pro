"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function TeacherDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // 1. Check the "wristband" we set on the Login page
    const userRole = localStorage.getItem('userRole');

    if (userRole !== 'teacher') {
      // 2. If they aren't a teacher, send them back home!
      router.push("/"); 
    } else {
      // 3. If they ARE a teacher, let them stay
      setIsAuthorized(true);
    }
  }, [router]);

  // While we are checking, show a blank screen or a loading message
  if (!isAuthorized) {
    return <div className="p-20 font-bold text-center">Checking Credentials...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d] p-8 pt-24">
         {/* ... All your Teacher Dashboard Code goes here ... */}
         <h1 className="text-4xl font-extrabold text-[#004590]">Curator Workspace</h1>
         <p>Welcome, Educator.</p>
      </div>
    </>
  );
}