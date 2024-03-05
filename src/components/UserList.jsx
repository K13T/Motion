import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css';
import MyImage from './logo.png';

const UserList = () => {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);

    const fetchData = async () => {
        try {
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

    const Chi_So_BMI = (weight, height) => {
        return (weight / (height * height)).toFixed(2);
    };

    const handleUserClick = (password) => {
        setSelectedUser(password);
        setSearching(false);
    };

    const handleBack = () => {
        setSelectedUser(null);
    };

    const handleCancelSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
        setSearching(false);
        setSelectedUser(null);
    };

    const handleSearch = () => {
        if (!searchTerm) {
            alert('Vui lòng nhập ID người dùng');
            return;
        }

        const result = Object.keys(userData).find(password => password === searchTerm);

        if (!result) {
            alert('Không tìm thấy người dùng với ID này');
            return;
        }

        setSelectedUser(result);
        setSearching(true);
    };

    const handleDelete = async () => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
            return;
        }

        try {
            await axios.post('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-khcpn/endpoint/log_in', {
                deleteUser: selectedUser
            });
            fetchData();
            setSelectedUser(null);
        } catch (error) {
            console.error('Lỗi khi xóa người dùng:', error);
            alert('Không thể xóa người dùng. Vui lòng thử lại sau.');
        }
    };

    return (
        <div className="user-list-container">
            <h2>ALL USERS</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="NHẬP ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>SEARCH</button>
                {searching && <button onClick={handleCancelSearch} style={{ marginLeft: '10px', marginRight: '10px' }}>CANCEL</button>}
            </div>

            {error && <p className="error-message">{error}</p>}
            {selectedUser ? (
                <div className="user-details">
                    <div className="avatar-placeholder">
                        <img src={MyImage} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="user-info">
                        <p style={{ fontSize: '26px', fontWeight: 'bold' }}><strong>ID:</strong> {selectedUser}</p>
                        <p style={{ fontSize: '26px', fontWeight: 'bold' }}><strong>NAME:</strong> {userData[selectedUser]?.['Tên']}</p>
                        <p style={{ fontSize: '22px', fontWeight: 'bold' }}><strong>GENDER:</strong> {userData[selectedUser]?.['Giới tính']}</p>
                        <p style={{ fontSize: '22px', fontWeight: 'bold' }}><strong>HEIGHT:</strong> {userData[selectedUser]?.['Cao']} m</p>
                        <p style={{ fontSize: '22px', fontWeight: 'bold' }}><strong>WEIGHT:</strong> {userData[selectedUser]?.Nặng} kg</p>
                        <p style={{ fontSize: '26px', fontWeight: 'bold' }}><strong>Chỉ Số BMI:</strong> {Chi_So_BMI(userData[selectedUser]?.Nặng, userData[selectedUser]?.['Cao'])}</p>
                        <p style={{ fontSize: '22px', fontWeight: 'bold' }}><strong>LOCATION:</strong> {userData[selectedUser]?.['Nơi sống']}</p>
                        <button style={{ backgroundColor: '#ff0000', color: '#fff', marginRight: '10px' }} onClick={handleDelete}>DELETE</button>
                        <button onClick={handleBack}>BACK</button>
                    </div>
                </div>
            ) : (
                <div className="user-grid">
                    {searching ? (
                        searchResults.map((password, index) => (
                            <div key={password} className="user-card" onClick={() => handleUserClick(password)}>
                                <div className="avatar-placeholder">
                                    <img src={MyImage} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <p style={{ fontSize: '26px', fontWeight: 'bold' }} className="index-label">STT: {index + 1}</p>
                                <p style={{ fontSize: '26px', fontWeight: 'bold' }}><strong>ID :</strong> {password}</p>
                            </div>
                        ))
                    ) : (
                        Object.keys(userData).map((password, index) => (
                            <div key={password} className="user-card" onClick={() => handleUserClick(password)}>
                                <div className="avatar-placeholder">
                                    <img src={MyImage} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <p style={{ fontSize: '26px', fontWeight: 'bold' }} className="index-label">STT: {index + 1}</p>
                                <p style={{ fontSize: '26px', fontWeight: 'bold' }}><strong>ID :</strong> {password}</p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default UserList;
