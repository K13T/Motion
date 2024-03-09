// import React, { useState } from 'react';
// import './App.css';
// import Form from './components/Log';
// import ThreeScene from './components/Model3D';
// import GaugeExample from './components/Gauge';
// import Dashboard from './components/Dashboard';
// import UserList from './components/UserList';
// const App = () => {
//   const [currentPage, setCurrentPage] = useState(null);

//   const handleButtonClick = (page) => {
//     setCurrentPage(page);
//   };

//   const renderUI = () => {
//     switch (currentPage) {
//       case 'infor':
//         return <Form />;
//       case 'threeScene':
//         return (
//           <>
//             <ThreeScene />

//             <GaugeExample />
//           </>
//         );
//       /////////
//       case 'Dashboard':
//         return <Dashboard />;
//       case 'UserList':
//         return <UserList />;
//       default:
//         return null;
//     }
//   }; return (
//     <div className="App">
//       <header>
//         <img
//           src={process.env.PUBLIC_URL + '/logo.png'}
//           alt="Logo"
//           className="app-logo"
//         />
//         <h1 className="app-title"> SIMULATION SYSTEM OF HUMAN MOTION - PART HEAD </h1>
//       </header>

//       <div className="menu">
//         {/* Nút chuyển đổi giữa các trang */}
//         <button style={{ marginRight: '10px' }} onClick={() => handleButtonClick('infor')}>Information</button>
//         <button style={{ marginRight: '10px' }} onClick={() => handleButtonClick('threeScene')}>ThreeScene</button>
//         <button style={{ marginRight: '10px' }} onClick={() => handleButtonClick('Dashboard')}>Dashboard</button>
//         <button onClick={() => handleButtonClick('UserList')}>UserList</button>
//       </div>

//       <div className="form-container">
//         {/* Hiển thị UI tương ứng với trang hiện tại */}
//         {renderUI()}
//       </div>
//     </div>
//   );
// }; export default App;

/////////////////////////////////////

///////////////

// App.js
import React, { useState } from 'react';
import './App.css';
import Form from './components/Log';
import ThreeScene from './components/Model3D';
import GaugeExample from './components/Gauge';
import Dashboard from './components/Dashboard';
import UserList from './components/UserList';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('form');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  const renderUI = () => {
    switch (currentPage) {
      case 'form':
        return <Form />;
      case 'userList':
        return (
          <div className="user-list-container visible">
            <UserList />
          </div>
        );
      case 'userList2':
        return (
          <div className="chartmongo-container visible">
            <Dashboard />
          </div>
        );
      case 'userList3':
        return (
          <div className="user-list-container visible">
            <GaugeExample />
            <ThreeScene />



          </div>
        );
      default:
        return null;
    }
  };

  return (

    <div className="App">
      <header>
        <h1 className="app-title">SIMULATION SYSTEM OF HUMAN MOTION - THE PART HEAD</h1>
        <div className="menu-icon" onClick={toggleMenu}>
          <div className="menu-line" />
          <div className="menu-line" />
          <div className="menu-line" />
          <div className="menu-line" />
        </div>
        <img
          src={process.env.PUBLIC_URL + '/logo.png'}
          alt="Logo"
          className="app-logo"
        />
      </header>
      <main>
        {renderUI()}
      </main>
      <aside className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={() => handleMenuClick('form')}>INFORMATION</li>
          <li onClick={() => handleMenuClick('userList')}>USER LIST</li>
          <li onClick={() => handleMenuClick('userList2')}>DASHBOARD</li>
          <li onClick={() => handleMenuClick('userList3')}>THREE SCENE</li>
        </ul>
      </aside>
    </div>
  );
}

export default App;
