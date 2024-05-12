import React, { createContext, useContext } from 'react';
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, where,writeBatch } from 'firebase/firestore';
import { app } from '../firebase.init';

export const FirestoreContext = createContext();

const db = getFirestore(app);

export const useFirestore = () => {
  return useContext(FirestoreContext);
};

export const FirestoreProvider = ({ children }) => {
  const addDocument = async (collectionName, data) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      return docRef.id;
    } catch (error) {
      console.error('Error adding document:', error);
      throw error;
    }
  };

  const getDocuments = async (collectionName) => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return documents;
    } catch (error) {
      console.error('Error getting documents:', error);
      throw error;
    }
  };

  const getDocument = async (collectionName, docId) => {
    try {
      const docSnapshot = await getDoc(doc(db, collectionName, docId));
      if (docSnapshot.exists()) {
        return { id: docSnapshot.id, ...docSnapshot.data() };
      } else {
        console.error('Document not found');
        return null;
      }
    } catch (error) {
      console.error('Error getting document:', error);
      throw error;
    }
  };

  const getDocumentsByQuery = async (collectionName, queryOptions) => {
    try {
      const q = query(collection(db, collectionName), where(queryOptions.field, queryOptions.operator, queryOptions.value));
      const querySnapshot = await getDocs(q);
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return documents;
    } catch (error) {
      console.error('Error getting documents by query:', error);
      throw error;
    }
  };

  const updateDocument = async (collectionName, docId, data) => {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, data);
      console.log('Document successfully updated');
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  };

  const deleteDocument = async (collectionName, docId) => {
    try {
      await deleteDoc(doc(db, collectionName, docId));
      console.log('Document successfully deleted');
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  };
  const addDocuments = async (collectionName, documents) => {
    try {
      const batch = writeBatch(db);
      const collectionRef = collection(db, collectionName);
  
      documents.forEach((document) => {
        const docRef = doc(collectionRef);
        batch.set(docRef, document);
      });
  
      await batch.commit();
      console.log('Documents successfully added');
    } catch (error) {
      console.error('Error adding documents:', error);
      throw error;
    }
  };
  
  const firestoreOperations = {
    addDocument,
    addDocuments,
    getDocuments,
    getDocument,
    getDocumentsByQuery,
    updateDocument,
    deleteDocument
  };

  return (
    <FirestoreContext.Provider value={firestoreOperations}>
      {children}
    </FirestoreContext.Provider>
  );
};
