import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider } from '../context/AuthContext';
import { ChakraProvider } from '@chakra-ui/react';
import Login from '../pages/login';
import '@testing-library/jest-dom';
import { TEST_USERS } from '../types/User';
import { useRouter } from 'next/router';

//This tests that an invalid login attempt displays an error toast and blocks authentication.

// Mock useRouter explicitly
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock localStorage explicitly
beforeEach(() => {
  Storage.prototype.getItem = jest.fn((key: string) => {
    if (key === 'users') {
      return JSON.stringify(TEST_USERS);
    }
    return null;
  });
  Storage.prototype.setItem = jest.fn();
  Storage.prototype.removeItem = jest.fn();
});

test('displays error toast when logging in with incorrect credentials', async () => {
  render(
    <ChakraProvider>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </ChakraProvider>
  );

  const emailInput = screen.getByPlaceholderText(/Enter your email/i);
  const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
  const submitButton = screen.getByRole('button', { name: /log in/i });

  fireEvent.change(emailInput, { target: { value: 'wronguser@rmit.edu.au' } });
  fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

  fireEvent.click(submitButton);

  // Chakra toasts appear asynchronously; we must query the toast explicitly.
  const toast = await waitFor(() =>
    screen.getByText(/Invalid Email or Password/i, { exact: false })
  );

  expect(toast).toBeInTheDocument();

  // Verify no redirection occurred
  expect(mockPush).not.toHaveBeenCalled();

  // Verify localStorage 'currentUser' was not set
  expect(localStorage.setItem).not.toHaveBeenCalledWith('currentUser', expect.anything());
});
