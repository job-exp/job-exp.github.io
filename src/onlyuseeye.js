var onlyuseeye = function ()
{
    onlyuseeye.canvas = [$('#canvas-ani0'), $('#canvas-ani1')];
    onlyuseeye.eyesList = [
        [2, 15],
        [1, 26, 8, 24, 5],
        [5,21, 1, 14, 19, 9, 21, 8, 14, 15, 1, 1, 20],
    ];
    onlyuseeye.keyframe = 0;
    onlyuseeye.playTime = 0;


    common.changeStep();
};

onlyuseeye.load = function (type)
{
    switch (type)
    {
        case true:
            $('#canvas-ani').show();
            $('#twinkle').show();
            onlyuseeye.setAnimate('ready');
            break;
        case false:
            $('#canvas-ani').hide();
            $('#twinkle').hide();
            break;
    }
};

onlyuseeye.giveup = function ()
{
    if(confirm('정말로 이 문제를 포기하고 다음 문제로 넘어가시겠습니까?'))
    {
        $('#answer').val('');
        common.step++;
        common.changeStep();
    }
};

onlyuseeye.play = function ()
{
    onlyuseeye.setAnimate('play');
};

onlyuseeye.setAnimate = function (type)
{
    switch (type)
    {
        case 'ready':
            $('#play-button').show();
            onlyuseeye.canvas[0].css({'opacity':0.5});
            onlyuseeye.canvas[1].css({'opacity':0});
            break;
        case 'play':
            $('#play-button').hide();
            onlyuseeye.canvas[0].css({'opacity':1});
            onlyuseeye.canvas[1].css({'opacity':1});
            onlyuseeye.canvas[0].delay(1000).queue(function ()
            {
                onlyuseeye.canvas[0].dequeue();
                onlyuseeye.animate();
            });
            break;
    }
};


onlyuseeye.animate = function ()
{
    onlyuseeye.playTime++;
    onlyuseeye.canvas[0].css({'opacity':0});
    onlyuseeye.canvas[0].delay(300).queue(function ()
    {
        onlyuseeye.canvas[0].css({'opacity':1}).dequeue();
    }).delay(300).queue(function ()
    {
        onlyuseeye.canvas[0].dequeue();

        if (onlyuseeye.playTime == onlyuseeye.eyesList[common.step][onlyuseeye.keyframe])
        {
            onlyuseeye.canvas[0].css({'opacity':1});
            onlyuseeye.canvas[0].delay(2000).queue(function ()
            {
                onlyuseeye.canvas[0].dequeue();

                onlyuseeye.playTime = 0;
                onlyuseeye.keyframe++;
                if (onlyuseeye.keyframe == onlyuseeye.eyesList[common.step].length)
                {
                    onlyuseeye.keyframe = 0;
                    onlyuseeye.setAnimate('ready');
                }
                else
                {
                    onlyuseeye.animate();
                }
            });
        }
        else
        {
            onlyuseeye.animate();
        }
    });
};
