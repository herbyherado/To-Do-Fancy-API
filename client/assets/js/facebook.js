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
            axios.post('http://localhost:3000/log/fb', {}, {
                headers: {token: response.authResponse.accessToken}
            })
            .then(res => {

                axios.post('http://localhost:3000/log/verify', {},{
                    headers: {token: localStorage.getItem('token')}
                })
                .then(response => {
                    console.log(response)
                    console.log('hello')
                    setTimeout(()=> {
                        window.location.href = "dashboard.html"
                    },10)
                })
                .catch(error => {
                    window.location.href= 'index.html'
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