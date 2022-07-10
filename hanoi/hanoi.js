$(document).ready(function ()
{
    hanoi();
});

hanoi = function ()
{
    hanoi.message = $("#message");
    hanoi.NUM_OF_DISKS_MAX = 5;
    hanoi.NUM_OF_COLUMNS = 3;
    //hanoi.moveCount = 0;
    hanoi.diskData = null;
    hanoi.grabData = null;
    hanoi.mouseLocation = null;
    hanoi.gameOverOn = null;

    //hanoi.restartDivElement = null;
    //hanoi.messageDivElement = null;
    //hanoi.messageElement = null;

    //hanoi.restartDivElement = document.getElementById("restartDiv");
    //hanoi.messageDivElement = document.getElementById("messageDiv");
    //hanoi.messageElement = document.getElementById("message");
    //hanoi.restartDivElement.onclick = function(){hanoi.init()};

    hanoi.init();

    hanoi.column[0].onmouseover = function(){hanoi.mouseOver(0)};
    hanoi.column[0].onmouseout = function(){hanoi.mouseOut(0)};
    hanoi.column[0].onclick = function(){hanoi.mouseClick(0)};
    hanoi.column[1].onmouseover = function(){hanoi.mouseOver(1)};
    hanoi.column[1].onmouseout = function(){hanoi.mouseOut(1)};
    hanoi.column[1].onclick = function(){hanoi.mouseClick(1)};
    hanoi.column[2].onmouseover = function(){hanoi.mouseOver(2)};
    hanoi.column[2].onmouseout = function(){hanoi.mouseOut(2)};
    hanoi.column[2].onclick = function(){hanoi.mouseClick(2)};
};

hanoi.inputNum = function()
{
    var input_num = prompt("총 블럭의 개수를 입력하세요");
    input_num = input_num * 1;
    if (input_num >= 2 && input_num <= 5)
    {
        return input_num;
    }
    else
    {
        alert("블럭은 2개에서 5개까지 가능합니다.");
    }

    hanoi.inputNum();
};

hanoi.init = function()
{
    //hanoi.message.hide();
    hanoi.message.html("");
    hanoi.message.removeClass("alert-danger");
    hanoi.message.removeClass("alert-primary");
    hanoi.message.addClass("alert-primary");
    hanoi.NUM_OF_DISKS = hanoi.inputNum();

    hanoi.column = new Array(hanoi.NUM_OF_COLUMNS);
    hanoi.grab = new Array(hanoi.NUM_OF_COLUMNS);
    //hanoi.disk = new Array(hanoi.NUM_OF_DISKS);
    hanoi.disk = new Array(hanoi.NUM_OF_DISKS_MAX);

    for(var i = 0; i < hanoi.column.length ; i++){
        var idText = "column"+i;
        hanoi.column[i]=document.getElementById(idText);
    }

    for(var i = 0; i < hanoi.column.length ; i++){
        var idText = "grab"+i;
        hanoi.grab[i]=document.getElementById(idText);
    }

    for(var i = 0 ; i < hanoi.disk.length ; i++){
        hanoi.disk[i]=new Array(hanoi.NUM_OF_COLUMNS);
    }
    for (var i = 0 ; i < hanoi.disk.length ; i++) {
        for (var j = 0 ; j < hanoi.disk[j].length; j++) {
            var idText = "disk"+i+j;
            hanoi.disk[i][j] = document.getElementById(idText);
        }
    }


    hanoi.gameOverOn = false;
    hanoi.moveCount = 0;
    hanoi.mouseLocation = -1;
    hanoi.diskData = [
        [0,0,0],
        [0,0,0],
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];
    hanoi.diskFinish = [
        [0,0,0],
        [0,0,0],
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];

    var this_numOfDisk = hanoi.NUM_OF_DISKS;
    for(var i = hanoi.diskData.length; i > 0; i--)
    {
        hanoi.diskData[i-1][0] = this_numOfDisk;
        hanoi.diskFinish[i-1][2] = this_numOfDisk;
        this_numOfDisk--;
        if (this_numOfDisk < 0) this_numOfDisk = 0;
    }

    hanoi.grabData ={ 'isGrab' : false, 'location' : 0, 'diskValue' : 0 };

    //hanoi.messageDivElement.style.backgroundColor = "white";
    //hanoi.messageElement.innerHTML = ".";
    //hanoi.restartDivElement.style.backgroundColor = "#FF4F33";
    //$('.poles').css({height: });
    hanoi.draw();
    hanoi.clearGrab();
};

