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
import { ISubscription } from '../interfaces/subscription';


@Injectable({ providedIn: 'root' })

export class SubscriptionService {
  firestore = inject(Firestore);
  subscriptionsCollection = collection(this.firestore, 'subscriptions');

  getSubscriptions(): Observable<ISubscription[]> {
    return collectionData(this.subscriptionsCollection, {
      idField: 'id',
    }) as Observable<ISubscription[]>;
  }

  addSubscription(subscriptionData: ISubscription): Observable<string> {
    const subscriptionToCreate = subscriptionData;
    const email = subscriptionToCreate.email;

    const promise = addDoc(this.subscriptionsCollection, subscriptionToCreate)
      .then((response) => {
        return response.id;
      })
      .catch((err) => {
        throw err;
      });
    return from(promise);
  }

  emailExists(email: string): Observable<boolean> {
    const emailQuery = query(
      this.subscriptionsCollection,
      where('email', '==', email) // Adjust if the field name is different
    );

    return from(getDocs(emailQuery)).pipe(
      map((querySnapshot) => !querySnapshot.empty) // Return true if email exists, false otherwise
    );
  }

}