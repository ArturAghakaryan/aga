import firebase from "firebase/app";

import firebaseConfig from "./firebaseConfig";

import userService from './userService';
import postsService from './postsService';
import todosService from './todosService'


if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const fbService = {
  userService,
  postsService,
  todosService,
}

export default fbService;
