'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  isAdmin: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check for admin status
    const urlParams = new URLSearchParams(window.location.search);
    const adminToken = urlParams.get('admin');
    if (adminToken === 'true' || localStorage.getItem('helivex_admin') === 'true') {
      setIsAdmin(true);
      if (adminToken === 'true') localStorage.setItem('helivex_admin', 'true');
    }

    // Persist edit mode across refreshes
    const savedEditMode = localStorage.getItem('helivex_edit_mode');
    if (savedEditMode === 'true') {
      setIsEditMode(true);
    }
  }, []);

  const toggleEditMode = (value: boolean) => {
    setIsEditMode(value);
    localStorage.setItem('helivex_edit_mode', value.toString());
  };

  return (
    <AdminContext.Provider value={{ isEditMode, setIsEditMode: toggleEditMode, isAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
