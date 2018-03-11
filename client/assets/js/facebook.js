window.fbAsyncInit = function() {
    FB.init({
      appId      : '200690464031554',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.12'
    });
      
    FB.AppEvents.logPageView();   
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
});


function statusChangeCallback(response) {
    if(response.status === 'connected') {
        testAPI(response)
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        console.log(response)
        statusChangeCallback(response);
    });
}

function testAPI(sCCResponse) {
    FB.api('/me', {fields: ['name', 'email']}, function (res){
        console.log(res)
        console.log(sCCResponse)
        axios.post('http://localhost:3000/log/fb', {
            facebook_id: res.id,
            email: res.email,
            username: res.name,
            fbToken: sCCResponse.authResponse.accessToken
        })
        .then(loginResponse => {
            console.log(loginResponse)
            window.location.href = 'dashboard.html'
        })
        .catch(err => {
            console.log(err)
        })
    })
}