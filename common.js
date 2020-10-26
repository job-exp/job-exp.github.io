$(document).ready(function ()
{
    common();
});

var common = function ()
{
    common.password = {
        'dot': 4321,
        'proposal': 9876
    };

    common.nextURL = {
        'dot': window.location.protocol + '//' + window.location.host + '/proposal/',
        'proposal': 'https://studio.code.org/projects/flappy/new'
    };
};

common.gotoURL = function (url)
{
    location.href = url;
};
