// // src/App.jsx
// import React from 'react';
// import Chatbot from './components/Chatbot';
// import Nav from './components/Nav';




// const App = () => {
//   return (
//     <div className="App">
//       {/* <h1>College Inquiry Chatbot</h1> */}
//       <Nav />
     
//       <Chatbot />
//     </div>
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chatbot from './components/Chatbot';
import Nav from './components/Nav';
import Dummy from './components/Dummy'; // Adjust the import path as needed

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default Route with Nav and Chatbot */}
          <Route
            path="/"
            element={
              <>
                <Nav />
                <Chatbot />
              </>
            }
          />
          {/* Route for Dummy component */}
          <Route path="/dummy" element={<Dummy />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


