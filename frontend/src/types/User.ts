export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    isLecturer: boolean;
    isBlocked?: boolean;
    selectionCount: number;
    createdAt: Date;
};