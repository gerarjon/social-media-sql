import React, { useContext, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import API from '../utils/API';
import { AuthContext } from '../context/auth-context';
import UploadButton from './UploadButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const stockImage = "https://media.istockphoto.com/vectors/male-silhouette-avatar-default-avatar-profile-picture-photo-vector-id1062562340?k=20&m=1062562340&s=612x612&w=0&h=fxd0ulmCLoER4M8rP8mwG9SChmn46zKjMXkZeEZhYiI=";
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const FILE_SIZE = 10485760;

const CreatePost = ({setPosts, isOpenHandler}) => {
  const fileRef = useRef(null)

  const context = useContext(AuthContext)

  const initialValues = {
    title: "",
    body: "",
    username: context.username,
    file: null
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().max(50).required(),
    body: Yup.string().max(120).required(),
    username: Yup.string().min(3).max(15).required(),
    file: Yup.mixed().notRequired()
    .test("FILE_SIZE", "Uploaded file is too big.", 
      value => !value || (value && value.size <= FILE_SIZE))
    .test("FILE_FORMAT", "File must be JPEG, JPG, or PNG", 
      value => !value || (value && SUPPORTED_FORMATS.includes(value.type)))
  })

  const uploadImage = async (file) => {
    try {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "postImages");
      const image = await axios.post("https://api.cloudinary.com/v1_1/traphouse/image/upload", formData);
      return image.data.secure_url;
    } catch (err) {
      throw err
    }
  };

  const onSubmit = async ( data, { resetForm } ) => {
    try {
      let postData = {};
      if (data.file) {
        postData.imgUrl = await uploadImage(data.file);
      }
      postData.title = data.title;
      postData.body = data.body;
      postData.username = data.username;
      const results = await API.createPost(postData)
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
              src={ context.profileUrl ? `${context.profileUrl}` : {stockImage}} />
          </p>
        </figure>
        <div className='createPost__content media-content'>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({setFieldValue, values}) => (
              <Form className='createPost__form__container'>
                <Field autoComplete="off" id="title" name="title" placeholder="Title" />
                <ErrorMessage name="title" component="div" className='error-message'/>

                <Field autoComplete="off" id="body" name="body" placeholder="Your text here..." />
                <ErrorMessage name="body" component="div" className='error-message'/>

                <input hidden ref={fileRef} id="file" name='file' type='file' 
                  onChange={ (e) => setFieldValue("file", e.currentTarget.files[0]) } />
                <UploadButton file={values.file} />
                <ErrorMessage name="file" component="div" className='error-message'/>

                <div className='form__footer'>
                  <button className='button is-pulled-left is-light' type="reset"
                    onClick={ () => {
                        isOpenHandler();
                        setFieldValue("file", null);
                      }
                    }>Cancel</button>
                  <div className="field is-grouped is-grouped-right">
                    <p className='control'>
                      <button
                        className="button is-primary"
                        type='button'
                        onClick={()=> {
                          fileRef.current.click()
                        }}
                      >
                        <FontAwesomeIcon icon="fa-regular fa-file-image" />
                      </button>
                    </p>
                    <p className='control'>
                      <button className="button is-info" type="submit">Submit</button>
                    </p>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </div>
  )
}

export default CreatePost;