import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
   class WithAuthentication extends React.Component {
      constructor(props) {
         super(props);

         this.state = {
            authUser: JSON.parse(localStorage.getItem('authUser')),
         };
      }

      // listenForConnection = () => {
      //    this.props.firebase.info().on('value', (snapshot) => {
      //       const infoObject = snapshot.val();
      //       if (infoObject === false) {
      //          return;
      //       };

      //       const userStatusDatabaseRef = this.props.firebase.status(this.state.authUser.uid);

      //       userStatusDatabaseRef
      //          .onDisconnect()
      //          .update({ online: false })
      //          .then(() => {
      //             userStatusDatabaseRef.update({ online: true })
      //          })
      //    })
      // }

      componentDidMount() {
         this.listener = this.props.firebase.onAuthUserListener(
            authUser => {
               localStorage.setItem('authUser', JSON.stringify(authUser));
               this.setState({ authUser });
               // this.setState({ authUser }, this.listenForConnection);
            },
            () => {
               // this.props.firebase.status(this.state.authUser.uid).update({ online: false })
               localStorage.removeItem('authUser');
               this.setState({ authUser: null });
            },
         );
      }

      componentWillUnmount() {
         this.listener();
         // this.props.firebase.info().off();
      }

      render() {
         return (
            <AuthUserContext.Provider value={this.state.authUser}>
               <Component {...this.props} />
            </AuthUserContext.Provider>
         );
      }
   }

   return withFirebase(WithAuthentication);
};

export default withAuthentication;
