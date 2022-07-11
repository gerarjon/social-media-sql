import { createContext } from 'react';

export const AuthContext = createContext({
  name: null,
  username: null,
  UserId: null,
  handleLogin:(name, username, UserId) => {},
  handleLogout: () => {}
})