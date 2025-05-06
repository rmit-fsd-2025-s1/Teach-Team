# Tutor Application System

A role-based application system built using Next.js and Chakra UI, allowing tutors to apply for courses and lecturers to manage, rank, and review those applications.

Please use the ##headers to guide you through the process

Team : Umar Imran Shariff - s4032080, Kavil Kanathigoda - s4091503

GitHub Link: https://github.com/rmit-fsd-2025-s1/s4032080-s4091503-a1

## Getting Started

First, open the terminal and open the right directory using:

```bash
cd assignment-1
```

Secondly, download the required dependencies,using:

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

## LOGIN
Click the "Get Started" button to log in. We’ve provided a few test users for you below:

    id: "1", name: "John Doe", email: "tutor@rmit.edu.au", password: "password1", Role: tutor
    
    id: "2", name: "Jane Doe", email: "lecturer@rmit.edu.au", password: "password2", Role: lecturer
    
    id: "3", name: "Test User", email: "test@rmit.edu.au", password: "password3", Role: tutor
    
    id: "4", name: "Test User2", email: "test2@rmit.edu.au", password: "password4", Role: tutor
    
    id: "5", name: "Test User3", email: "test3@rmit.edu.au", password: "password5", Role: tutor
    
    id: "6", name: "Test User4", email: "test4@rmit.edu.au", password: "password6", Role: tutor

Depending on the user you've used for login you will either be a tutor or a lecturer.

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

## TESTING

To run unit tests:

```bash
npm run test

```
To run more specific unit tests:

```bash
npm run test -- src/__tests__/lecturerModal.test.tsx
npm run test -- src/__tests__/lecturerSearch.test.tsx
npm run test -- src/__tests__/lecturerSelect.test.tsx
npm run test -- src/__tests__/login.test.tsx

```

The following tests have been implemented for their respective reasons:

lecturerModal.test.tsx: Confirms that the View Details modal opens, displays applicant info, allows comment editing, and successfully saves updates.

lecturerSearch.test.tsx: Ensures the lecturer can filter applications based on a skill search query.

lecturerSelect.test.tsx: Verifies that selecting and unselecting an application updates the button label and selection count correctly.

login.test.tsx: Tests that an invalid login attempt displays an error toast and blocks authentication.

auth.test.tsx: This test case checks whether local storage is cleared on logout

## NOTE
PLEASE MAKE SURE YOU ARE LOCATED IN THE:

"s4032080-s4091503-a1\assignment-1" DIRECTORY

to do this please use upon opening the terminal

```bash
cd assignment-1
```