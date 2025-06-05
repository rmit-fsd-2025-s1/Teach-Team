export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    isLecturer: boolean;
    isBlocked?: boolean;
    selectionCount: number;
};

export const TEST_USERS: User[] = [
    { id: "1",  name: "John Doe", email: "tutor@rmit.edu.au", password: "password1", isLecturer: false, selectionCount: 5 },
    { id: "2", name: "Jane Doe", email: "lecturer@rmit.edu.au", password: "password2", isLecturer: true, selectionCount: 0 },
    { id: "3", name: "Test User", email: "test@rmit.edu.au", password: "password3", isLecturer: false, selectionCount: 1 },

    { id: "4", name: "Test User2", email: "test2@rmit.edu.au", password: "password4", isLecturer: false, selectionCount: 0 },
    { id: "5", name: "Test User3", email: "test3@rmit.edu.au", password: "password5", isLecturer: false, selectionCount: 0 },
    { id: "6", name: "Test User4", email: "test4@rmit.edu.au", password: "password6", isLecturer: false, selectionCount: 0 },
]