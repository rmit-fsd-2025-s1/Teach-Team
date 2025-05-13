import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, TEST_USERS } from '../types/User';
import axios from 'axios';


interface UserContextType {
  users: User[];
  updateUser: (email: string, updates: Partial<User>) => void;
  getUserByEmail: (email: string) => User | undefined;
  getUsers: () => User[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get('/api/users', {
          withCredentials: true,
        })
        setUsers(data)
      } catch (error) {
        console.log(error)
      }
    })();
  }, []);

  const updateUser = async (email: string, updates: Partial<User>): Promise<void> => {
    try { 
    const {data: updated} = await axios.put<User>(
      `/api/users/${encodeURIComponent(email)}`,
      updates,
      {withCredentials: true}
    );
    setUsers((prev) => prev.map((user) => (user.email === email ? updated : user)));
  }catch (error) {
    console.log(error)
  }
  };

  const getUserByEmail = (email: string) => {
    return users.find(user => user.email === email);
  };

  const getUsers = () => {
    return users;
  }

  return (
    <UserContext.Provider value={{ users, updateUser, getUserByEmail, getUsers }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 