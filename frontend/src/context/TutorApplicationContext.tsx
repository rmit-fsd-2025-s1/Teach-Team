import React, { createContext, useContext, useState, useEffect } from 'react';
import { TutorApplication } from '../types/application';

interface TutorApplicationContextType {
  applications: TutorApplication[];
  addApplication: (application: TutorApplication) => void;
  updateApplication: (id: string, updatedApplication: Partial<TutorApplication>) => void;
  getApplications: () => TutorApplication[];
  deleteApplication: (id: string) => void;
}

const TutorApplicationContext = createContext<TutorApplicationContextType | undefined>(undefined);

export function TutorApplicationProvider({ children }: { children: React.ReactNode }) {
  const [applications, setApplications] = useState<TutorApplication[]>([]);

  useEffect(() => {
    // Load applications from localStorage on mount
    const storedApplications = localStorage.getItem("tutorApplications");
    if (storedApplications) {
      setApplications(JSON.parse(storedApplications));
    }
  }, []);

  const addApplication = (application: TutorApplication) => {
    const updatedApplications = [...applications, application];
    setApplications(updatedApplications);
    localStorage.setItem("tutorApplications", JSON.stringify(updatedApplications));
  };

  const updateApplication = (id: string, updatedApplication: Partial<TutorApplication>) => {
    console.log('Updating application:', id, 'with:', updatedApplication);
    const updatedApplications = applications.map((app) => {
      if (app.id === id) {
        console.log('Found matching application, updating...');
        return { ...app, ...updatedApplication };
      }
      return app;
    });
    console.log('Updated applications:', updatedApplications);
    setApplications(updatedApplications);
    localStorage.setItem("tutorApplications", JSON.stringify(updatedApplications));
  };

  const getApplications = () => {
    return applications;
  };

  const deleteApplication = (id: string) => {
    const updatedApplications = applications.filter((app) => app.id !== id);
    setApplications(updatedApplications);
    localStorage.setItem("tutorApplications", JSON.stringify(updatedApplications));
  };
  

  return (
    <TutorApplicationContext.Provider value={{ applications, addApplication, updateApplication, getApplications, deleteApplication }}>
      {children}
    </TutorApplicationContext.Provider>
  );
}

export function useTutorApplication() {
  const context = useContext(TutorApplicationContext);
  if (context === undefined) {
    throw new Error('useTutorApplication must be used within a TutorApplicationProvider');
  }
  return context;
}