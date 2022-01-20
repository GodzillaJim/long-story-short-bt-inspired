import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { RootState } from '../redux/combineReducers';

const Dashboard = () => {
  const { authToken } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (authToken === '') {
      const data = sessionStorage.getItem('data');
      if (data) {
        const { token } = JSON.parse(data);
        if (token && token !== '') {
          if (location.pathname !== '/login') {
            const redirect = location.pathname;
            navigate(`/login?redirect=${redirect}`);
          }
        }
      }
    }
  }, [authToken, location, navigate]);
  return <div>Hello world</div>;
};

export default Dashboard;