hanoi.getDiskInfo = function(disk)
{
    var diskSize = disk*15+60+"px";
    var diskColor;
    switch(disk){
        case 1:
            diskColor = "#4caeea";
            break;
        case 2:
            diskColor = "#f6c142";
            break;
        case 3:
            diskColor = "#7dab55";
            break;
        case 4:
            diskColor = "#eb3323";
            break;
        case 5:
            diskColor = "#69379a";
            break;
    }
    return { 'width' : diskSize, 'color' : diskColor };
};

hanoi.draw = function()
{
    for (var i = 0 ; i < hanoi.diskData.length ; i++)
    {
        for (var j = 0 ; j < hanoi.diskData[0].length ; j++)
        {
            if(hanoi.diskData[i][j] == 0){
                hanoi.disk[i][j].style.width = 0+"px";
            } else {
                hanoi.disk[i][j].style.width = hanoi.getDiskInfo(hanoi.diskData[i][j]).width;
                hanoi.disk[i][j].style.backgroundColor = hanoi.getDiskInfo(hanoi.diskData[i][j]).color;
            }
        }
    }
    if(hanoi.grabData.isGrab == true){
        hanoi.clearGrab();
        hanoi.grab[hanoi.grabData.location].style.width = hanoi.getDiskInfo(hanoi.grabData.diskValue).width;
        hanoi.grab[hanoi.grabData.location].style.backgroundColor = hanoi.getDiskInfo(hanoi.grabData.diskValue).color;
        if(hanoi.grabData.location != mouseLocation && mouseLocation != -1){
            hanoi.grab[mouseLocation].style.width = hanoi.getDiskInfo(hanoi.grabData.diskValue).width;
            hanoi.grab[mouseLocation].style.backgroundColor = "rgba(255,255,255,.7)";
        }
    }
    //document.getElementById("move").innerHTML = hanoi.moveCount;
    //$("#move").html(hanoi.moveCount);
    if (!hanoi.gameOverOn)
        hanoi.message.html("이동 : " + hanoi.moveCount);
};

hanoi.clearGrab = function()
{
    for(var i = 0 ; i < hanoi.grab.length ; i++){
        hanoi.grab[i].style.width = 0;
    }
};


hanoi.grabDisk = function(columnNum)
{
    for(var i = 0 ; i < hanoi.NUM_OF_DISKS_MAX ; i++){
        if(hanoi.diskData[i][columnNum] > 0){
            //hanoi.moveCount++;
            hanoi.grabData.isGrab = true;
            hanoi.grabData.location = columnNum;
            hanoi.grabData.diskValue = hanoi.diskData[i][columnNum];
            hanoi.diskData[i][columnNum] = 0 ;
            break;
        }
    }
};

hanoi.dropDisk = function(columnNum)
{
    hanoi.moveCount++;
    if(hanoi.diskData[hanoi.NUM_OF_DISKS_MAX - 1][columnNum] == 0){
        hanoi.grabData.isGrab = false;
        hanoi.diskData[hanoi.NUM_OF_DISKS_MAX - 1][columnNum] = hanoi.grabData.diskValue;
        hanoi.clearGrab();
        return;
    }
    for(var i = 0 ; i < hanoi.NUM_OF_DISKS_MAX ; i++){
        if(hanoi.diskData[i][columnNum] > 0 && hanoi.diskData[i][columnNum] > hanoi.grabData.diskValue){
            hanoi.grabData.isGrab = false;
            hanoi.diskData[i-1][columnNum] = hanoi.grabData.diskValue;
            hanoi.clearGrab();
            break;
        }
    }

    for (var i = 0; i < hanoi.NUM_OF_DISKS_MAX; i++)
    {
        if (hanoi.diskData[i][2] != hanoi.diskFinish[i][2]) return;
    }

    hanoi.gameOver();
};

hanoi.gameOver = function()
{
    hanoi.gameOverOn = true;
    hanoi.message.removeClass("alert-primary");
    hanoi.message.addClass("alert-danger");
    hanoi.message.html("");
    hanoi.message.html(hanoi.moveCount + "번만에 성공했습니다!");
    console.log(hanoi.message.html());
};

hanoi.mouseOver = function(columnNum)
{
    if(hanoi.gameOverOn == false){
        hanoi.column[columnNum].style.backgroundColor="rgba(51, 204, 255, .5)";
        mouseLocation = columnNum;

        hanoi.draw();
    }
};

hanoi.mouseOut = function(columnNum)
{
    if(hanoi.gameOverOn == false){
        hanoi.column[columnNum].style.backgroundColor="rgba(51, 204, 255, .0)";
        mouseLocation = -1;

        hanoi.draw();
    }
};
hanoi.mouseClick = function(columnNum)
{
    if(hanoi.gameOverOn == false){
        if(hanoi.grabData.isGrab == false) hanoi.grabDisk(columnNum);
        else hanoi.dropDisk(columnNum);

        hanoi.draw();
    }
};
