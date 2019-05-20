import axios from 'axios';

const url = 'api/posts/'

class PostServcie {
    static getPosts() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
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
    // insert
    static insertPost(text) {
        return axios.post(url, {
            text
        });
    }
    // delete
    static deletePost(id) {
        console.log(`${url}${id}`)
        return axios.delete(`${url}${id}`);
    }
}

export default PostServcie;