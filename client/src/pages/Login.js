import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import API from '../utils/API';
import { AuthContext } from '../context/auth-context';

const Login = () => {
  const initialValues = {
    username: "",
    password: ""
  }

  const context = useContext(AuthContext)
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(6).required(),
  })

  const onSubmit = async (data) => {
    try {
      const results = await API.login(data)
      if(results.data.error) {
        throw new Error(results.data.error)
      }
      localStorage.setItem("accessToken", results.data.token)
      context.handleLogin(results.data.name, results.data.username, results.data.UserId)
      navigate('/');
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
              Login
            </div>

            <label className='label'>Username</label>
            <Field autoComplete="off" id="username" name="username" placeholder="Username" />
            <ErrorMessage name="username" component="div" className='error-message'/>

            <label className='label'>Password</label>
            <Field autoComplete="off" id="pasword" name="password" placeholder="Password" type="password" />
            <ErrorMessage name="password" component="div" className='error-message'/>

            <div className='signup__form__footer'>
              <button className="button is-info" type="submit">Login</button>
              <p>Not yet a member? <NavLink className="auth__link" to="/signup">Sign Up now</NavLink></p>
            </div>
          </Form>
      </Formik>
    </article>
  )
}

export default Login;