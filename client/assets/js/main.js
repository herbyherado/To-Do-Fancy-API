function register(){
    console.log('masuk sini woy')
    $('.ui.modal')
    .modal('show')
}

function addUser(){
    $('.ui.form form')
    .form({
        on: 'blur',
        fields: {
        email : {
            identifier: 'email',
            rules: [{
                type: 'email',
                prompt: 'Please enter a valid email'
            }]
        }, 
        }
    });
    let email = $('.email').val()
    let password = $('.password').val()
    
    console.log(email, password)
    $('.ui.modal')
    .modal('hide')
    window.location.href = 'dashboard.html'
}