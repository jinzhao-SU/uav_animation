import axios from 'axios';
import oboe from 'oboe'

const urlStartArea = 'uav/startArea/'
const urlEndArea = 'uav/endArea/'
const urlUAV = 'uav/uav/'

class dataReceiver {
    constructor () {
        this.uavData = [];
    }

    getStartData() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(urlStartArea);
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                    }))
                )
            } catch(err) {
                reject(err);
            }
        })
    }

    getEndData() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(urlEndArea);
                
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                    }))
                )
            } catch(err) {
                reject(err);
            }
        })
    }

    getUAVData() {
        return new Promise(async (resolve, reject) => {
            try {
                var _this = this;
                oboe(urlUAV).node(
                    '{TimeStep ID Latitude Longitude SignalStrength CurrentBasestation finished}',
                    async function (jsonObject) {
                    //    console.log(jsonObject);
                        _this.uavData.push(jsonObject);
                    }
                );
                const flag = await _this.checkUAVData();
                if (flag) {
                    resolve(
                        _this.uavData.map(post => ({
                            ...post,
                        }))
                    )
                }
            } catch(err) {
                reject(err);
            }
        })
    }

    checkUAVData() {
        return new Promise(async (resolve, reject) => {
            try {
                var _this = this;
                
                let x = setInterval(() => {
                    if(_this.uavData.length >= 100) {
                        clearInterval(x);
                        resolve(true);
                    }
                }, 0);
            } catch (err) {
                reject(err);
            }
        })
    }

}


export default dataReceiver;