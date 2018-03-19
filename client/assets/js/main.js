function register(){
    $('.ui.modal#reg')
    .modal('show')
    // swal("Welcome!", "You're account has been successfully registered!", "success")
}
function hidethis(){
    $('.ui.modal')
    .modal('hide')
}
function successRegister(){
    swal("Welcome!", "You're account has been successfully registered!", "success")
}
function addUser(){
    event.preventDefault();
    let email = $('.email').val()
    let password = $('.password').val()
    console.log(email, password)

    axios.post('http://localhost:3000/user/register', {
        email: email,
        password: password
    })
    .then(response => {
        console.log(response)
        hidethis()
        successRegister()
    })
    .catch(error => {
        alert(error)
    })
}

function signin(){    
    $('.ui.modal.sign')
    .modal('show')
    // window.location.href = 'dashboard.html'
}

function login(){
    event.preventDefault()
    let email = $('.email-sign').val()
    let password = $('.password-sign').val()

    axios.post('http://localhost:3000/log/signin', {
        email: email,
        password: password
    })
    .then(response => {
        // $('.ui.modal.sign')
        // .modal('hide')
        console.log(response)
        localStorage.setItem('token', response.data.token)
        setTimeout(() => {
            window.location.href = 'dashboard.html'
        }, 4000)
    })
    .catch(error => {
        // alert(error)
        swal(":(", "Please check your email/password", "error")
        console.log(error)
    })
}

function createaccount(){
    $('.ui.modal.sign')
    .modal('hide')

    register()
}