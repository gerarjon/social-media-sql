import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Post from './pages/Post'
// import Profile from './pages/Profile'
import 'bulma/css/bulma.min.css';
import Navbar from './modules/Navbar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import { AuthContext } from './context/auth-context'
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faHeart, faUser, faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart, faComment, faTrashCan } from '@fortawesome/free-regular-svg-icons'

library.add(fab, faHeart, farHeart, faUser, faRightFromBracket, faComment, faTrashCan)

function App() {
	const [isActive, setIsActive] = useState(false)
	const [authState, setAuthState] = useState({
		name: null,
		username: null,
		UserId: null
	})

	const handleLogin = (name, username, UserId) => {
		setAuthState({name: name, username: username, UserId:UserId});
	}

	const handleLogout = () => {
		setAuthState({name:null , username:null, UserId: null})
		localStorage.removeItem('accessToken')
	}


	useEffect(() => {
		axios
		.get('/api/user', { 
			headers: { 
				accessToken: localStorage.getItem("accessToken")
			}
		})
		.then((res) => {
			if (res.data.error) {
				setAuthState({
					name: null,
					username: null,
					UserId: null
				})
			} else {
				setAuthState({
					name: res.data.name,
					username: res.data.username,
					UserId: res.data.id
				})
			}
		})
	}, []);

	const isActiveHandle = () => {
		setIsActive(!isActive)
	}

  return (
		<AuthContext.Provider 
			value={{ 
				name: authState.name, 
				username: authState.username, 
				UserId: authState.UserId, 
				handleLogin: handleLogin,
				handleLogout: handleLogout
			}}
		>
			<Navbar
				isActive={isActive}
				isActiveHandle={isActiveHandle}
			/>
			<main >
				<Routes>
					<Route path='/' element={<Home />}/>
					<Route path='/post/:id' element={<Post />} />
					<Route path='/login' element={authState.UserId ? <Navigate replace to ='/' /> : <Login />} />
					<Route path='/signup' element={authState.UserId ? <Navigate replace to ='/' /> : <SignUp />}/>
					{/* <Route path='/user/:id' element={<User />} /> */}
					<Route path='*' element={<ErrorPage />} />
				</Routes>
			</main>
		</AuthContext.Provider>
  );
}

export default App;
