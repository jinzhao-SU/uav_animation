class UAV {

    constructor(data,mapmarker) {
        this.ID = data.ID;
        this.lat=Number(data.Latitude);
        this.long=Number(data.Longitude);
        this.mapmarker=mapmarker;
        this.prePath = [];
        this.uavPath = {};
        this.state = true;
    }

    // remove the num lastest vertex in path
    // and return the lastest uav poistion
    popPath(num) {
        if (!Object.getOwnPropertyNames(this.uavPath).length > 0) {
            return undefined;
        }

        let path = this.uavPath.getPath();

        if (num === undefined) {
            path.pop();
        } else {
            while (num > 0) {
                path.pop();
                num--;
            }
        }

        const len = path.getLength();

        if (len === 1) {
            return undefined;
        }

        const latlng = path.getAt(len-1);
        return latlng
    }

    // change uav marker position
    setMarkerPosition(latlng, uavMap) {
        if (latlng === undefined) {
            return;
        }

        this.mapmarker.setPosition({
            lat: latlng.lat(),
            lng: latlng.lng(),
        });

        uavMap.set(this.ID, this);
    }

    // uav back num step
    back(num, uavMap) {
        const latlng = this.popPath(num);
        this.setMarkerPosition(latlng, uavMap);
    }

}


export default UAV;
