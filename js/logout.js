

    $(function(){

        $.ajax({
            url : "http://localhost:7070/book/session",
            type : "GET",
            dataType : "jsonp",
            jsonp : "callback",

            success : function(result){

                if(!result.result){
                    var out = $("<a href='#' id='logout' data-target='#loginModal' data-toggle='modal'>로그아웃</a>");
                    $("#check").empty();
                    $("#check").append(out);
                }else{
                    var txt = "onclick=document.getElementById('id01').style.display='block'";
                    var in1 = $("<a href='#' id='login' data-target='#loginModal' data-toggle='modal' " +  txt + ">로그인</a>");
                    $("#check").empty();
                    $("#check").append(in1);
                }
            },
            error : function(){

            }
        })

    });


    $(document).on('click', '#logout', function(){


        $.ajax({
            url : "http://localhost:7070/book/logout",
            type : "GET",
            dataType : "jsonp",
            jsonp : "callback",

            success : function(result){

                alert("로그아웃 되었습니다.");

                sessionStorage.login = "logout";
                sessionStorage.removeItem("id");

                var txt = "onclick=document.getElementById('id01').style.display='block'";
                var in1 = $("<a href='#' id='login' " + txt +">로그인</a>");
                $("#check").empty();
                $("#check").append(in1);
            },
            error : function(){
                alert("로그인 에러 발생!!");
            }
        })

    });
