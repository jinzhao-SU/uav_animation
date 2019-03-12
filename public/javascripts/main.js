var oboe = require('oboe');

window.uavData = [];
window.startArea;
window.endArea;
let flag = true;


$.ajaxSetup({
    async: false,
    dataType: "json"
});

$.get("https://10.2.1.245:3000/startarea").done(function (data) {
    window.startArea=data;
});

$.get("https://10.2.1.245:3000/endarea").done(function (data) {
    window.endArea=data;
});

jQuery.ajax({
    async: true
});
console.log("starting async");


oboe('https://10.2.1.245:3000/uav')
    .node('{TimeStep ID Latitude Longitude SignalStrength CurrentBasestation finished}', async function (jsonObject) {
        window.uavData.push(jsonObject);
    });




