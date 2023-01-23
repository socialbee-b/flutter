export default class Post {
    id: number;
    text: string;
    imageUrl: string;
    comments: Post[];
    author: any;
    postType: string;

    constructor (id: number, text:string, imageUrl:string, comments: Post[], author:any, postType: string) {
        this.id = id;
        this.text = text;
        this.imageUrl = imageUrl;
        this.comments = comments;
        this.author = author;
        this.postType = postType;
    }
}