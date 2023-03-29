import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Heroine from './components/Heroine';
import Forbidden from './components/Forbidden';
import Loader from './components/Loader';
import styles from './style';
import { loginSuccess, logoutSuccess, setLoggedInStatus } from './redux/Actions';

const App = () => {
  const [loading, setLoading] = useState(true);
  const loggedIn = useSelector(state => state.loggedIn);
  const dispatch = useDispatch();
  const history = useHistory();
  const [currentUserEmail, setCurrentUserEmail] = useState('');

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/auth', {
          withCredentials: true,
        });

        if (response.status === 200 && response.data.authenticated) {
          dispatch(loginSuccess(response.data.user));
          dispatch(setLoggedInStatus(true));
          setCurrentUserEmail(response.data.user.email);
          await axios.get('http://localhost:3001/api/load', {
            withCredentials: true,
          });

        } else {
          dispatch(logoutSuccess());
          dispatch(setLoggedInStatus(false));
          setCurrentUserEmail('');
        }
      } catch (error) {
        dispatch(logoutSuccess());
        dispatch(setLoggedInStatus(false));

        if (error.response) {
          if (error.response.status === 403) {
            history.push('/forbidden');
          } else if (error.response.status === 400) {
            history.push('/');
          }
        }
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, [dispatch, history]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-primary w-full overflow-hidden min-h-screen flex flex-col">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className="w-full">
          <Navbar />
        </div>
      </div>
      <Switch>
        <Route path="/dashboard">
          {loggedIn ? (
            <div className={`${styles.paddingX} ${styles.flexCenter} flex-1`}>
              <div className="w-full">
                <Dashboard />
              </div>
            </div>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/">
          <div className="bg-primary flex flex-col items-center w-full space-y-4 px-4 mt-36">
            <div className="p-8 rounded-lg shadow-md w-full">
              <h1 className="font-poppins font-semibold ss:text-[52px] text-[48px] text-white ss:leading-[100.8px] leading-[75px] w-full">Welcome</h1>
              {loggedIn && (
                <p className={`${styles.paragraph} max-w-[470px] ml-0`}>You are currently logged in as <span className="font-bold">{currentUserEmail}</span></p>
              )}
              {!loggedIn && (
                <p className={`${styles.paragraph} max-w-[470px] ml-0`}>Please log in to access the dashboard.</p>
              )}
            </div>
            <div className="w-full">
              <Hero />
              <Heroine />
            </div>
          </div>
        </Route>
        <Route path="/forbidden">
          <Forbidden />
        </Route>
        <Redirect to="/forbidden" />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
