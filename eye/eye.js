$(document).ready(function ()
{
    eye();
});

var eye = function ()
{
    eye.step = 0;
    eye.canvas = [$('#canvas-ani0'), $('#canvas-ani1')];
    eye.eyesList = [
        [2, 15],
        [1, 26, 8, 24, 5],
        [13, 19, 11, 26, 7, 5, 19, 2, 7, 23, 12, 17],
    ];
    eye.answerList = ['나','게임','포켓몬스터'];
    eye.keyframe = 0;
    eye.playTime = 0;
    eye.playPos = false;
    eye.setAnimate('ready');
    eye.changeStep();
};

eye.changeStep = function()
{
    switch (eye.step)
    {
        case 0:
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
            common.next('eye');
            break;
    }
};

eye.submit = function ()
{
    eye.setAnimate('ready');
    if ($('#answer').val() == eye.answerList[eye.step])
    {
        alert('정답입니다');
        $('#answer').val('');
        eye.step++;
        eye.changeStep();
        return;
    }

    alert('틀렸습니다. 다시 한번 해보세요.');
    $('#answer').val('');
};

eye.giveup = function ()
{
    if(confirm('정말로 이 문제를 포기하고 다음 문제로 넘어가시겠습니까?'))
    {
        $('#answer').val('');
        common.step++;
        common.changeStep();
    }
};

eye.play = function ()
{
    eye.playPos = true;
    eye.setAnimate('play');
};

eye.setAnimate = function (type)
{
    switch (type)
    {
        case 'ready':
            $('#play-button').show();
            eye.canvas[0].css({'opacity':0.5});
            eye.canvas[1].css({'opacity':0});
            eye.stop();
            break;
        case 'play':
            $('#play-button').hide();
            eye.canvas[0].css({'opacity':1});
            eye.canvas[1].css({'opacity':1});
            eye.canvas[0].delay(1000).queue(function ()
            {
                eye.canvas[0].dequeue();
                eye.animate();
            });
            break;
    }
};


eye.animate = function ()
{
    if (!eye.playPos)
        return;

    eye.playTime++;
    eye.canvas[0].css({'opacity':0});
    eye.canvas[0].delay(300).queue(function ()
    {
        eye.canvas[0].css({'opacity':1}).dequeue();
    }).delay(300).queue(function ()
    {
        eye.canvas[0].dequeue();

        if (eye.playTime == eye.eyesList[eye.step][eye.keyframe])
        {
            eye.canvas[0].css({'opacity':1});
            eye.canvas[0].delay(2000).queue(function ()
            {
                eye.canvas[0].dequeue();

                eye.playTime = 0;
                eye.keyframe++;
                if (eye.keyframe == eye.eyesList[eye.step].length)
                {
                    eye.keyframe = 0;
                    eye.setAnimate('ready');
                }
                else
                {
                    eye.animate();
                }
            });
        }
        else
        {
            eye.animate();
        }
    });
};

eye.stop = function ()
{
    eye.playPos = false;
    eye.playTime = 0;
    eye.keyframe = 0;
    eye.canvas[0].stop();
    eye.canvas[1].stop();
    eye.canvas[0].dequeue();
    eye.canvas[1].dequeue();
};