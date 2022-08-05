import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import API from '../utils/API';

const UpdatePost = ({setPosts, isOpenHandler, title, body, id, posts}) => {

  const initialValues = {
    title: title,
    body: body,
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().max(50).required(),
    body: Yup.string().max(120).required(),
  })

  const onSubmit = async (data, { resetForm }) => {
    try {
      if (data.title === title && data.body === body) {
        return isOpenHandler();
      }
      const results = await API.updatePost(data, id)
      if(results.data.error) {
        throw new Error(results.data.error.message)
      }
      const updatedPost = posts.map(post => {
        if (post.id === id) {
          return {...post, title: data.title, body: data.body}
        }
        return post
      })
      setPosts(updatedPost);
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
            <img alt="profile" src="https://media.istockphoto.com/vectors/male-silhouette-avatar-default-avatar-profile-picture-photo-vector-id1062562340?k=20&m=1062562340&s=612x612&w=0&h=fxd0ulmCLoER4M8rP8mwG9SChmn46zKjMXkZeEZhYiI=" />
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
                  <button className="button is-pulled-right is-info" type="submit">Update</button>
                </div>
              </Form>
          </Formik>
        </div>
      </section>
    </div>
  )
}

export default UpdatePost;