import React, { createContext, useContext, useState, useEffect } from 'react';
import { TutorApplication } from '../types/application';
import axios from 'axios';

interface TutorApplicationContextType {
  applications: TutorApplication[];
  addApplication: (application: TutorApplication) => void;
  updateApplication: (
  id: string,
  updates: Partial<TutorApplication>
) => Promise<void>;
  getApplications: () => TutorApplication[];
  deleteApplication: (id: string) => void;
}

const TutorApplicationContext = createContext<TutorApplicationContextType | undefined>(undefined);

export function TutorApplicationProvider({ children }: { children: React.ReactNode }) {
  const [applications, setApplications] = useState<TutorApplication[]>([]);

  useEffect(() => {
    
    (async () => {
      try {
        const {data} = await axios.get<TutorApplication[]>(
          '/api/lecturer/applications',
          {withCredentials: true}
        );
        setApplications(data);
      } catch (error) {
        console.log(error)
      }
    })()
  }, []);

  const addApplication = async (application: TutorApplication): Promise<void> => {
    await axios.post('/api/applications',
      application,
      {withCredentials: true}
    );
    setApplications((prev) => [...prev, application]);
  }


  const updateApplication = async (id: string, updatedApplication: Partial<TutorApplication>): Promise<void> => {
    const {data: updated} = await axios.put<TutorApplication>(
      `/api/applications/${id}`,
      updatedApplication,
      {withCredentials: true}
    );
    setApplications((prev) => 
      prev.map((app) => (app.id == id ? updated : app))
      );
    };

  const getApplications = () => {
    return applications;
  };

  const deleteApplication = async (id: string): Promise<void> => {
   await axios.delete(`/api/applications/${id}`, {withCredentials: true});
   setApplications((prev) => prev.filter((app) => app.id !== id));
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