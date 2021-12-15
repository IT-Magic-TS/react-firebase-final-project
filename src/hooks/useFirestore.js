import { useEffect, useReducer, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: false
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null
      };
    case "UPDATED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
        success: true,
        error: null
      };
    case "IS_ERROR":
      return {
        isPending: false,
        document: null,
        error: action.payload,
        success: false
      };
    default:
      return state;
  }
};

export const useFirestore = collection => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref
  const ref = projectFirestore.collection(collection);

  // only dispatch is not cancelled
  const dispatchIfNotCancelled = action => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocument = async doc => {
    dispatch({ type: "IS_PENDING" });
    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      // if we are still on the page
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "IS_ERROR", payload: err.message });
    }
  };

  // delete document
  const deleteDocument = async id => {
    dispatch({ type: "IS_PENDING" });
    try {
      await ref.doc(id).delete();
      dispatchIfNotCancelled({
        type: "DELETED_DOCUMENT"
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "IS_ERROR", payload: err.message });
    }
  };

  // update documents
  const updateDocument = async (id, updates) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const updatedDocument = await ref.doc(id).update(updates);
      dispatchIfNotCancelled({
        type: "UPDATED_DOCUMENT",
        payload: updatedDocument
      });
      return updateDocument;
    } catch (err) {
      dispatchIfNotCancelled({ type: "IS_ERROR", payload: err.message });
      return null;
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, updateDocument, response };
};
