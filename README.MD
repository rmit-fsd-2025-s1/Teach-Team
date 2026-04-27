# TeamTeam & Admin Dashboard
##LOGIN
###ADMIN
```bash 
username: admin
password: admin
```

###LECTURER
```bash
username: umar@gmail.com
password: MANUNITEd7!

username: hanin@gmail.com
password: MANUNITEd7!

This repository contains two related applications:

**1. TeamTeam:** A role-based RESTful system where tutors can apply for courses and lecturers can view, and manage those applications.

**2. Admin Dashboard:** A separate GraphQL powered interface for administrators to manage users, courses and assign lecturers to course and view statistical reports.

Please use the ##headers to guide you through the process

Team : Umar Imran Shariff - s4032080, Kavil Kanathigoda - s4091503

GitHub Link: https://github.com/rmit-fsd-2025-s1/s4032080-s4091503-a2


# TeachTeam

TeamTeam uses Node, Express, TypeORM and MySQL for the backend, and ChakraUI and Next.js for the frontend.

To run the application you need two terminals, one to run the frontend and one to run the backend. Downloading dependencies and running the server must be done in both terminals.

__**Ensure you are in the root directory**__
```bash
# Terminal 1
cd frontend
# Terminal 2
cd node-express-typeorm
```

Secondly, download the required dependencies for both backend and frontend using:

```bash
npm install
```

then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The backend is available on port 3001 (http://localhost:3001)

## LOGIN
Click the "Get Started" button to log in. Both Tutor and Lecturer accounts can be created in the Sign Up page. Users are also able to view their profile including the account creation date via the "Profile" button in the top left, after you have signed in.

## TUTOR
Once logged in as a tutor, you’ll be presented with a form. Your name and email will be pre-filled based on your login credentials.

You are required to select a course you would wish to tutor, the role you'd like to apply for, availability. Fill out your previous roles, skills, and academic credentials if non-applicable please enter "none" as the answer.

## LECTURER

As the lecturer you can search for suitable applicants based on their availability, skills, name, and course.

You can select suitable applicants and rank them.

You can click on the column headers of COURSE and/or AVAILABILITY to sort the applicants in that regard respectively.

You can view details under the application column to review skills, previous role, and academic credentials.

You can also remove applicants or add comments to their application via the details modal.

Utilise View Visuals to have a pictorial representation of the most or least chosen applicant and view the applicants who were not selected at all.

# ADMIN DASHBOARD
The Admin Dashboard uses Express, TypeORM, MySQL and GraphQL with an Apollo server for the backend and ChakraUI and Next.js for the frontend. 

To run the dashboard you need two terminals, one to run the frontend and one to run the backend. Downloading dependencies and running the server must be done in both terminals.

__*Ensure you are in the root directory*__
```bash
# Terminal 1
cd admin-dashboard/frontend
# Terminal 2
cd admin-dashboard/backend
```
Secondly, download the required dependencies for both backend and frontend using:
```bash
npm install
```
then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:8000](http://localhost:8000) with your browser to see the result.

The backend is available on port 8001 (http://localhost:8001/graphql)

## LOGIN
The landing page will present a login form. Administrators can log in with username: "admin" and password: "admin". 

## ADMINS
Admins are able to create, edit and delete courses. 

They are also able to assign lecturers to current courses. Once a lecturer is assigned a course they will only see applicants that have applied to their course(s). 

Admins are able to block and unblock logins for tutor accounts. 

They can also generate three reports; A list of all chosen candidates, A candidate who has been chosen for more than three courses, and any remaining candidates who have not been chosen for any courses.

Admins are also able to mark certain applicants as unavailable, marking their application as "unavailable" to lecturers. 

# NOTE

## Database Login
Database login details for TeachTeam and Admin Dashboard (data source files already filled):
```
username: S4091503
password: S4091503
database: S4091503
```
The following database has some prefilled data including tutor and lecturer logins, applications, courses and an admin login. Additional lecturer and tutor accounts can be made via the signup page.
```bash
# Tutor Logins
email: tutor@rmit.edu.au
password: TutorPassword1*
----
email: tutor2@rmit.edu.au
password: TutorPassword2*
----
email: tutor3@rmit.edu.au
password: TutorPassword3*

# Lecturer Logins
email: lecturer@rmit.edu.au
password: LecturerPassword1*

# Admin Login (admin dashboard)
email: admin
password: admin
```

# REFERENCES
1. GraphQL Queries, https://graphql.org/learn/queries/ (accessed: 1/06/2025)
2. GenAI, ChatGPT, used to understand GraphQL queries and mutations.