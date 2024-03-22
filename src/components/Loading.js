import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import 'react-quill/dist/quill.snow.css';
import apiClient from '../utils/api';

const LoadingIndicator = () => {
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const requestInterceptor = apiClient.interceptors.request.use((config) => {
        setLoading(true);
        return config;
      });
  
      const responseInterceptor = apiClient.interceptors.response.use(
        (response) => {
          setLoading(false);
          return response;
        },
        (error) => {
          setLoading(false);
          return Promise.reject(error);
        }
      );
  
      return () => {
        apiClient.interceptors.request.eject(requestInterceptor);
        apiClient.interceptors.response.eject(responseInterceptor);
      };
    }, []);
  
    return loading ? (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <CircularProgress />
      </div>
    ) : null;
  }

  export default LoadingIndicator;