import React, { useState } from 'react';
import './App.css';
import Form from './components/Log';
import ThreeScene from './components/Model3D';
import GaugeExample from './components/Gauge';
import Dashboard from './components/Dashboard';
// import UserList from './components/UserList';
const App = () => {
  const [currentPage, setCurrentPage] = useState(null);

  const handleButtonClick = (page) => {
    setCurrentPage(page);
  };

  const renderUI = () => {
    switch (currentPage) {
      case 'infor':
        return <Form />;
      case 'threeScene':
        return (
          <>
            <ThreeScene />

            <GaugeExample />
          </>
        );
      /////////
      case 'Dashboard':
        return <Dashboard />;
      default:
        return null;
    }
  };

  // return (
  //   <div>
  //     <header>
  //       <h1 className="app-title">PROFILE MOTION</h1>

  return (
    <div className="App">
      <header>
        <h1 className="app-title">PROFILE MOTION</h1>
      </header>

      <div className="menu">
        {/* Nút chuyển đổi giữa các trang */}
        <button onClick={() => handleButtonClick('infor')}>Information</button>
        <button onClick={() => handleButtonClick('threeScene')}>ThreeScene</button>
        <button onClick={() => handleButtonClick('Dashboard')}>Dashboard</button>

      </div>

      <div className="form-container">
        {/* Hiển thị UI tương ứng với trang hiện tại */}
        {renderUI()}
      </div>
    </div>
  );
}; export default App;