import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from '../../contexts/authContext';
import Spinner from 'react-bootstrap/Spinner';
import { LOCAL_STORAGE_TOKEN_NAME } from 'utils/constants';

const ProtectedRoute = ( {Component} ) => {
  const { authState: { authLoading, isAuthenticated } } = useContext(authContext);

  if (authLoading) {
    return (
      <Spinner animation='border' variant='info' />
    );
  }

  return (
    localStorage[LOCAL_STORAGE_TOKEN_NAME] ? (
        <>
          <Component />
        </>
      ) : (
        <Navigate to="/sign-in" />
    )
  );
};

export default ProtectedRoute;