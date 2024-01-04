import './App.css';
import Form from './components/Form';
import ThreeScene from './components/Model3D';
import BMI from './components/BMI';
function App() {
  return (
    <div className="App">
      <header>
        <h1 className="app-title">PROFILE MOTION</h1>
      </header>
      <main>
        <div className="form-container">
          <Form />
        </div>
        <ThreeScene />
        <div className="user-list-container">
          <BMI />
        </div>
      </main>
    </div>
  );
}

export default App;
