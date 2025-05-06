import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import LecturerPage from '../pages/lecturer';
import { AuthProvider } from '../context/AuthContext';
import { UserProvider } from '../context/UserContext';
import { TutorApplicationProvider } from '../context/TutorApplicationContext';
import '@testing-library/jest-dom';

//This test case ensures the lecturer can filter applications based on a skill search query.

// MOCK: next/router to prevent useRouter error
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// MOCK: localStorage for users and applications
beforeEach(() => {
  Storage.prototype.getItem = jest.fn((key: string) => {
    if (key === 'users') {
      return JSON.stringify([
        {
          id: '1',
          name: 'Lecturer User',
          email: 'lecturer@rmit.edu.au',
          password: 'password',
          isAdmin: true,
          selectionCount: 0,
        },
      ]);
    }
    if (key === 'currentUser') {
      return JSON.stringify({
        id: '1',
        name: 'Lecturer User',
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
          name: 'Alice',
          email: 'alice@example.com',
          selectedCourse: 'COSC1234',
          role: 'Tutor',
          previousRoles: '',
          availability: 'full-time',
          skills: 'JavaScript, React',
          academicCredentials: '',
          dateApplied: '2025-04-10',
          isSelected: false,
        },
        {
          id: 'app2',
          name: 'Bob',
          email: 'bob@example.com',
          selectedCourse: 'COSC2758',
          role: 'Lab Assistant',
          previousRoles: '',
          availability: 'part-time',
          skills: 'Python, Django',
          academicCredentials: '',
          dateApplied: '2025-04-09',
          isSelected: false,
        },
      ]);
    }
    return null;
  });

  Storage.prototype.setItem = jest.fn();
  Storage.prototype.removeItem = jest.fn();
});

test('filters applications by skills when search is applied', () => {
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

  // Step 1: Select "skills" from the dropdown
  const dropdowns = screen.getAllByRole('combobox');
  const searchCategoryDropdown = dropdowns[0]; // the first one is the search filter
  fireEvent.change(searchCategoryDropdown, { target: { value: 'skills' } });

  // Step 2: Enter "JavaScript" into the search input
  const searchInput = screen.getByPlaceholderText(/search applicants/i);
  fireEvent.change(searchInput, { target: { value: 'JavaScript' } });

  // Step 3: Assert correct row is shown and incorrect one is hidden
  expect(screen.getByText('Alice')).toBeInTheDocument();
  expect(screen.queryByText('Bob')).not.toBeInTheDocument();
});
