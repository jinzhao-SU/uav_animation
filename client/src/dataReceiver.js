import axios from 'axios';

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
                        createdAt: new Date(post.createdAt)
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
                        createdAt: new Date(post.createdAt)
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
                const res = await axios.get(urlUAV);
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        createdAt: new Date(post.createdAt)
                    }))
                )
            } catch(err) {
                reject(err);
            }
        })
    }
}


export default dataReceiver;