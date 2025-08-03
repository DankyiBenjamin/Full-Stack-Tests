import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import API from './services/api';

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<div>Home</div>} />
//       <Route path="/login" element={<div>Login</div>} />
//       <Route path="/register" element={<div>Register</div>} />
//     </Routes>
//   );
// }


function App() {
  useEffect(() => {
    API.get('ping/')
      .then(res => console.log('Backend says:', res.data))
      .catch(err => console.error('API error:', err));
  } , [])
}

export default App;
