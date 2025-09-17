'use strict';

// ####################################################################
// NEW ROOM
// ####################################################################

const adjectives = [
    'brave',
    'fearless',
    'courageous',
    'visionary',
    'resilient',
    'unyielding',
    'selfless',
    'noble',
    'wise',
    'just',
    'honest',
    'patriotic',
    'revolutionary',
    'heroic',
    'strong',
    'determined',
    'steadfast',
    'compassionate',
    'inspiring',
    'legendary',
    'glorious',
    'valiant',
    'daring',
    'undaunted',
    'sacrificial',
    'dedicated',
    'resolute',
    'persistent',
    'unbreakable',
    'fear-defying',
    'truthful',
    'bold',
    'great',
    'enlightened',
    'justice-loving',
    'freedom-loving',
    'honorable',
    'loyal',
    'progressive',
    'empowering',
    'guiding',
    'hope-giving',
    'principled',
    'determined',
    'charismatic',
    'steadfast',
    'pioneering',
    'fear-crushing',
    'unyielding',
    'soulful',
];

const nouns = [
    'GolwalkarGuruji',
    'Bose',
    'BhagatSingh',
    'Azad',
    'Ambedkar',
    'Savarkar',
    'Tilak',
    'Vivekananda',
    'Patel',
    'Shivaji',
    'Kabir',
    'Tulsidas',
    'Chanakya',
    'Kalam',
    'Tagore',
    'BabaAmte',
    'Mandela',
    'TukdojiMaharaj',
    'MartinLuther',
    'CheGuevara',
    'NanaSaheb',
    'MangalPandey',
    'Sukhdev',
    'Rajguru',
    'Savitribai',
    'Periyar',
    'LalBahadur',
    'SarojiniNaidu',
    'RaniLakshmibai',
    'Alluri',
    'TilkaManjhi',
    'MatanginiHazra',
    'UdhamSingh',
    'RamPrasadBismil',
    'KshudiramBose',
    'LokmanyaTilak',
    'BirsaMunda',
    'VOChidambaramPillai',
    'VeerapandiyaKattabomman',
    'BabaDeepSingh',
    'LalaLajpatRai',
    'JyotibaPhule',
    'SardarPatel',
    'PingaliVenkayya',
    'DayanandSaraswati',
    'SwamiVivekananda',
    'SriAurobindo',
    'BipinChandraPal',
    'RajendraPrasad',
    'GopalKrishnaGokhale',
];

function getRandomNumber(length) {
    let result = '';
    let characters = '0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

let adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
let noun = nouns[Math.floor(Math.random() * nouns.length)];
let num = getRandomNumber(5);
noun = noun.charAt(0).toUpperCase() + noun.substring(1);
adjective = adjective.charAt(0).toUpperCase() + adjective.substring(1);

// ####################################################################
// TYPING EFFECT
// ####################################################################

let i = 0;
let txt = num + adjective + noun;
let speed = 100;

function typeWriter() {
    if (i < txt.length) {
        roomName.value += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

const roomName = document.getElementById('roomName');

if (roomName) {
    roomName.value = '';

    if (window.sessionStorage.roomID) {
        roomName.value = window.sessionStorage.roomID;
        window.sessionStorage.roomID = false;
        joinRoom();
    } else {
        typeWriter();
    }

    roomName.onkeyup = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            joinRoom();
        }
    };
}

// ####################################################################
// LANDING | NEW ROOM
// ####################################################################

const lastRoomContainer = document.getElementById('lastRoomContainer');
const lastRoom = document.getElementById('lastRoom');
const lastRoomName = window.localStorage.lastRoom ? window.localStorage.lastRoom : '';

if (lastRoomContainer && lastRoom && lastRoomName) {
    lastRoomContainer.style.display = 'inline-flex';
    lastRoom.setAttribute('href', '/join/?room=' + lastRoomName);
    lastRoom.innerText = lastRoomName;
}

const genRoomButton = document.getElementById('genRoomButton');
const joinRoomButton = document.getElementById('joinRoomButton');
const adultCnt = document.getElementById('adultCnt');

if (genRoomButton) {
    genRoomButton.onclick = () => {
        genRoom();
    };
}

if (joinRoomButton) {
    joinRoomButton.onclick = () => {
        joinRoom();
    };
}

if (adultCnt) {
    adultCnt.onclick = () => {
        adultContent();
    };
}

function genRoom() {
    document.getElementById('roomName').value = getUUID4();
}

function getUUID4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
}

function joinRoom() {
    const roomName = filterXSS(document.getElementById('roomName').value).trim().replace(/\s+/g, '-');
    const roomValid = isValidRoomName(roomName);

    if (!roomValid) {
        typeWriter();
        return;
    }

    //window.location.href = '/join/' + roomName;
    window.location.href = '/join/?room=' + roomName;
    window.localStorage.lastRoom = roomName;
}

function isValidRoomName(input) {
    if (!input || typeof input !== 'string') {
        return false;
    }

    if (!input || ['false', 'undefined', ''].includes(input.trim().toLowerCase())) {
        return false;
    }

    const pathTraversalPattern = /(\.\.(\/|\\))+/;
    return !pathTraversalPattern.test(input);
}

function adultContent() {
    if (
        confirm(
            '18+ WARNING! ADULTS ONLY!\n\nExplicit material for viewing by adults 18 years of age or older. You must be at least 18 years old to access to this site!\n\nProceeding you are agree and confirm to have 18+ year.'
        )
    ) {
        window.open('https://luvlounge.ca', '_blank');
    }
}

// #########################################################
// PERMISSIONS
// #########################################################

const qs = new URLSearchParams(window.location.search);
const room_id = filterXSS(qs.get('room_id'));
const message = filterXSS(qs.get('message'));
const showMessage = document.getElementById('message');
console.log('Allow Camera or Audio', {
    room_id: room_id,
    message: message,
});
if (showMessage) showMessage.innerHTML = message;
