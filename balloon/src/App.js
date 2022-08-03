import './App.css';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  return (
    <>
      {/* <Headers /> */}
      <Navbar />

      <Outlet></Outlet>

      <Footer />
    </>
  );
}

export default App;
