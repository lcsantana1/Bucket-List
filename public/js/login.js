const loginFormHandler = async (event) => {
  console.log('submit')
  event.preventDefault();

  const email = document.getElementById('email-login').value.trim();
  const password = document.getElementById('password-login').value.trim();

  if (email && password) {
    console.log('email & passwords')
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log("logged in")
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};



document.getElementById('login-form')
  .addEventListener('submit', loginFormHandler);


