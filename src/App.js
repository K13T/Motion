import React, { useState } from 'react';
import './App.css';
import Form from './components/Log';
import ThreeScene from './components/Model3D';
import GaugeExample from './components/Gauge';

const App = () => {
  const [currentPage, setCurrentPage] = useState(null);

  const handleButtonClick = (page) => {
    setCurrentPage(page);
  };

  const renderUI = () => {
    switch (currentPage) {
      case 'register':
        return <Form />;
      case 'threeScene':
        return (
          <>
            <ThreeScene />
            {/* <GaugeExample /> */}
          </>
        );
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
        <button onClick={() => handleButtonClick('register')}>Register</button>
        <button onClick={() => handleButtonClick('threeScene')}>Three Scene</button>
        {/* <button onClick={() => setCurrentPage('gaugeExample')}>Gauge Example</button> */}
      </div>

      <div className="form-container">
        {/* Hiển thị UI tương ứng với trang hiện tại */}
        {renderUI()}
      </div>
    </div>
  );
};

export default App;





/////////////////////////////////////////////

// import './App.css';
// import Form from './components/Log';
// import ThreeScene from './components/Model3D';
// import GaugeExample from './components/Gauge';
// function App() {
//   return (
//     <div className="App">
//       <header>
//         <h1 className="app-title">PROFILE MOTION</h1>
//       </header>
//       <main>

//         <div className="form-container">
//           <Form />
//         </div>
//         {/* Comment hoặc xóa dòng dưới để bỏ hiển thị ThreeScene */}
//         <ThreeScene />
//         {/* Comment hoặc xóa dòng dưới để bỏ hiển thị BMI */}
//         {/* <div className="user-list-container">
//           <BMI />
//         </div> */}
//         <GaugeExample />
//       </main>
//     </div>
//   );
// }

// export default App;
