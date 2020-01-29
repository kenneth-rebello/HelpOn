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

            const { displayName, email } = userAuth;
            const createdAt = new Date();

            try {
                await userRef.set({
                    displayName,
                    email,
                    createdAt,
                    ...additionalData
                })
            }catch(err){
                console.log('Error creating message'+err.message)
            }
        }
        return userRef;
    }

}



firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;