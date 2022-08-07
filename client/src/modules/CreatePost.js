import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import API from '../utils/API';
import { AuthContext } from '../context/auth-context';

const CreatePost = ({setPosts, isOpenHandler}) => {

  const context = useContext(AuthContext)

  const initialValues = {
    title: "",
    body: "",
    username: context.username,
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().max(50).required(),
    body: Yup.string().max(120).required(),
    username: Yup.string().min(3).max(15).required()
  })

  const onSubmit = async (data, { resetForm }) => {
    try {
      const results = await API.createPost(data)
      const returnedResult = results.data;
      const createdPost = {...returnedResult, Likes: []}
      if(results.data.error) {
        throw new Error(results.data.error.message)
      }
      setPosts((prevData) => [createdPost, ...prevData]);
      isOpenHandler();
      resetForm();
    } catch (err) {
      throw err;
    }
  }
  
  return (
    <div className="modal-card">
      <section className='createPost__container media modal-card-body'>
        <figure className='media-left'>
          <p className='image is-64x64'>
            <img 
              alt="profile" 
              style={{objectFit: 'cover', height: '100%'}}
              src={ context.profileUrl ? `${context.profileUrl}` : "https://media.istockphoto.com/vectors/male-silhouette-avatar-default-avatar-profile-picture-photo-vector-id1062562340?k=20&m=1062562340&s=612x612&w=0&h=fxd0ulmCLoER4M8rP8mwG9SChmn46zKjMXkZeEZhYiI="} />
          </p>
        </figure>
        <div className='createPost__content media-content'>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
              <Form className='createPost__form__container'>
                <Field autoComplete="off" id="title" name="title" placeholder="Title" />
                <ErrorMessage name="title" component="div" className='error-message'/>

                <Field autoComplete="off" id="body" name="body" placeholder="Your text here..." />
                <ErrorMessage name="body" component="div" className='error-message'/>

                <div className='form__footer'>
                  <button className='button is-pulled-left is-light' type="reset" onClick={isOpenHandler}>Cancel</button>
                  <button className="button is-pulled-right is-info" type="submit">Submit</button>
                </div>
              </Form>
          </Formik>
        </div>
      </section>
    </div>
  )
}

export default CreatePost;