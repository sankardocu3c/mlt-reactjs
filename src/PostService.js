import axios from 'axios';

const url = 'http://localhost:5000/api/posts/';

class PostService{
    //get post
    static getPosts() {
        return new Promise ((resolve,reject) => {
            axios.get(url).then((res) => {
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        createdAt: new Date(post.createdAt)
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
            
        });
    }

    //create post 
    static inserPost(text) {
        return axios.post(url,{
            text
        });
    }

    //delete post
    static deletePost(id){
        return axios.delete(`${url}${id}`);
    }
}



export default PostService;