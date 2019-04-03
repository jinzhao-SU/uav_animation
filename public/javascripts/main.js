var oboe = require('oboe');

window.uavData = [];
window.startArea;
window.endArea;
let flag = true;


$.ajaxSetup({
    async: false,
    dataType: "json"
});

$.get("https://utm-nyscorridor.laanc-usa.com/simul/startarea").done(function (data) {
    window.startArea=data;
});

$.get("https://utm-nyscorridor.laanc-usa.com/simul/endarea").done(function (data) {
    window.endArea=data;
});

jQuery.ajax({
    async: true
});
console.log("starting async");


oboe("https://utm-nyscorridor.laanc-usa.com/simul/uav")
    .node('{TimeStep ID Latitude Longitude SignalStrength CurrentBasestation finished}', async function (jsonObject) {
        window.uavData.push(jsonObject);
    });
