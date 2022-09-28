const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.getElementById('exampleNameEmail1').value.trim();
    const email = document.getElementById('emailHelp').value.trim();
    const password = document.getElementById('exampleInputPassword1').value.trim();
    console.log('hello')
    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

document.getElementById('signup-form')
    .addEventListener('submit', signupFormHandler);