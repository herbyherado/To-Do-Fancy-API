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

// <form class="ui form">
//   <div class="two fields">
//     <div class="field">
//       <label>Integer</label>
//       <input name="integer" type="text" value="101">
//     </div>
//     <div class="field">
//       <label>E-mail</label>
//       <input name="email" type="text" value="jack">
//     </div>
//   </div>
//   <div class="two fields">
//     <div class="field">
//       <label>Decimal</label>
//       <input name="decimal" type="text" value="1.1.1">
//     </div>
//     <div class="field">
//       <label>Number</label>
//       <input name="number" type="text" value="+200">
//     </div>
//   </div>
//   <div class="two fields">
//     <div class="field">
//       <label>URL</label>
//       <input name="url" type="text" value="ww.fakeurl.com">
//     </div>
//     <div class="field">
//       <label>RegEx</label>
//       <input name="regex" type="text" value="joe">
//     </div>
//   </div>
//   <div class="ui submit button">Submit</div>
//   <div class="ui error message"></div>
// </form>

