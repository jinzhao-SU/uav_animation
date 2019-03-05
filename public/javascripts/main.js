var oboe = require('oboe');

window.uavData = [];
window.startArea;
window.endArea;
let flag = true;


$.ajaxSetup({
    async: false,
    dataType: "json"
});

$.get("http://ec2-18-191-137-124.us-east-2.compute.amazonaws.com/startarea").done(function (data) {
    window.startArea=data;
});

$.get("http://ec2-18-191-137-124.us-east-2.compute.amazonaws.com/endarea").done(function (data) {
    window.endArea=data;
});

jQuery.ajax({
    async: true
});
console.log("starting async");


oboe('http://ec2-18-191-137-124.us-east-2.compute.amazonaws.com/uav')
    .node('{TimeStep ID Latitude Longitude SignalStrength CurrentBasestation finished}', async function (jsonObject) {
        window.uavData.push(jsonObject);
    });




