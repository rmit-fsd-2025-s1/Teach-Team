import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider, Button, Text } from '@chakra-ui/react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { TEST_USERS } from '../types/User';
import '@testing-library/jest-dom';

//THIS TEST CASES CHECK WHETHER LOCAL STORAGE IS CLEARED ON LOGOUT

//Mock localStorage with a valid logged-in user
beforeEach(() => {
  Storage.prototype.getItem = jest.fn((key: string) => {
    if (key === 'users') {
      return JSON.stringify(TEST_USERS);
    }
    if (key === 'currentUser') {
      return JSON.stringify(TEST_USERS[0]); // John Doe (tutor)
    }
    return null;
  });

  Storage.prototype.setItem = jest.fn();
  Storage.prototype.removeItem = jest.fn();
});

//Custom component to access AuthContext for testing logout
function LogoutTestComponent() {
  const { user, logout } = useAuth();

  return (
    <>
      <Text data-testid="user-email">{user?.email || 'null'}</Text>
      <Button onClick={logout}>Logout</Button>
    </>
  );
}

test('clears user session and localStorage on logout', () => {
  render(
    <ChakraProvider>
      <AuthProvider>
        <LogoutTestComponent />
      </AuthProvider>
    </ChakraProvider>
  );

  //User should initially be logged in
  expect(screen.getByTestId('user-email')).toHaveTextContent(TEST_USERS[0].email);

  //Click logout
  fireEvent.click(screen.getByRole('button', { name: /logout/i }));

  //After logout, user should be null
  expect(screen.getByTestId('user-email')).toHaveTextContent('null');

  //localStorage.clear should be called
  expect(localStorage.removeItem).toHaveBeenCalledWith('currentUser');
});
