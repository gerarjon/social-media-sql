import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Post from './pages/Post'
import 'bulma/css/bulma.min.css';
import Navbar from './modules/Navbar';

function App() {
	const [isActive, setIsActive] = useState(false)

	const isActiveHandle = () => {
		setIsActive(!isActive)
	}

  return (
		<Router>
			<Navbar
				isActive={isActive}
				isActiveHandle={isActiveHandle}
			/>
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
