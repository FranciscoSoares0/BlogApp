import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  setDoc,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { Observable, from, map} from 'rxjs';
import { IComment } from '../interfaces/comment';


@Injectable({ providedIn: 'root' })

export class CommentsService {
  firestore = inject(Firestore);
  commentsCollection = collection(this.firestore, 'comments');

  getComments(): Observable<IComment[]> {
    return collectionData(this.commentsCollection, {
      idField: 'id',
    }) as Observable<IComment[]>;
  }

  getCommentsByPostId(currentPostID:string): Observable<IComment[]> {

    const commentsByPostIDQuery = query(
      this.commentsCollection,
      where('postID', '==', currentPostID),
    );

    return collectionData(commentsByPostIDQuery, { idField: 'id' }) as Observable<IComment[]>;
  }

  addComment(commentData: IComment): Observable<string> {
    const commentToCreate = commentData;

    const promise = addDoc(this.commentsCollection, commentToCreate)
      .then((response) => {
        return response.id;
      })
      .catch((err) => {
        throw err;
      });
    return from(promise);
  }

}