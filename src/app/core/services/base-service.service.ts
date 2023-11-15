import { Injectable } from "@angular/core";
import { DocumentData, Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import { appFirebase } from "../../../main";
import { Undefinable } from "../../shared/helpers/Undefinable.interface";

@Injectable()
export class BaseService<T> {
    db: Firestore;
    collectionName = "";
    constructor() {
        this.db = getFirestore(appFirebase);
    }

    async getFirst(): Promise<Undefinable<T>> {

        const q = query(collection(this.db, this.collectionName));
        const querySnapshot = await getDocs(q);
        const data: T[] = querySnapshot.docs.map((d) => ({
            ...d.data() as T,
            id: d.id
        }));
        return data[0];
    }

    async getAll(): Promise<T[]> {
        const q = query(collection(this.db, this.collectionName));
        const querySnapshot = await getDocs(q);
        const data: T[] = querySnapshot.docs.map((d) => ({
            ...d.data() as T,
            id: d.id
        }));
        return data;
    }

    async getByQuery(key: string, value: string | boolean): Promise<T[]> {
        const q = query(collection(this.db, this.collectionName), where(key, "==", value));
        const querySnapshot = await getDocs(q);
        const data: T[] = querySnapshot.docs.map((d) => ({
            ...d.data() as T,
            id: d.id
        }));
        return data;
    }

    async getById(id: string): Promise<Undefinable<T>> {

        const docRef = doc(this.db, this.collectionName, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                ...docSnap.data() as T,
                id: docSnap.id
            };
        } else {
            return undefined;
        }
    }

    async addDoc(encargo: T): Promise<T | undefined> {
        try {
            const docRef = await addDoc(collection(this.db, this.collectionName), encargo as DocumentData);

            console.log("Document written with ID: ", docRef.id);
            return {
                ...docRef as T,
                id: docRef.id
            };
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        return undefined;
    }

    async updateDoc(documentId: string, document: T) {
        try {
            const ref = doc(this.db, this.collectionName, documentId);

            if (ref) {
                await updateDoc(ref, document as DocumentData);
            }

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    async deleteDoc(documentId: string) {
        try {
            const ref = doc(this.db, this.collectionName, documentId);

            if (ref) {
                await deleteDoc(ref);
            }

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}
