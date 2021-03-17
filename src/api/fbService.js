import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

import firebaseConfig from "./firebaseConfig";

class FbService {
  constructor() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  getAllPosts = async () => {
    const res = await firebase.database().ref("posts").get();
    const data = res.toJSON();

    return data ? Object.values(data) : [];
  };

  getPosts = async (startAt, endAt) => {
    const res = await firebase
      .database()
      .ref("posts")
      .orderByKey()
      .startAt(startAt.toString())
      .endAt(endAt.toString())
      .get();

    const data = res.toJSON();

    return data ? Object.values(data) : [];
  };

  getPost = async (id) => {
    const res = await firebase.database().ref(`posts/${id}`).get();
    return res.val();
  };

  createPost = async (postData) => {
    const res = await firebase
      .database()
      .ref("posts")
      .orderByKey()
      .limitToLast(1)
      .get();

    const lastItemJSON = res.toJSON();
    if (lastItemJSON) {
      const lastItem = Object.values(lastItemJSON)[0];
      console.log(lastItem);
      var { id } = lastItem;
    } else {
      var id = 0;
    }

    const newItem = {
      ...postData,
      id: id + 1,
    };
    await firebase
      .database()
      .ref(`posts/${id + 1}`)
      .set(newItem);

    return newItem;
  };

  editePost = async (postData, title, body) => {
    const postRef = firebase.database().ref(`posts/${postData.id}`);
    await postRef.update({
      ...postData,
      title: title,
      body: body,
    });
    const res = await postRef.get();
    return res.val();
  };

  deletePost = async (id, startAt = 0, endAt = 8) => {
    const postRef = firebase.database().ref(`posts/${id}`);
    await postRef.remove();

    const posts = await this.getAllPosts();
    const newPosts = {};
    Object.values(posts).forEach(
      (value, index) => (newPosts[index + 1] = { ...value, id: index + 1 })
    );

    await firebase.database().ref("posts").set(newPosts);

    const data = await this.getPosts(startAt, endAt);
    return data;
  };

  login = async (credentials) => {
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password);
    const { uid, email, password, displayName, photoURL } = res.user;
    return { uid, email, password, displayName, photoURL };
  };

  singup = async (credentials) => {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password);
  };

  logout = async () => {
    await firebase.auth().signOut();
  };
}

const fbService = new FbService();

export default fbService;
