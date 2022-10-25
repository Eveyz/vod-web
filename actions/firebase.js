import { doc, setDoc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, collection } from 'firebase/firestore'
import {db} from '../helper/firebase'

export async function get_docs(coll) {
	const docRef = collection(db, coll)
	let res = []
	const querySnapshot = await getDocs(docRef)
	querySnapshot.forEach((doc) => {
		let d = doc.data()
		d['id'] = doc.id
		res.push(d)
	})
	return res
}

export async function get_doc(coll, id) {
	const docRef = doc(db, coll, id);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return docSnap.data()
	} else {
		return null
	}
}

export async function add_doc(coll, data) {
	const docRef = collection(db, coll)
	const doc = await addDoc(docRef, data)
	return doc.id
}

export async function delete_doc(coll, id) {
	const docRef = doc(db, coll, id)
	await deleteDoc(docRef)
}

export async function update_doc(coll, id, new_data) {
	const docRef = doc(db, coll, id)
	await updateDoc(docRef, new_data)
}