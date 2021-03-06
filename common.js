$(document).ready(function ()
{
    common();
});

var common = function ()
{
    common.data = {
        'dot':
            {
                'password': '0690',
                'url': window.location.protocol + '//' + window.location.host + '/dot/',
                'next': 'proposal'
            },
        'proposal':
            {
                'password': '7803',
                'url': window.location.protocol + '//' + window.location.host + '/proposal/',
                'next': 'flappy'
            },
        'eye':
            {
                'password': '0000',
                'url': window.location.protocol + '//' + window.location.host + '/eye/',
                'next': 'flappy'
            },
        'flappy':
            {
                'password': '4321',
                'url': 'https://studio.code.org/projects/flappy/new'
            }
    };
};

common.gotoURL = function (url)
{
    location.href = url;
};

common.gotoList = function(nextDir)
{
    var inputStr = prompt('비밀번호를 입력하세요.', '');

    if (common.data[nextDir].password == inputStr)
    {
        common.gotoURL(common.data[nextDir].url);
    }
    else
    {
        alert('비밀번호가 잘못되었습니다. 강사님께 확인 부탁드립니다.');
    }
};

common.next = function (dir)
{
    var inputStr = prompt('다음 챕터로 넘기는 비밀번호를 입력하세요.', '');
    var nextDir = common.data[dir].next;
    if (inputStr == common.data[nextDir].password)
    {
        common.gotoURL(common.data[nextDir].url);
    }
    else
    {
        alert('비밀번호가 잘못되었습니다. 강사님께 확인 부탁드립니다.');
    }
};