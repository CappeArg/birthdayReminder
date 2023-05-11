import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, docData } from '@angular/fire/firestore';
import { addDoc, doc, updateDoc } from 'firebase/firestore';
// import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor( private firestore:Firestore ) { }

  add(i:any,collectionName:string){
    const ref = collection(this.firestore,collectionName)

    return addDoc(ref, i)
  }

  getAll(collectionName:string){

    const ref = collection(this.firestore,collectionName);
    return collectionData(ref, {idField:'id'})
  }


  delete(i:any, collectionName:string){
    const ref = doc(this.firestore,`${collectionName}/${i.id}`);
    return deleteDoc(ref)
  }

  get(id: string, collectionName:string) {
    const ref = doc(this.firestore, `${collectionName}/${id}`);
    return docData(ref, { idField: 'id' });
  }

  update(i: any, collectionName:string) {
    const ref = doc(this.firestore, `${collectionName}/${i.id}`);
    return updateDoc(ref, { ...i });
  }
}
