import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Post from './pages/Post'
import 'bulma/css/bulma.min.css';

function App() {

  return (
		<Router>
			<main >
				<Routes>
					<Route path='/' element={<Home />}/>
					<Route path='/post/:id' element={<Post />} />
				</Routes>
			</main>
		</Router>
  );
}

export default App;
