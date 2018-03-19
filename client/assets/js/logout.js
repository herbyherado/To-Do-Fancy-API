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
    if(response.status === 'connected' || localStorage.getItem('token')) {
        axios.post('http://localhost:3000/log/verify', {},{
            headers: {token: localStorage.getItem('token')}
        })
        .then(response => {
            console.log(response)
            console.log('hello')
        })
        .catch(error => {
            window.location.href= 'index.html'
        })
        // window.location.href = 'dashboard.html'
    } else {
        console.log('user is not logged in') 
        window.location.href= 'index.html'
    }
}

function logout() {
    FB.logout(function(response) {
        console.log(response)
        statusChangeCallback(response)
    })
    localStorage.removeItem('token')
    window.location.href = 'index.html'
}