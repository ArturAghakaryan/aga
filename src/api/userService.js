import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

class UserService {
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

export default new UserService();