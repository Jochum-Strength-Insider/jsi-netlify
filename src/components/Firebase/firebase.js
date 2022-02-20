import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getDatabase, get, ref, query, limitToLast, orderByChild, equalTo } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, updatePassword } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const prodConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

const devConfig = {
  apiKey: process.env.REACT_APP_DEV_API_KEY,
  authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
  projectId: process.env.REACT_APP_DEV_PROJECT_ID,
  storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

const app = initializeApp(config);

class Firebase {
  constructor() {
    console.log("Firebase config: ", config);

    this.auth = getAuth();
    this.db = getDatabase(app);
    this.storage = getStorage(app);
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) => {
    const secondaryApp = firebase.initializeApp(config, "Secondary");
    const secondaryAuth = getAuth(secondaryApp);
    const newUser = createUserWithEmailAndPassword(secondaryAuth, email, password)

    return new Promise(function (resolve, reject) {
      resolve({ newUser, secondaryApp });
    });
  };

  doTestCreateUserWithEmailAndPassword = (email, password) => createUserWithEmailAndPassword(this.auth, email, password)
    
  doSignInWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(this.auth, email, password);

  doSignOut = () => this.auth.signOut();

  fetchSignInMethodsForEmail = (email) => this.auth.fetchSignInMethodsForEmail(email);

  doPasswordReset = email => sendPasswordResetEmail(this.auth, email);

  // can you send this to a non current user?
  doSendEmailVerification = () =>
    sendEmailVerification(this.auth.currentUser).then({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT || process.env.REACT_APP_DEV_CONFIRMATION_EMAIL_REDIRECT,
    });

  doSendNewUserEmailVerification = (authUser) =>
    authUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT || process.env.REACT_APP_DEV_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = password =>
    updatePassword(this.auth.currentUser, password);

  doSendSignInLinkToEmail = (email) => {
    const actionCodeSettings = {
      url: process.env.REACT_APP_EMAIL_SIGN_IN_REDIRECT || process.env.REACT_APP_DEV_EMAIL_SIGN_IN_REDIRECT,
      handleCodeInApp: true,
    };

    return this.auth.sendSignInLinkToEmail(email, actionCodeSettings);
  }

  doSignInWithEmailLink = (email, location) =>
    this.auth.signInWithEmailLink(email, location);

  doIsSignInWithEmailLink = (location) =>
    this.auth.isSignInWithEmailLink(location);

  // *** Merge Auth and DB User API *** //

  // FB update onAuthStateChanged
  onAuthUserListener = (next, fallback) =>
    onAuthStateChanged(this.auth, (authUser) => {
      if (authUser) {
        // here
        get(this.user(authUser.uid))
          .then(snapshot => {
            const dbUser = snapshot.val();

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** Info / Connected *** //

  info = () => ref(this.db, ".info/connected");

  // *** Status / Online *** //

  // status = (uid) => this.db.ref(`status/${uid}`);

  // connect = (uid) => this.db.ref(`status/${uid}`).update({ online: true });

  // disconnect = (uid) => this.db.ref(`status/${uid}`).update({ online: false });

  // *** User API ***

  user = uid => ref(this.db, `users/${uid}`);

  users = () => ref(this.db, 'users');

  // *** Activate User API ***

  active = (uid) => ref(this.db, `users/${uid}`).child("ACTIVE");

  activate = (uid) => ref(this.db, `users/${uid}`).update({ ACTIVE: true });

  deactivate = (uid) => ref(this.db, `users/${uid}`).update({ ACTIVE: false });

  // *** WorkoutIds API ***

  workoutIds = uid => ref(this.db, `workoutids/${uid}`);

  activeWorkoutIds = uid => query(this.workoutIds(uid), orderByChild('active'), equalTo(true), limitToLast(1));

  workoutId = (uid, wid) => ref(this.db, `workoutids/${uid}/${wid}`);

  // *** Message API ***

  message = (uid, mid) => ref(this.db, `messages/${uid}/${mid}`);

  messages = uid => ref(this.db, `messages/${uid}`);

  // *** Admin Unread API ***

  adminUnreadMessages = () => ref(this.db, `adminUnread`);

  adminUnreadMessage = mid => ref(this.db, `adminUnread/${mid}`);

  currentlyMessaging = () => ref(this.db, `currentlyMessaging`);

  // *** User Unread API ***

  unreadMessages = uid => ref(this.db, `unread/${uid}`);

  // *** Workout API ***

  workouts = (uid) => ref(this.db, `workouts/${uid}`);

  workout = (uid, wid) => ref(this.db, `workouts/${uid}/${wid}`);

  // *** quickSave API ***

  quickSave = () => ref(this.db, 'quickSave');

  quickSaveId = () => ref(this.db, 'quickSaveId');

  // *** Program API ***

  programs = () => ref(this.db, 'programs');

  program = (pid) => ref(this.db, `programs/${pid}`);

  programIds = () => ref(this.db, 'programIds');

  programId = (pid) => ref(this.db, `programIds/${pid}`);

  // *** Task API ***

  tasks = () => ref(this.db, 'tasks');

  task = (tid) => ref(this.db, `tasks/${tid}`);

  // *** Diet API ***

  usersDiets = (uid) => ref(this.db, `diets/${uid}`);

  usersDiet = (uid, did) => ref(this.db, `diets/${uid}/${did}`);

  // *** Diet IDS API ***

  dietIds = (uid) => ref(this.db, `dietIds/${uid}`);

  // *** Weight Ins API ***

  weighIn = (uid) => ref(this.db, `weighIns/${uid}`);

  // *** Image Storage API ***

  images = () => this.storage.ref('images');

  userImages = (uid) => this.storage.ref(`images/${uid}`);

  userBefore = (uid) => this.storage.ref(`images/${uid}/before`);

  userAfter = (uid) => this.storage.ref(`images/${uid}/after`);

  // *** Referral API ***

  referrals = () => ref(this.db, 'referrals');

  refferal = (rid) => ref(this.db, `referrals/${rid}`);

  // *** Discounts API ***

  discounts = () => ref(this.db, 'discounts');

  discount = (did) => ref(this.db, `discounts/${did}`);

  // *** Codes API ***

  codes = () => ref(this.db, 'codes');

  code = (cid) => ref(this.db, `codes/${cid}`);

  // *** Code Detail API ***

  codeDetails = () => ref(this.db, 'codeDetails');

  codeDetail = (cid) => ref(this.db, `codeDetails/${cid}`);

}

export default Firebase;
