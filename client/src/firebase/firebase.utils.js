import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyBQBwAYw4Xxi87U7cRVHyZm1DdsxmX-rPk",
    authDomain: "helpon-5fabe.firebaseapp.com",
    databaseURL: "https://helpon-5fabe.firebaseio.com",
    projectId: "helpon-5fabe",
    storageBucket: "helpon-5fabe.appspot.com",
    messagingSenderId: "929257711879",
    appId: "1:929257711879:web:7000fc3f89a70703b6fda2",
    measurementId: "G-HRBK8BDMX7"
}

export const createUserProfile = async (userAuth, additionalData) => {

    if(userAuth){
        const userRef = firestore.doc(`users/${userAuth.uid}`);

        const snapShot = await userRef.get();
        if(!snapShot.exists){

            const { phoneNumber } = userAuth;
            const createdAt = new Date();

            try {
                await userRef.set({
                    phoneNumber,
                    createdAt,
                    ...additionalData
                })
            }catch(err){
                console.log('ERROR'+err.message)
            }
        }
        return userRef;
    }
}

export const updateUserProfile = async (formData, user) => {
    try {
        
        const userRef = firestore.doc(`users/${user.id}`);
        const snapShot = await userRef.get();

        const { name, address, type } = formData;

        await userRef.set({
            ...snapShot.data(),
            name,
            address,
            type,
            registered: true
        });

        return userRef;

    } catch (err) {
        console.log(err.message)
    }
}

export const getMemberName = async id => {

    try {
        
        const memberRef = firestore.doc(`members/${id}`);
        const snapShot = await memberRef.get();
        const memberData = snapShot.data();

        return memberData.name
        
    } catch (err) {
        console.log(err.message)
    }
}



export const getMembers = async() => {

    const memberRef = firestore.collection('members');
    const snapShot = await memberRef.get();
    const members = await snapShot.docs.map(snap => {
        return {
            ...snap.data(),
            id: snap.id
        }
    });
    return members;
}

export const addMember = async formData => {

    const { name } = formData;
    const docRef = await firestore.collection("members").add({
        name
    })

    return docRef.id
}

export const updateWallet = async (user, amount) => {

    const userRef = firestore.doc(`members/${user}`);
    const snapShot = await userRef.get();

    const memberData = snapShot.data()

    await userRef.set({
        ...memberData,
        wallet: memberData.wallet ? memberData + amount : amount
    });
}

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export default firebase;