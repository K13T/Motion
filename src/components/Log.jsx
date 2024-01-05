import React, { useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import axios from 'axios';
import './Log.css'; // Import file CSS tùy chỉnh

const schema = {
  // title: 'SIGN IN',
  // type: 'object',
  required: ['username', 'password', 'gender', 'height', 'weight', 'age'],
  properties: {
    username: { type: 'string', title: 'HỌ TÊN' },
    password: { type: 'string', title: 'ID', format: 'password' },
    gender: { type: 'string', title: 'GIỚI TÍNH', enum: ['Nam', 'Nữ'] },
    height: { type: 'string', title: 'CHIỀU CAO (m)' },
    weight: { type: 'string', title: 'CÂN NẶNG (kg)' },
    age: { type: 'string', title: 'Tuổi' },
  },
};

const UserLogin = () => {
  const [formData, setFormData] = useState({});

  const handleSubmit = async ({ formData }) => {
    try {
      console.log('Dữ liệu gửi đi:', formData);

      const response = await axios.post('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-khcpn/endpoint/log_in',
        formData
      );

      console.log('Kết quả từ server:', response.data);

      // Reset form sau khi submit thành công
      setFormData({});
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
    }
  };

  return (
    <div className="auth-form-container">
      {/* Thêm một tiêu đề */}
      <h1>THÔNG TIN</h1>

      {/* Sử dụng Form từ thư viện react-jsonschema-form */}
      <Form
        schema={schema}
        validator={validator}
        formData={formData}
        onChange={({ formData }) => setFormData(formData)}
        onSubmit={handleSubmit}
      />

      {/* Thêm chú thích hoặc liên kết cho việc đăng ký */}
      <p>VUI LÒNG ĐIỀN ĐẦY ĐỦ THÔNG TIN BÊN TRÊN NHA !</p>
    </div>
  );
};

export default UserLogin;


