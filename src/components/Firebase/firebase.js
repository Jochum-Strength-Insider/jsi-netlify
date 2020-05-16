import firebase from 'firebase/app';
import 'firebase/database'; // If using Firebase database
import 'firebase/auth';
import 'firebase/storage';

const app = firebase;

// const prodConfig = {
//    apiKey: process.env.REACT_APP_PROD_API_KEY,
//    authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
//    databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
//    projectId: process.env.REACT_APP_PROD_PROJECT_ID,
//    storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
//    messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
// };

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

class Firebase {
   constructor() {
      // console.log(config);
      app.initializeApp(config);

      this.serverValue = app.database.ServerValue;
      this.emailAuthProvider = app.auth.EmailAuthProvider;
      this.auth = app.auth();
      this.db = app.database();
      this.storage = app.storage();

      // this.googleProvider = new app.auth.GoogleAuthProvider();
      // this.facebookProvider = new app.auth.FacebookAuthProvider();
      // this.twitterProvider = new app.auth.TwitterAuthProvider();
   }

   // *** Auth API ***

   doCreateUserWithEmailAndPassword = (email, password) => {
      // this.auth.createUserWithEmailAndPassword(email, password)
      // console.log(email, password);

      const secondaryApp = firebase.initializeApp(config, "Secondary");
      const newUser = secondaryApp.auth().createUserWithEmailAndPassword(email, password)

      return new Promise(function (resolve, reject) {
         resolve({ newUser, secondaryApp });
      });
   };

   doSignInWithEmailAndPassword = (email, password) =>
      this.auth.signInWithEmailAndPassword(email, password);

   // doSignInWithGoogle = () =>
   //    this.auth.signInWithPopup(this.googleProvider);

   // doSignInWithFacebook = () =>
   //    this.auth.signInWithPopup(this.facebookProvider);

   // doSignInWithTwitter = () =>
   //    this.auth.signInWithPopup(this.twitterProvider);

   doSignOut = () => this.auth.signOut();

   doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

   // can you send this to a non current user?
   doSendEmailVerification = () =>
      this.auth.currentUser.sendEmailVerification({
         url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT || process.env.REACT_APP_DEV_CONFIRMATION_EMAIL_REDIRECT,
      });

   doSendNewUserEmailVerification = (authUser) =>
      authUser.sendEmailVerification({
         url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT || process.env.REACT_APP_DEV_CONFIRMATION_EMAIL_REDIRECT,
      });

   doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);

   doSendSignInLinkToEmail = (email) => {
      const actionCodeSettings = {
         // make this a .env
         // url: 'http://localhost:3000/email-signin',
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

   onAuthUserListener = (next, fallback) =>
      this.auth.onAuthStateChanged(authUser => {
         if (authUser) {
            this.user(authUser.uid)
               .once('value')
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

   info = () => this.db.ref(".info/connected");

   // *** Status / Online *** //

   status = (uid) => this.db.ref(`status/${uid}`);

   // connect = (uid) => this.db.ref(`status/${uid}`).update({ online: true });

   // disconnect = (uid) => this.db.ref(`status/${uid}`).update({ online: false });

   // *** User API ***

   user = uid => this.db.ref(`users/${uid}`);

   users = () => this.db.ref('users');

   // *** Activate User API ***

   active = (uid) => this.db.ref(`users/${uid}`).child("ACTIVE");

   activate = (uid) => this.db.ref(`users/${uid}`).update({ ACTIVE: true });

   deactivate = (uid) => this.db.ref(`users/${uid}`).update({ ACTIVE: false });

   // *** WorkoutIds API ***

   workoutIds = uid => this.db.ref(`workoutids/${uid}`);

   workoutId = (uid, wid) => this.db.ref(`workoutids/${uid}/${wid}`);

   // *** Message API ***

   message = (uid, mid) => this.db.ref(`messages/${uid}/${mid}`);

   messages = uid => this.db.ref(`messages/${uid}`);

   // *** Admin Unread API ***

   adminUnreadMessages = () => this.db.ref(`adminUnread`);

   adminUnreadMessage = mid => this.db.ref(`adminUnread/${mid}`);

   currentlyMessaging = () => this.db.ref(`currentlyMessaging`);


   // *** User Unread API ***

   unreadMessages = uid => this.db.ref(`unread/${uid}`);

   // *** Workout API ***

   workouts = (uid) => this.db.ref(`workouts/${uid}`);

   workout = (uid, wid) => this.db.ref(`workouts/${uid}/${wid}`);

   // *** Program API ***

   programs = () => this.db.ref('programs');

   program = (pid) => this.db.ref(`programs/${pid}`);

   programIds = () => this.db.ref('programIds');

   programId = (pid) => this.db.ref(`programIds/${pid}`);

   // *** Task API ***

   tasks = () => this.db.ref('tasks');

   task = (tid) => this.db.ref(`tasks/${tid}`);

   // *** Diet API ***

   usersDiets = (uid) => this.db.ref(`diets/${uid}`);

   usersDiet = (uid, did) => this.db.ref(`diets/${uid}/${did}`);

   // *** Diet IDS API ***

   dietIds = (uid) => this.db.ref(`dietIds/${uid}`);

   // *** Weight Ins API ***

   weighIn = (uid) => this.db.ref(`weighIns/${uid}`);

   // *** Image Storage API ***

   images = () => this.storage.ref('images');

   userImages = (uid) => this.storage.ref(`images/${uid}`);

   userBefore = (uid) => this.storage.ref(`images/${uid}/before`);

   userAfter = (uid) => this.storage.ref(`images/${uid}/after`);

}

export default Firebase;
