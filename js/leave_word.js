var key_pointer=0;
var checked=0;
//获取元素
var btn = document.getElementById("btn");
//var text = btn.previousElementSibling;(另一种获取textarea的写法)
var name=document.getElementById("inputName");
var txt = document.getElementById("inputMessage");
var ul = document.getElementById("pinglun");
btn.onclick = function (e) {

    if ($("#inputName").val()==""||txt.value == "") {//当文本框中没有文字时，提示
        //alert("请输入未填的内容")
    }
    else if(checked==1){

    }
    else {
        //创建元素li作为留言区
        var li = document.createElement("li");

        //将文本框中的内容放到li中,a标签中href中的内容代表什么都不执行
        li.innerHTML =$("#inputName").val()+":"+txt.value
            + "<br>"
            +"&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"
            +"评论时间："
            +getTime()
            +"<br>"
            +"&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"
            +"<a href='javascript:;'class='btn_rep' style='visibility: hidden'>回复</a>"+"&emsp;&emsp;"
            +"<a href='javascript:;'class='btn_del' style='visibility: hidden'>删除</a>"+"<br>"

        var sub_ul = document.createElement("ul");
        sub_ul.className="sub_ul";

        li.insertAdjacentElement("beforeend", sub_ul);
        li.innerHTML+="<br><br>";


        $(" #inputName").val("");
        txt.value = "";//添加之后文本框的内容清空
        //将留言添加到ul中，而且在最上方
        ul.insertBefore(li, ul.children[0]);
        li.className="main_li";
        var main_li_list=document.getElementsByClassName("main_li");
        //当点击ul中的li
        var del=document.getElementsByClassName("btn_del");
        var rep=document.getElementsByClassName("btn_rep");
        if(main_li_list.length>1)
        {
            main_li_list[key_pointer+1].style.backgroundColor="white";
        }
        main_li_list[0].style.backgroundColor="#808080";
        key_pointer=0;

        //循环给每个绑定事件
        for (var i = 0; i < del.length; i++) {
            del[i].onclick = function () {
                //删除当前a标签所在位置的父节点li
                ul.removeChild(this.parentNode);
                checked=0;
                if(key_pointer==main_li_list.length){
                    key_pointer--;
                    if(key_pointer==-1)key_pointer++;
                }
                main_li_list[key_pointer].style.backgroundColor="#808080";

            }
        }



        for (var i = 0; i < rep.length; i++) {
            let sub_ul=document.getElementsByClassName("sub_ul")[i];
            rep[i].onclick = function () {
                if ($("#inputName").val()==""||txt.value == "") {//当文本框中没有文字时，提示
                    //alert("您没有输入内容")
                }
                else
                {
                    var li2= document.createElement("li");
                    li2.innerHTML=$("#inputName").val()+":"+txt.value
                        + "<br>"
                        +"&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"
                        +"回复时间："
                        +getTime()
                        +"<br>"
                        +"<br>";
                    $(" #inputName").val("");
                    txt.value = "";//添加之后文本框的内容清空

                    //console.log(document.getElementsByClassName("sub_ul")[i]);

                    //删除当前a标签所在位置的父节点li
                    sub_ul.insertBefore(li2,sub_ul.children[0]);
                }

            }
        }


        document.onkeydown = function(e){
            if(checked==0){
                if(e.key==="ArrowDown"&&key_pointer < main_li_list.length-1){
                    //console.log(document.getElementsByClassName("main_li_list"));
                    main_li_list[key_pointer].style.backgroundColor="white";
                    key_pointer++;
                    main_li_list[key_pointer].style.backgroundColor="#808080";
                }
                else if(e.key==="ArrowUp"&&key_pointer>0){
                    main_li_list[key_pointer].style.backgroundColor="white";
                    key_pointer--;
                    main_li_list[key_pointer].style.backgroundColor="#808080";
                }
                else if(e.key==="Enter"){
                    main_li_list[key_pointer].style.backgroundColor="red";
                    del[key_pointer].style.visibility = 'visible';
                    rep[key_pointer].style.visibility = 'visible';
                    checked = 1;
                }
            }
            else if(checked==1)
            {
                if(e.key==="Enter") {
                    main_li_list[key_pointer].style.backgroundColor = "#808080";
                    del[key_pointer].style.visibility = 'hidden';
                    rep[key_pointer].style.visibility = 'hidden';
                    checked = 0;
                }
            }


        }
    }
}

function getTime(){
    // 1、获取当前的日期
    var date = new Date();
    var m = (date.getMonth()+1)>9?(date.getMonth()+1):"0"+(date.getMonth()+1);
    var min = (date.getMinutes())>9?(date.getMinutes()):"0"+(date.getMinutes());
    var se = (date.getSeconds())>9?(date.getSeconds()):"0"+(date.getSeconds);
    var cl = date.getFullYear()+"年"+m+"月"+date.getDate()+"日\t"+date.getHours()+"时"+min+"分"+date.getSeconds()+"秒";
    return cl;
}
