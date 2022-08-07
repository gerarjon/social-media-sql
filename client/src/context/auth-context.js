import { createContext } from 'react';

export const AuthContext = createContext({
  name: null,
  username: null,
  UserId: null,
  profileUrl: null,
  handleLogin:(name, username, UserId, profileUrl) => {},
  handleLogout: () => {}
})