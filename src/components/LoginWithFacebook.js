import React from 'react';
import FacebookLogin from '@greatsumini/react-facebook-login';

const LoginWithFacebook = ({ responseFacebook }) => {
  return (
    <FacebookLogin
      appId="APP_ID"
      onSuccess={responseFacebook}
      onFail={(error) => console.log('Login failed!', error)}
      onProfileSuccess={(response) => console.log('Get Profile Success!', response)}
      render={({ onClick }) => (
        <button onClick={onClick}>
          Login with Facebook
        </button>
      )}
    />
  );
};

export default LoginWithFacebook;