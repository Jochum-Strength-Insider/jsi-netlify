import firebase from 'firebase/app';
import 'firebase/database'; // If using Firebase database
import 'firebase/auth';

const app = firebase;

const config = {
   apiKey: process.env.REACT_APP_API_KEY,
   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
   databaseURL: process.env.REACT_APP_DATABASE_URL,
   projectId: process.env.REACT_APP_PROJECT_ID,
   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
   constructor() {
      // console.log(config);
      app.initializeApp(config);

      this.serverValue = app.database.ServerValue;
      this.emailAuthProvider = app.auth.EmailAuthProvider;
      this.auth = app.auth();
      this.db = app.database();

      // this.googleProvider = new app.auth.GoogleAuthProvider();
      // this.facebookProvider = new app.auth.FacebookAuthProvider();
      // this.twitterProvider = new app.auth.TwitterAuthProvider();
   }

   // *** Auth API ***

   doCreateUserWithEmailAndPassword = (email, password) =>
      this.auth.createUserWithEmailAndPassword(email, password);

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

   doSendEmailVerification = () =>
      this.auth.currentUser.sendEmailVerification({
         url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
      });

   doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);

   // *** Merge Auth and DB User API *** //

   onAuthUserListener = (next, fallback) =>
      this.auth.onAuthStateChanged(authUser => {
         if (authUser) {
            this.user(authUser.uid)
               .once('value')
               .then(snapshot => {
                  const dbUser = snapshot.val();
                  // console.log("dbUser signup", dbUser);
                  // There's an odd bug where the workoutIds aren't progagated to the authUser object when a user is created.
                  // It's fixed after a refresh but going straight from signup to account causes an error.

                  // default empty roles
                  // if (!dbUser.roles) {
                  //    dbUser.roles = [];
                  // }

                  // this.workouts(authUser.uid)
                  //    .limitToLast(1)
                  //    .once("value")
                  //    .then(snapshot => {
                  //       const workout = snapshot.val();

                  //       // merge auth and db user
                  //       authUser = {
                  //          uid: authUser.uid,
                  //          email: authUser.email,
                  //          emailVerified: authUser.emailVerified,
                  //          providerData: authUser.providerData,
                  //          ...dbUser,
                  //          workouts: [workout],
                  //       };

                  //       next(authUser);
                  //    });

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

   // *** User API ***

   user = uid => this.db.ref(`users/${uid}`);

   users = () => this.db.ref('users');

   workoutIds = uid => this.db.ref(`users/${uid}/workoutids`);

   workoutId = (uid, wid) => this.db.ref(`users/${uid}/workoutids/${wid}`);

   // *** Message API ***

   message = uid => this.db.ref(`messages/${uid}`);

   messages = () => this.db.ref('messages');

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
   //Rename these

   usersDiets = (uid) => this.db.ref(`diets/${uid}`);

   usersDiet = (uid, did) => this.db.ref(`diets/${uid}/${did}`);

   // *** Diet Ids Array API ***
   //Rename these

   usersDietIds = (uid) => this.db.ref(`users/${uid}/dietIds`);

   // *** Weight Ins API ***
   weighIn = (uid) => this.db.ref(`weighIns/${uid}`);
}

export default Firebase;
