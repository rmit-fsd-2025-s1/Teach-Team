import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, TEST_USERS } from '../types/User';

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
    // Load users from localStorage on mount
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      setUsers(TEST_USERS);
      localStorage.setItem("users", JSON.stringify(TEST_USERS));
    }
  }, []);

  const updateUser = (email: string, updates: Partial<User>) => {
    console.log('Updating user:', email, 'with:', updates);
    const updatedUsers = users.map(user => {
      if (user.email === email) {
        console.log('Found matching user, updating...');
        return { ...user, ...updates };
      }
      return user;
    });
    console.log('Updated users:', updatedUsers);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
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