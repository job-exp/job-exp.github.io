(function()
{
    var createStyle = function()
    {
        var str = ".cocosLoading{position:absolute;margin:-30px -60px;padding:0;top:50%;left:50%}";
        str += ".cocosLoading ul{margin:0;padding:0; float:left}";
        str += ".cocosLoading span{color:#FFF;text-align:center;display:block; margin-top:20px;}";
        str += ".cocosLoading li{list-style:none;float:left;border-radius:20px;width:20px;height:20px;background:#FFF;margin:5px 0 0 10px}";
        str += ".cocosLoading li .ball,.cocosLoading li .unball{background-color:#2187e7;background-image:-moz-linear-gradient(90deg,#2187e7 25%,#a0eaff);background-image:-webkit-linear-gradient(90deg,#2187e7 25%,#a0eaff);width:20px;height:20px;border-radius:40px}";
        str += ".cocosLoading li .ball{transform:scale(0);-moz-transform:scale(0);-webkit-transform:scale(0);animation:showDot 1s linear forwards;-moz-animation:showDot 1s linear forwards;-webkit-animation:showDot 1s linear forwards}";
        str += ".cocosLoading li .unball{transform:scale(1);-moz-transform:scale(1);-webkit-transform:scale(1);animation:hideDot 1s linear forwards;-moz-animation:hideDot 1s linear forwards;-webkit-animation:hideDot 1s linear forwards}";
        str += "@keyframes showDot{0%{transform:scale(0,0)}100%{transform:scale(1,1)}}";
        str += "@-moz-keyframes showDot{0%{-moz-transform:scale(0,0)}100%{-moz-transform:scale(1,1)}}";
        str += "@-webkit-keyframes showDot{0%{-webkit-transform:scale(0,0)}100%{-webkit-transform:scale(1,1)}}";
        str += "@keyframes hideDot{0%{transform:scale(1,1)}100%{transform:scale(0,0)}}";
        str += "@-moz-keyframes hideDot{0%{-moz-transform:scale(1,1)}100%{-moz-transform:scale(0,0)}}";
        str += "@-webkit-keyframes hideDot{0%{-webkit-transform:scale(1,1)}100%{-webkit-transform:scale(0,0)}}";
        str += ".cocosLoadingImage{position:absolute;left:0;width:100%;top:50%;margin-top:-50%}";
        str += ".cocosLoadingImage img{width:100%;height:100%}";

        return str;
    };

    var createDom = function(id,num)
    {
        id=id||"cocosLoading";
        num=num||5;
        var i,item;
        var div = document.createElement("div");
        div.className="cocosLoading";
        div.id = id;
        var bar = document.createElement("ul");
        var list = [];
        for(i=0;i<num;i++){
            item = document.createElement("li");
            list.push({
                ball:document.createElement("div"),
                halo:null
            });
            item.appendChild(list[list.length-1].ball);
            bar.appendChild(item)
        }
        var span = document.createElement("span");
        span.innerHTML = "";
        div.appendChild(bar);
        div.appendChild(span);
        document.body.appendChild(div);
        return list;
    };
    var createText = function()
    {
        var id="cocosLoading";
        var div=document.createElement("div");
        div.className="cocosLoading";
        div.id = id;
        var span = document.createElement("span");
        span.innerHTML = "Initializing...";
        div.appendChild(span);
        document.body.appendChild(div);
        //initialization
    };
    var startAnimation=function(list,callback)
    {
        var index=0;
        var direction=true;
        var time=300;
        var animation=function()
        {
            setTimeout(function()
            {
                if(callback&&!callback()){
                    return
                }
                var item=list[index];
                if(direction){
                    item.ball.className="ball";
                }else{
                    item.ball.className="unball";
                }
                index++;

                if(index>=list.length){
                    direction=!direction;
                    index=0;
                    time=1000;
                }else{
                    time=300;
                }
                animation();
            },time)
        };
        animation();
    };
    (function()
    {
        var bgColor=document.body.style.background;
        document.body.style.background="#000";
        var style=document.createElement("style");
        style.type="text/css";
        style.innerHTML=createStyle();
        document.head.appendChild(style);
        /*
        var list=createDom();
        startAnimation(list,function()
        {
            var div=document.getElementById("cocosLoading");
            if(!div){
                document.body.style.background=bgColor;
            }
            return !!div;
        });
        */
        createText();
    })()
})();