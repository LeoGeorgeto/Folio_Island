import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import { useState } from 'react';

import {Home, About, Projects, Contact} from './pages';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';


const App = () => {
  const [sceneLoaded, setSceneLoaded] = useState(false);

  return (
    <Router>
      <main className='bg-slate-300/20 h-[100vh]'>  
        <ScrollToTop/>
        <Navbar sceneLoaded={sceneLoaded} />
        <Routes>
          <Route path="/" element={<Home setSceneLoaded={setSceneLoaded} />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/projects" element={<Projects />}/>
          <Route path="/contact" element={<Contact />}/>
        </Routes>
        <Footer />
      </main>
    </Router>
  )
}

export default App