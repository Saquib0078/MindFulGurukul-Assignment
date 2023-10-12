import { useState, useEffect } from 'react';
import axios from 'axios';

function ApiCall() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchData(url) {
    setLoading(true);

    try {
      const response = await axios.get(url);
      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  async function postData(url, body) {
    setLoading(true);

    try {
      const response = await axios.post(url, body);
      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  async function putData(url, body) {
    setLoading(true);

    try {
      const response = await axios.put(url, body);
      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  async function deleteData(url) {
    setLoading(true);

    try {
      await axios.delete(url);
      setData(null);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, fetchData, postData, putData, deleteData };
}

export default ApiCall;
