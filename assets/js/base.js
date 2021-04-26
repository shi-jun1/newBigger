

    $.ajaxPrefilter(function (options) {
        //在ajax请求之前拼接
        options.url = 'http://api-breakingnews-web.itheima.net' + options.url
        
        if (options.url.indexOf('/my')!==-1) {
            options.headers={
                Authorization:localStorage.getItem('token') || ''
            }
        }
    })
