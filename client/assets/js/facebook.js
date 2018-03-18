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

        testAPI(response)
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