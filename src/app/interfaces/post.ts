import { Timestamp } from "firebase/firestore";

export interface IPost {
    title: string,
    permalink: string,
    excerpt: string,
    category: {
        categoryId: string,
        category: string,
    },
    postImgPath: string,
    content: string,
    isFeatured: boolean,
    views: number,
    status: string,
    createdAt: Timestamp,
    id?: string,
}