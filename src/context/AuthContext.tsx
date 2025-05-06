import {createContext, useContext, useEffect, useState} from 'react';
import { User, TEST_USERS } from '../types/User';
import {ReactNode} from 'react';

interface AuthContextType {
    user: User | null
    users: User[];
    login: (email: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const storesUsers = localStorage.getItem('users');
        if (storesUsers) {
            setUsers(JSON.parse(storesUsers));
        } else {
            setUsers(TEST_USERS);
            localStorage.setItem('users', JSON.stringify(TEST_USERS));
        }

        const storedUser = localStorage.getItem('currentUser');
        if(storedUser) {
            setUser(JSON.parse(storedUser));
        }

    }, []);


    const login = (email: string, password: string): boolean => {
        const user = users.find((u) => u.email === email && u.password === password);

        if(user) {
            setUser(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            return true;
        }
        return false;
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
    }

    return (
        <AuthContext.Provider value={{user, users, login, logout}}>
            {children} 
        </AuthContext.Provider>
    );

}

export function useAuth() {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}