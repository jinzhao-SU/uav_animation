import axios from 'axios';
import oboe from 'oboe'

const urlStartArea = 'uav/startArea/'
const urlEndArea = 'uav/endArea/'
const urlUAV = 'uav/uav/'

class dataReceiver {
    static getStartData() {
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

    static getEndData() {
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

    static getUAVData() {
        return new Promise(async (resolve, reject) => {
            try {
                const data = [];
                oboe(urlUAV).node(
                    '{TimeStep ID Latitude Longitude SignalStrength CurrentBasestation finished}',
                    async function (jsonObject) {
                    //    console.log(jsonObject);
                        data.push(jsonObject);
                    }
                );
                
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
}


export default dataReceiver;