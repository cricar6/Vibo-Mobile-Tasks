import { observable, action, computed } from 'mobx';
import firebase from 'react-native-firebase';

class HomeStore {

    @observable ref = firebase.firestore().collection('pruebaNative');
    constructor(){

    }
@action prueba() {
       this.ref.add({
          title: "Hello native",
          complete: false,
        });
}


}
export const homeStore = new HomeStore();