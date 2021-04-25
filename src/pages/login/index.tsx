import { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import jwt from 'jsonwebtoken';
import Loader from 'react-loader-spinner';
import { v4 as uuidv4 } from 'uuid';

import '../../styles/pages/login.css';
import { useGlobalDispatch } from '../../context/global-context';
import login from '../../api/login';
import ConditionalButton from '../../components/conditional-button';
import Errors from '../../components/error';

interface FormData {
  password: string;
  userLogin: string;
}

export default function Login() {
  const { handleSubmit, register, control } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const formFields = [
    {
      label: 'Email Address or Username',
      type: 'text',
      ref: register('userLogin', {
        required: 'Email address or username is required.',
        pattern: {
          value: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$|\w{4,}/g,
          message: 'Email should be valid or username should have a minimun length of 4 characters'
        }
      })
    },
    {
      label: 'Password',
      type: 'password',
      ref: register('password', {
        required: 'Password is required.',
        minLength: {
          value: 8,
          message: 'This field should have a minimun length of 8 charater.'
        }
      })
    }
  ];
  const dispatch = useGlobalDispatch();

  async function onSubmit(data: FormData) {
    const { userLogin, password } = data;
    try {
      setErrors([]);
      setIsLoading(true);

      const result = await login(userLogin, password);
      
      dispatch({
        type: 'USER_SIGNED_IN',
        payload: {
          userLogin: result as string
        }
      });
      sessionStorage.setItem('token', jwt.sign(
        { currentUser: userLogin },
        'a secret to encode the data',
        { expiresIn: '1h' }
      ));
      setShouldRedirect(true);
    } catch (error) {
      setErrors(errors => errors.concat(error));
      setIsLoading(false);
    }
  }

  return(
    <div className="login-form">
      <div className="form-wrapper">
        {errors.length ? <Errors messages={errors}/> : null}
        <h1 className="page-title">Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {formFields.map(({label, ref, type}) => {
            const id = uuidv4();
            
            return (
              <Fragment key={id}>
                <label htmlFor={id} className="input-label">{label}</label>
                <input
                  {...ref}
                  id={id}
                  type={type}
                />
              </Fragment>
            );
          })}
          <ConditionalButton
            control={control}
            forceDisable={isLoading}
          >
            {isLoading
              ? <Loader
                  type="TailSpin"
                  color="#035de8"
                  height={25}
                  width={25}
                />
              : 'Sign In'}
          </ConditionalButton>
        </form>
      </div>
      {shouldRedirect && <Redirect to="/" />}
    </div>
  );
}
