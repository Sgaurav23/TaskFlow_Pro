import React, { createContext, useReducer } from 'react';

const initialState = {
  token: localStorage.getItem('token') || '',
  user: null
};

const UserContext = createContext(initialState);

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user
      };
    case 'LOGOUT':
      return {
        ...state,
        token: '',
        user: null
      };
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
