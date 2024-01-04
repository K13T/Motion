import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const [showPassword, setShowPassword] = useState(false);

  const fetchData = async () => {
    try {

      // const response = await axios.get('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-tqlme/endpoint/GET');

      const response = await axios.get('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-khcpn/endpoint/getup');
      setUserData(response.data);
      setError(null);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
      setError('Không thể tải dữ liệu. Vui lòng thử lại sau nha.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    fetchData();
  };

  // const toggleShowPassword = () => {
  //   setShowPassword((prevShowPassword) => !prevShowPassword);
  // };

  const tableCellStyle = {
    fontSize: '1.5em',
    fontWeight: 'bold',
    border: '1px solid black',
    padding: '8px',
  };

};

export default UserList;
