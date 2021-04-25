import { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { useGlobalDispatch } from '../../context/global-context';
import ConditionalButton from '../../components/conditional-button';

interface FormData {
  userLogin: string;
}

export default function Logout() {
  const { handleSubmit, register, control } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formFields = [
    {
      label: 'New Email Address or Username',
      type: 'text',
      ref: register('userLogin', {
        required: 'Email address or username is required.',
        pattern: {
          value: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$|\w{4,}/g,
          message: 'Email should be valid or username should have a minimun length of 4 characters'
        }
      })
    },
  ];
  const dispatch = useGlobalDispatch();

  function onSubmit(data: FormData) {
    const { userLogin } = data;

    setIsLoading(true);
    dispatch({
      type: 'USER_UPDATED',
      payload: {
        userLogin: userLogin
      }
    });
    sessionStorage.setItem('token', jwt.sign(
      { currentUser: userLogin },
      'a secret to encode the data',
      { expiresIn: '1h' }
    ));
    setShouldRedirect(true);
  }

  return(
    <div className="account-form">
      <div className="form-wrapper">
        <h1 className="page-title">Account</h1>
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
            Save
          </ConditionalButton>
        </form>
      </div>
      {shouldRedirect && <Redirect to="/" />}
    </div>
  );
}
