import { Timestamp } from "@angular/fire/firestore";
export interface IComment {
    name:string,
    comment:string,
    postID:string,
    createdAt:Timestamp,
}
