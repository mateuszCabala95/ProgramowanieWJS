const channel1 = document.querySelector("#channel-1");
const channel2 = document.querySelector("#channel-2");
const channel3 = document.querySelector("#channel-3");
const channel4 = document.querySelector("#channel-4");
const channelValues = {
    'channel-1': [],
    'channel-2': [],
    'channel-3': [],
    'channel-4': []
};

const channels = [channel1, channel2, channel3, channel4];

const handleChannel = (target) =>{
    const addNewAudio = (target) => {
        channelValues[target.parentElement.getAttribute('id')].push(target.key);
    }

    switch (target.getAttribute('data-role')) {
        case 'start-record':
            window.addEventListener('keypress',  (event) => addNewAudio(event))
            break;
        case 'stop-record':
            window.removeEventListener('keypress', (event) => addNewAudio(event));
            break;
        case 'play-record':
            channelValues[target.parentElement.getAttribute('id')].forEach( (key) => playAudio(key));
            break;
        case 'clear-record':
            channelValues[target.parentElement.getAttribute('id')] = [];
            break;
    }
}

const playAudio = (audioKey) => {
    const audio = document.querySelector(`audio[data-key="${audioKey.toLowerCase()}"]`);
    if (audio === null) return null;
    audio.play();
}

channels.forEach(channel => channel.addEventListener("click", (event) => handleChannel(event.target)));

window.addEventListener('keypress', (event) => {
    playAudio(event.key);
})

