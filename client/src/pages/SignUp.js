import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {NavLink} from 'react-router-dom';
import * as Yup from 'yup';
import API from '../utils/API';

const SignUp = () => {

  const initialValues = {
    name: "",
    username: "",
    password: ""
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(6).required(),
  })

  const onSubmit = async (data) => {
    try {
      const results = await API.signup(data)
      console.log(results.data)
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