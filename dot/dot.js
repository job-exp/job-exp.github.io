$(document).ready(function ()
{
    dot();
});

var dot = function ()
{
    dot.loadCommnad();
};


dot.loadCommnad = function ()
{
    var str = '';

    for (var i = 0; i < 10; i++)
    {
        str += '<tr>';
        for (var j = 0; j < 10; j++)
        {
            str += '<td onclick="dot.select(this)"></td>';
        }
        str += '</tr>';
    }
    $('#tbl-dots').html(str);


    str = '';
    var command = 'rddwdwdwdwdwdwdrwrwruwuwuwuwuwuwulwlwrrrrdwdwdwdwdwdwdwrrrwullwuwruwurw';
    for (i = 0; i < command.length; i++)
    {
        str += dot.writeDiv(command.substr(i, 1));
    }
    $('#canvas-commnad').html(str);
};

dot.writeDiv = function (type)
{
    var str = '<div class="commands commands-';
    switch (type)
    {
        case 'r': str += 'right">&#8594;'; break;
        case 'l': str += 'left">&#8592;'; break;
        case 'u': str += 'up">&#8593;'; break;
        case 'd': str += 'down">&#8595;'; break;
        case 'w': str += 'write">&#8226;'; break;
    }
    str += '</div>';

    return str;
};

dot.select = function (e)
{
    $(e).toggleClass('selected');
};

dot.reset = function ()
{
    $('#tbl-dots td').removeClass('selected');
};

dot.next = function ()
{
    var inputStr = prompt('다음 챕터로 넘기는 비밀번호를 입력하세요.', '');
    if (inputStr == common.password.dot)
        common.gotoURL(common.nextURL.dot);
    else
        alert('비밀번호가 잘못되었습니다. 강사님께 확인 부탁드립니다.');

};