$(function () {
    var lay = layui.form
    //注册与登录框的切换
    // 1.点击去注册按钮
    $('#link_reg').on('click', function () {
        //登录框隐藏
        $('.login-box').hide()
        //注册框显示
        $('.reg-box').show()

    })
     //2.点击登录按钮
     $('#link_login').on('click', function () {
        //登录框显示
        $('.login-box').show()
        //注册框隐藏
        $('.reg-box').hide()

    })
//表单验证规则
    
    lay.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        
        repass: function (value,item) {
            var val = $('#form_reg [name=password]').val().trim()
            if (value !== val) {
                return '两次密码必须一致'
            }
        }
    })
//注册功能
    // 1.点击注册:表单提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        // console.log('11');
        var data =$(this).serialize()
        console.log(data);
        $.ajax({
            method: 'post',
            //这里将根路径放入 ajaxPrefilt
            url: '/api/reguser',
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                  return layui.layer.msg(res.message,{icon:5})
                }
                layui.layer.msg(res.message, { icon: 6 }, function () {
                    //触发去登陆的点击事件 到登录界面
                    $('#link_login')[0].click()
                    //将注册表单清空
                    $('#form_reg')[0].reset()
                })
               
            }
        })
    })

//登录功能
    // 点击登录:表单提交事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        var data = $(this).serialize()
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message,{icon:5})
                }
                layui.layer.msg(res.message, { icon: 6 }, function () {
                    localStorage.setItem('token', res.token)
                    location.href = '/index.html'
                })
            }
        })
    })
})