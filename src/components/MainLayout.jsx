// import { useState } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate, useLocation } from "react-router";

export default function Layout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Convert URL path  page ID
  const currentPage = pathname.replace("/", "") || "dashboard";

  function handleNavigate(page) {
    navigate(`/${page}`);
  }

  return (
    <div className="w-full">
      <Navbar 
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Page Content Area */}
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}
