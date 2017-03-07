app.use(function *() {

    var options = {
    	url: 'https://api.github.com/repos/dionoid/koa-request',
        headers: { 'User-Agent': 'request' }
    };

    var response = yield request(options); //Yay, HTTP requests with no callbacks!
    var info = JSON.parse(response.body);

    this.body = 'my full name is ' + info.full_name;
});
