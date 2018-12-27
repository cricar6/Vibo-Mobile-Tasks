import firebase from 'react-native-firebase';
import { observable, action, computed } from 'mobx';
import { ToastAndroid } from 'react-native';

class TasksStore {

    @observable ref = firebase.firestore().collection('Tasks');
    @observable taskName = '';
    @observable taskState = 'todo';
    @observable taskUserAssigned = '';   
    @observable actualProjectId = '';

    @observable tasks = [];

    @observable todos = [];
    @observable doings = [];
    @observable dones = [];
    @observable tasksFromThisProject = [];

    @observable todosPercentage = 0 ;
    @observable doingsPercentage = 0 ;
    @observable donesPercentage = 0 ;

    @observable unsubscribe = null;
    @observable loading = true;
    @observable showDraggs = false;
    @observable heightt = 0;


    constructor() {
        this.ref.onSnapshot(this.onCollectionUpdate);
    }
    /*
        mount() {
            this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        }
    
        unMount() {
            this.unsubscribe();
        }
    */
    onCollectionUpdate = (querySnapshot) => {

        this.tasks = [];

        querySnapshot.forEach((doc) => {
            let task = {
                key: doc.id,
                doc: doc,
                name: doc.data().name,
                complete: doc.data().complete,
                date: doc.data().date,
                projectID: doc.data().projectID,
                userAsignedID: doc.data().userAsignedID
            }
            this.tasks.push(task)
        });

        this.tasksFromThisProject = this.tasks
            .filter((e) => { return e.projectID == this.actualProjectId })

        this.tasksFromThisProject = this.tasksFromThisProject
            .sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });

        this.todos = this.tasksFromThisProject
            .filter((e) => { return e.complete == "todo" })

        this.doings = this.tasksFromThisProject
            .filter((e) => { return e.complete == "doing" })

        this.dones = this.tasksFromThisProject
            .filter((e) => { return e.complete == "done" })

        let total = this.tasksFromThisProject.length;
        let todos = this.todos.length;
        let doings = this.doings.length;
        let dones = this.dones.length;

        this.todosPercentage = (Math.abs(todos / total) * 100);
        this.doingsPercentage = (Math.abs(doings / total) * 100) ;
        this.donesPercentage = (Math.abs(dones / total) * 100);

        this.loading = false;
    }

    updateTextInput(value) {
        this.taskName = value;
    }
    updateStatePicker(value) {
        this.taskState = value;
    }
    updateUserPicker(value) {
        this.taskUserAssigned = value;
    }

    addTask() {

        this.ref.add({
            name: this.taskName,
            complete: this.taskState,
            date: new Date(),
            projectID: this.actualProjectId,
            userAsignedID: this.taskUserAssigned
        });
        this.taskName = '';
    }
}
export const tasksStore = new TasksStore();