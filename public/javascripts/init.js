let mapGoogle;


async function startup(){
    console.log("startup is called,waiting for length > 100");
    const result = await checkUAVData();
    if (result) {
        mapGoogle = new syrMap('syrmap',window.uavData,window.startArea,window.endArea);
        //mapGoogle.showStartArea();
        //mapGoogle.showEndArea();
        console.log("init successfully");
        $('#buttonStart').attr('disabled', false);
        console.log("enable the start button");
        //startFly();
    }
}

function checkUAVData(){
    return new Promise(resolve => {
        let x = setInterval(() => {
            if(window.uavData.length >= 100) {
                clearInterval(x);
                resolve(true);
            }
        }, 0);
    });
}

startup();

function startFly(){
    mapGoogle.fly();
}