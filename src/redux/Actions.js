import axios from 'axios';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SET_LOGGED_IN_STATUS = 'SET_LOGGED_IN_STATUS';

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const setLoggedInStatus = (status) => ({
  type: SET_LOGGED_IN_STATUS,
  payload: status,
});

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3001/api/login", { email, password }, { withCredentials: true });
    const user = response.data.user;
    dispatch(loginSuccess(user));
    dispatch(setLoggedInStatus(true));
    return user;
  } catch (error) {
    return error.response;
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post("http://localhost:3001/api/logout", null, { withCredentials: true });
    dispatch(logoutSuccess());
    dispatch(setLoggedInStatus(false));
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};
