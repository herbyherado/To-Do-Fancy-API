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
        console.log(response.authResponse.accessToken)
        localStorage.setItem('token', response.authResponse.accessToken)
        // window.location.href = 'dashboard.html'
    } else {
        console.log('user is not logged in')
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
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
            axios.post('http://localhost:3000/log/fb', {}, {
                headers: {token: response.authResponse.accessToken}
            })
            .then(res => {
                localStorage.setItem('token', res.data.token)
                axios.post('http://localhost:3000/log/verify', {},{
                    headers: {token: localStorage.getItem('token')}
                })
                .then(response => {
   
                    window.location.href = "dashboard.html"
                })
                .catch(error => {
                    // window.location.href= 'index.html'
                })
            })
            .catch(err => {
                console.log(err)
            })
        } else {
         console.log('User cancelled login or did not fully authorize.');
        }
    }, {scope:'email'});
}