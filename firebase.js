// firebase.js
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBj4ooVgnXzQqQlWQVpYfKxK2Pwjjm1wP0',
  authDomain: 'happy-monk-2e7f5.firebaseapp.com',
  projectId: 'happy-monk-2e7f5',
  storageBucket: 'happy-monk-2e7f5.appspot.com',
  messagingSenderId: '280430322920',
  appId: '1:280430322920:web:2046a408f40d6d533b955d',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};
