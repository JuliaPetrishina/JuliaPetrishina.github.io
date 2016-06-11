var state = {
    action: 'stop',
    counter: 10
};

function render(state) {

    var go = document.getElementsByClassName('green')[0];
    var ready = document.getElementsByClassName('yellow')[0];
    var stop = document.getElementsByClassName('red')[0];

    go.classList.remove('on');
    ready.classList.remove('on');
    stop.classList.remove('on');
    ready.innerHTML = '';

    if (state.action === 'go') {
        go.classList.add('on');
        ready.innerHTML = '<span>' + state.counter + '</span>';
    }
    else if (state.action === 'stop') {
        stop.classList.add('on');
        ready.innerHTML = '<span>' + state.counter + '</span>'
    }
    else if (state.action === 'ready') {
        ready.classList.add('on');
    }
    else if(state.action === 'stop + ready'){
        stop.classList.add('on');
        ready.classList.add('on');
    }
};

setInterval(function(){

    var nextSteps = {
        'stop + ready': {
            state: 'go',
            dur: 10
        },

        ready: {
            state: 'stop',
            dur: 10
        },

        go: {
            state: 'ready',
            dur: 4
        }
    };


    if(state.counter === 4 && state.action === 'stop'){
        state.action = 'stop + ready';
        state.counter --;
    }
    else if(state.counter === 1){
        var nextStep = nextSteps[state.action];
        state.action = nextStep.state;
        console.log(nextStep.state);
        state.counter = nextStep.dur;

    }
    else{
        state.counter --;
    }

    render(state);
}, 1000);