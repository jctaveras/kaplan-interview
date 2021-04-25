import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import '../../styles/pages/logout.css';

import { useGlobalDispatch } from '../../context/global-context';

export default function Logout() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useGlobalDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      sessionStorage.removeItem('token');
      dispatch({
        type: 'USER_SIGNED_OUT',
        payload: undefined
      });

      setIsLoading(false);
    }, 1000);

    return () => clearInterval(timer);
  });

  return(
    <div className="logout-page">
      {isLoading
        ? <Loader
            type="TailSpin"
            color="#035de8"
            height={100}
            width={100}
          />
        : <Redirect to="/login" />
      }
    </div>
  );
}
