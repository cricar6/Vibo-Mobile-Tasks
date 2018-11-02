import { observable, action, computed } from 'mobx';
import firebase from 'react-native-firebase';

class AuthStore {
    
    @observable user = null;
    @observable error = null;
    
    constructor(){
        firebase.auth().onAuthStateChanged((receivedUser) => {
            if (receivedUser) {
              this.user = receivedUser;
            } else {
              this.user = null;
            }
          });
    }


}
export const authStore = new AuthStore();