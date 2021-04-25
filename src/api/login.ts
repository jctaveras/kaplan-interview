const logIn = (email: string, password: string) => {
  const errors = [
    "We couldn't find an account matching the email address or username, and password you entered.  Please check your email address or username, and password and try again.",
    "What is the airspeed velocity of an unladen swallow?"
    // ... could be any nuber of errors
  ];

  return new Promise((resolve, reject) => {
    // Simulate hitting an API fail or pass 50% of the time
    setTimeout(() => {
      if (Math.round(Math.random() * 1) > 0) {
        reject(errors);
      } else {
        resolve(email);
      }
    }, 1000);
  });
};

export default logIn;
