const loginAction = (email) => ({
  type: 'LOGIN',
  payload: email,
});

// criar actions separas depois como boa pratica

export default loginAction;
