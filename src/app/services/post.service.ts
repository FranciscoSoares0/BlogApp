import { Injectable, inject } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';
import { docData, orderBy, updateDoc } from '@angular/fire/firestore';
import { IPost } from '../interfaces/post';
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
  limit,
  increment
} from '@angular/fire/firestore';
import { Observable, map,tap ,from} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor() {}

  firestore = inject(Firestore);
  postsCollection = collection(this.firestore, 'posts');
  storage = inject(Storage);

  getPosts(): Observable<IPost[]> {
    return collectionData(this.postsCollection, {
      idField: 'id',
    }) as Observable<IPost[]>;
  }

  getFeaturedPosts(): Observable<IPost[]> {
    // Create a query to get posts where isFeatured is true
    const featuredPostsQuery = query(
      this.postsCollection,
      where('isFeatured', '==', true),
      limit(4) // Filter by isFeatured
    );

    // Use collectionData to get the data from the query
    return collectionData(featuredPostsQuery, { idField: 'id' }) as Observable<IPost[]>;
  }

  getLatestPosts(): Observable<IPost[]> {
    // Create a query to get posts where isFeatured is true
    const featuredPostsQuery = query(
      this.postsCollection,
      orderBy('createdAt'),
      limit(6) // Filter by isFeatured
    );

    // Use collectionData to get the data from the query
    return collectionData(featuredPostsQuery, { idField: 'id' }) as Observable<IPost[]>;
  }

  getCategoryPosts(categoryID:string): Observable<IPost[]> {
    // Create a query to get posts where isFeatured is true
    const featuredPostsQuery = query(
      this.postsCollection,
      where('category.categoryId', '==', categoryID),
    );

    // Use collectionData to get the data from the query
    return collectionData(featuredPostsQuery, { idField: 'id' }) as Observable<IPost[]>;
  }

  getSimilarPosts(categoryID:string,currentPostID:string): Observable<IPost[]> {
    // Create a query to get posts where isFeatured is true
    const featuredPostsQuery = query(
      this.postsCollection,
      where('category.categoryId', '==', categoryID),
      limit(4)
    );

    // Use collectionData to get the data from the query
    return collectionData(featuredPostsQuery, { idField: 'id' }).pipe(
      map((posts:IPost[]) => posts.filter(post => post.id !== currentPostID)), // Exclude the specified post
      tap(filteredPosts => {})
    ) as Observable<IPost[]>;
  }

  getPostById(id: string): Observable<IPost | undefined> {
    const postDocRef = doc(this.firestore, `posts/${id}`);
    return docData(postDocRef, { idField: 'id' }) as Observable<
      IPost | undefined
    >;
  }

  incrementViews(postId: string): Observable<void> {
    const postRef = doc(this.firestore, 'posts/' + postId);

    // Use FieldValue.increment to increment the views by 1
    const promise = updateDoc(postRef, {
      views: increment(1) // Increment views by 1
    })
    .then(() => {})
    .catch((error) => {
      throw error;
    });

    return from(promise);
  }

}
