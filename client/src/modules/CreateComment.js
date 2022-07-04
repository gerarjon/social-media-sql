import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';

const CreateComment = ({setComments, id}) => {
  const initialValues = {
    commentBody: "",
  }

  const validationSchema = Yup.object().shape({
    commentBody: Yup.string().max(120).required(),
  })

  const onSubmit = (data, { resetForm }) => {
    const comment = {...data, PostId: id}
    axios
      .post("/api/comments", comment)
      .then((res) => {
			  setComments((prevState) => [comment, ...prevState])
        resetForm();
      })
  }

  return (
    <article className='createComment__container media'>
      <figure className='media-left'>
        <p className='image is-64x64'>
          <img alt="profile" src="https://bulma.io/images/placeholders/128x128.png" />
        </p>
      </figure>
      <div className='createComment__content media-content'>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
            <Form className='createComment__form__container'>
              <ErrorMessage name="body" component="span" />
              <Field autoComplete="off" id="commentBody" name="commentBody" placeholder="Add a comment" />

              <div className='commentForm__footer'>
                <button className="button is-pulled-right is-info" type="submit">Comment</button>
              </div>
            </Form>
        </Formik>
      </div>
    </article>
  )
}

export default CreateComment;