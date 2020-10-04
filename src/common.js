$(window).load(function ()
{
    common();
    onlyuseeye();
    writeDot();
});


var common = function ()
{
    common.step = 0;
    common.answerList = [['나'],['게임'],['묵호중학교'], ['ok', 'OK', 'Ok', 'oK']];
};

common.gotoURL = function (page)
{
    location.href = window.location.href + page;
};

common.changeStep = function ()
{
    switch (common.step)
    {
        case 0:
            onlyuseeye.load(true);
            writeDot.load(false);
            $('#step-title').html('글자 번호판 만큼 눈 깜빡이기 1/3');
            $('#play-button-text').html('첫번째 문제 시작');
            break;
        case 1:
            $('#step-title').html('글자 번호판 만큼 눈 깜빡이기 2/3');
            $('#play-button-text').html('두번째 문제 시작');
            break;
        case 2:
            $('#step-title').html('글자 번호판 만큼 눈 깜빡이기 3/3');
            $('#play-button-text').html('세번째 문제 시작');
            break;
        case 3:
            onlyuseeye.load(false);
            writeDot.load(true);
            writeDot.loadCommnad();
            break;
        case 4:
            location.href = 'https://scratch.mit.edu/projects/247931071/';
            break;
    }
};

common.submit = function ()
{
    for (var i = 0; i < common.answerList[common.step].length; i++)
    {
        if ($('#answer').val() == common.answerList[common.step][i])
        {
            alert('정답입니다');
            $('#answer').val('');
            common.step++;
            common.changeStep();
            return;
        }
    }

    alert('틀렸습니다. 다시 한번 해보세요.');
    $('#answer').val('');
};