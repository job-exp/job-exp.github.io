var writeDot = function ()
{

};

writeDot.load = function (type)
{
    switch (type)
    {
        case true:
            $('#canvas-commnad').show();
            $('#dots').show();
            break;
        case false:
            $('#canvas-commnad').hide();
            $('#dots').hide();
            break;
    }
};

writeDot.loadCommnad = function ()
{
    var str = '';

    for (var i = 0; i < 10; i++)
    {
        str += '<tr>';
        for (var j = 0; j < 10; j++)
        {
            str += '<td onclick="writeDot.select(this)"></td>';
        }
        str += '</tr>';
    }
    $('#tbl-dots').html(str);


    str = '';
    var command = 'rddwdwdwdwdwdwdrwrwruwuwuwuwuwuwulwlwrrrrdwdwdwdwdwdwdwrrrwullwuwruwurw';
    for (i = 0; i < command.length; i++)
    {
        str += writeDot.writeDiv(command.substr(i, 1));
    }
    $('#canvas-commnad').html(str);
};

writeDot.writeDiv = function (type)
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

writeDot.select = function (e)
{
    $(e).toggleClass('selected');
};