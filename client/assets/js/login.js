$('#signin').click(function () {
    axios.post('http://localhost:3000/log/signin', {
            username: $('#user_signin').val(),
            email: $('#email_signin').val(),
            password: $('#password_signin').val()
        })
        .then(res => {
            localStorage.setItem('token', res.data.user.token)
            window.location.href = 'dashboard.html'
        })
        .catch(err => {
            console.log(err)
        })
})

function logout() {
    localStorage.clear()
    window.location.href = 'index.html'
}