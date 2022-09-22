import { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
  selectorsData: null,
  number: null,
};

let jwtFromStorage = localStorage.getItem("jwtToken");

jwtFromStorage = JSON.parse(jwtFromStorage);
// console.log(jwtFromStorage.user.role);
if (jwtFromStorage) {
  const decodedToken = jwtDecode(jwtFromStorage.token);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
    initialState.token = jwtFromStorage.token;
  }
}

export const AuthContext = createContext({
  user: null,
  selectorsData: null,
  token: null,
  login: (userData) => {},
  logout: () => {},
  selectors: (selectorsData) => {},
  number: (number) => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        ...action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
      };

    case "selectors":
      return {
        ...state,
        selectorsData: action.payload,
      };

    case "number":
      return {
        ...state,
        number: action.payload,
      };

    default:
      return state;
  }
}

export const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem("jwtToken", JSON.stringify(userData));
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: "LOGOUT",
    });
  };

  const selectors = (selectorsData) => {
    dispatch({
      type: "selectors",
      payload: selectorsData,
    });
  };

  const number = (number) => {
    dispatch({
      type: "number",
      payload: number,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        selectorsData: state.selectorsData,
        token: state.token,
        login,
        logout,
        selectors,
        number,
        number1: state.number,
      }}
      {...props}
    ></AuthContext.Provider>
  );
};
