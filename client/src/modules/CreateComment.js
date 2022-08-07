import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import API from '../utils/API';
import { AuthContext } from '../context/auth-context';

const stockImage = "https://media.istockphoto.com/vectors/male-silhouette-avatar-default-avatar-profile-picture-photo-vector-id1062562340?k=20&m=1062562340&s=612x612&w=0&h=fxd0ulmCLoER4M8rP8mwG9SChmn46zKjMXkZeEZhYiI=";

const CreateComment = ({setComments, id, commentCountHandler}) => {
  const initialValues = {
    commentBody: "",
  }

  const context = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    commentBody: Yup.string().min(1).max(120).required(),
  })

  const onSubmit = async (data, { resetForm }) => {
    try {
      
      const comment = {...data, PostId: id}
      const result = await API.createComment(comment);
      if(result.data.error) {
        throw new Error(result.data.error.message)
      }
      setComments((prevState) => [result.data, ...prevState]);
      commentCountHandler('addComment');
      resetForm();
    } catch (err) {
      console.log(err)
      throw err;
    }
  }

  return (
    <article className='createComment__container media'>
      <figure className='media-left'>
        <p className='image is-64x64 post__profile__pic'>
          <img 
            alt="profile" 
            style={{objectFit: 'cover', height: '100%'}}
            src={ context.profileUrl ? `${context.profileUrl}` : stockImage} 
            />
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