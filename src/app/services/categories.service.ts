import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { ICategory } from '../interfaces/category'


@Injectable({ providedIn: 'root' })

export class CategoriesService {
  firestore = inject(Firestore);
  categoriesCollection = collection(this.firestore, 'categories');

  getCategories(): Observable<ICategory[]> {
    return collectionData(this.categoriesCollection, {
      idField: 'id',
    }) as Observable<ICategory[]>;
  }

}