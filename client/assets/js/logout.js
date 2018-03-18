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
        // window.location.href = 'dashboard.html'
    } else {
        console.log('user is not logged in') 
        window.location.href= 'index.html'
    }
}

function logout() {
    FB.getLoginStatus(function(response) {
        if (response && response.status === 'connected') {
            FB.logout(function(response) {
                console.log('you are logged out mofo')
                setTimeout(function (){
                    window.location.href = 'index.html'
                }, 1000)
            });
        }
    });
}