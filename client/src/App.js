import './App.css';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Post from './pages/Post'
// import Profile from './pages/Profile'
import 'bulma/css/bulma.min.css';
import Navbar from './modules/Navbar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

function App() {
	const [isActive, setIsActive] = useState(false)

	const isActiveHandle = () => {
		setIsActive(!isActive)
	}

  return (
		<>
			<Navbar
				isActive={isActive}
				isActiveHandle={isActiveHandle}
			/>
			<main >
				<Routes>
					<Route path='/' element={<Home />}/>
					<Route path='/post/:id' element={<Post />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<SignUp />} />
					{/* <Route path='/user/:id' element={<User />} /> */}
				</Routes>
			</main>
		</>
  );
}

export default App;
