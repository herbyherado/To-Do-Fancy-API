// declare FB function
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.fbAsyncInit = function() {
    FB.init({
        appId      : '200690464031554',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.12'
    });
    
    FB.AppEvents.logPageView();   
    
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};

function statusChangeCallback(response) {
    if(response.status === 'connected') {
        window.location.href = 'dashboard.html'
        // testAPI(response)
    } else {
        console.log('user is not logged in')
        // console.log('hello masuk ke else') 
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        console.log(response)   
        console.log('masuk sini?')
        console.log(response, response.authResponse.accessToken)
        // statusChangeCallback(response);
        axios.post('http://localhost:3000/log/fb', {}, {
            headers: {token: response.authResponse.accessToken}
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })

    });
}

function loginfb(){
    FB.login(function(response) {
        if (response.authResponse) {
            console.log(response.authResponse)
         console.log('Welcome!  Fetching your information.... ');
         FB.api('/me', function(response) {
           console.log('Good to see you, ' + response.name + '.');

           setTimeout(function(){
               window.location.href='dashboard.html'
           }, 15000)
         });
        } else {
         console.log('User cancelled login or did not fully authorize.');
        }
    });
}