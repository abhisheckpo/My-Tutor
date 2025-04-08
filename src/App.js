import './App.css';
// import Login from './Components/Login';
// import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Contact from './Components/Contact';
import Home from './Components/Home';
import Summarization from './Frontend/Summarization/Summarization';
import Quiz from './Frontend/Quiz/Quiz';
import FlashCards from './Frontend/FlashCards/FlashCards';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [responseData, setResponseData] = useState(null);

  const setdata = (data) => {
    setResponseData(data);
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        {/* <Route path="/" element={<Signup />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/" element={<Home setfunc={setdata}/>} /> */}
        <Route path="/home" element={<Home setfunc={setdata}/>} />
        <Route path="/contact" element={<Contact response = {responseData} />} />
        <Route path="/summarization" element={<Summarization response={responseData}/>} />
        <Route path="/quiz" element={<Quiz response={responseData}/>} />
        <Route path="/flashcards" element={<FlashCards response={responseData}/>} />
      </Routes>
    </Router>
    
  );
}

export default App;
