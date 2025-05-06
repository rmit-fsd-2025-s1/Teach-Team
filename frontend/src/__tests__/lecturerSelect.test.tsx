import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import LecturerPage from '../pages/lecturer';
import { AuthProvider } from '../context/AuthContext';
import { UserProvider } from '../context/UserContext';
import { TutorApplicationProvider } from '../context/TutorApplicationContext';
import '@testing-library/jest-dom';

//This test case verifies that selecting and unselecting an application updates the button label and selection count correctly.

// MOCK: next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// MOCK: localStorage with one tutor
beforeEach(() => {
  Storage.prototype.getItem = jest.fn((key: string) => {
    if (key === 'users') {
      return JSON.stringify([
        {
          id: '1',
          name: 'Test Tutor',
          email: 'tutor@rmit.edu.au',
          password: 'password',
          isAdmin: false,
          selectionCount: 0,
        },
        {
          id: '2',
          name: 'Lecturer',
          email: 'lecturer@rmit.edu.au',
          password: 'password',
          isAdmin: true,
          selectionCount: 0,
        },
      ]);
    }
    if (key === 'currentUser') {
      return JSON.stringify({
        id: '2',
        name: 'Lecturer',
        email: 'lecturer@rmit.edu.au',
        password: 'password',
        isAdmin: true,
        selectionCount: 0,
      });
    }
    if (key === 'tutorApplications') {
      return JSON.stringify([
        {
          id: 'app1',
          name: 'Test Tutor',
          email: 'tutor@rmit.edu.au',
          selectedCourse: 'COSC4321',
          role: 'Tutor',
          previousRoles: '',
          availability: 'full-time',
          skills: 'JavaScript',
          academicCredentials: '',
          dateApplied: '2025-04-10',
          isSelected: false,
        },
      ]);
    }
    return null;
  });

  Storage.prototype.setItem = jest.fn();
  Storage.prototype.removeItem = jest.fn();
});

test('toggles application selection and updates button label and selection count', () => {
  render(
    <ChakraProvider>
      <AuthProvider>
        <UserProvider>
          <TutorApplicationProvider>
            <LecturerPage />
          </TutorApplicationProvider>
        </UserProvider>
      </AuthProvider>
    </ChakraProvider>
  );

  // Find and click the "Select" button
  const selectButton = screen.getByRole('button', { name: /select/i });
  fireEvent.click(selectButton);

  // Button label should change to "Unselect"
  expect(screen.getByRole('button', { name: /unselect/i })).toBeInTheDocument();

  // Selection count should now be 1
  expect(screen.getByText('1')).toBeInTheDocument();

  // Click again to unselect
  const unselectButton = screen.getByRole('button', { name: /unselect/i });
  fireEvent.click(unselectButton);

  // Button label should go back to "Select"
  expect(screen.getByRole('button', { name: /select/i })).toBeInTheDocument();

  // Selection count should be 0 again
  expect(screen.getByText('0')).toBeInTheDocument();
});
