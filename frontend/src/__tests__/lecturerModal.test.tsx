import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import LecturerPage from '../pages/lecturer';
import { AuthProvider } from '../context/AuthContext';
import { UserProvider } from '../context/UserContext';
import { TutorApplicationProvider } from '../context/TutorApplicationContext';
import '@testing-library/jest-dom';

//This test case confirms that the View Details modal opens, displays applicant info, allows comment editing, and successfully saves updates.

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Setup localStorage mock data
beforeEach(() => {
  Storage.prototype.getItem = jest.fn((key: string) => {
    if (key === 'users') {
      return JSON.stringify([
        {
          id: '1',
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
        id: '1',
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
          email: 'tutor@example.com',
          selectedCourse: 'COSC4321',
          role: 'Tutor',
          previousRoles: 'Lab Assistant',
          availability: 'full-time',
          skills: 'JavaScript, React',
          academicCredentials: 'Bachelor of CS',
          dateApplied: '2025-04-10',
          isSelected: false,
          comments: 'Great candidate',
        },
      ]);
    }
    return null;
  });

  Storage.prototype.setItem = jest.fn();
  Storage.prototype.removeItem = jest.fn();
});

test('opens View Details modal, edits and saves comment', async () => {
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

  // Click the "View Details" button
  const viewDetailsBtn = screen.getByRole('button', { name: /view details/i });
  fireEvent.click(viewDetailsBtn);

  // Wait for modal to appear
  await waitFor(() => {
    expect(screen.getByText(/application details for test tutor/i)).toBeInTheDocument();
  });

  // Confirm comment is pre-filled
  const textarea = screen.getByPlaceholderText(/add your comments here/i);
  expect(textarea).toHaveValue('Great candidate');

  // Edit the comment
  fireEvent.change(textarea, { target: { value: 'Excellent communication skills' } });
  expect(textarea).toHaveValue('Excellent communication skills');

  // Click "Save Comment"
  const saveButton = screen.getByRole('button', { name: /save comment/i });
  fireEvent.click(saveButton);

  // Modal should close after save
  await waitFor(() => {
    expect(screen.queryByText(/application details for test tutor/i)).not.toBeInTheDocument();
  });
});
