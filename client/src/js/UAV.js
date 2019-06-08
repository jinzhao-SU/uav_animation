class UAV {

    constructor(data,mapmarker) {
        this.ID = data.ID;
        this.lat=Number(data.Latitude);
        this.long=Number(data.Longitude);
        this.mapmarker=mapmarker;
        this.prePath = [];
        this.uavPath = {};
    }
}


export default UAV;