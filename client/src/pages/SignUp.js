import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {NavLink, useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import API from '../utils/API';
import { AuthContext } from '../context/auth-context';

const SignUp = () => {

  const initialValues = {
    name: "",
    username: "",
    password: ""
  }

  const context = useContext(AuthContext)
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(6).required(),
  })

  const onSubmit = async (data) => {
    try {
      const results = await API.signup(data)
      if(results.data.error) {
        throw new Error(results.data.error)
      } else {
        const login = await API.login(data)
        localStorage.setItem("accessToken", login.data.token)
        context.handleLogin(login.data.name, login.data.username, login.data.UserId)
        navigate('/');
      }
    } catch (err) {
      throw err;
    }
  }
  return (
    <article className='signup__container'>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
          <Form className='signup__form__container'>
            <div className='title has-text-centered'>
              Sign Up
            </div>

            <label className='label'>Name</label>
            <Field autoComplete="off" id="name" name="name" placeholder="John Smith" />
            <ErrorMessage name="name" component="div" className='error-message'/>

            <label className='label'>Username</label>
            <Field autoComplete="off" id="username" name="username" placeholder="Username" />
            <ErrorMessage name="username" component="div" className='error-message'/>

            <label className='label'>Password</label>
            <Field autoComplete="off" id="pasword" name="password" placeholder="Password" type="password" />
            <ErrorMessage name="password" component="div" className='error-message'/>

            <div className='signup__form__footer'>
              <button className="button is-info" type="submit">Sign Up</button>
              <p>Already a member? <NavLink className="auth__link" to="/login">Login now</NavLink></p>
            </div>
          </Form>
      </Formik>
    </article>
  )
}

export default SignUp