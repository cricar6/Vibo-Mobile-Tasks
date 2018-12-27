import React from 'react'
import { ToastAndroid, PanResponder, Animated, Picker, StyleSheet, TextInput, Text, View, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { tasksStore } from '../store/TasksStore';
import { observer } from "mobx-react";
import Task from '../Components/Task';
import Chart from '../Components/Chart';
import Svg, {
    Circle,
    G,
    TSpan,
} from 'react-native-svg';

const { width, height } = Dimensions.get('window');
tasksStore.heightt = height;

@observer export default class ToDoList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showAdd: false,

        }
    }

    list(array) {
        return array.map(e => {
            return (
                <Task key={e.key} doc={e.doc} name={e.name} complete={e.complete} />
            )
        })
    }

    constructAddPopUp() {
        if (this.state.showAdd == true)
            return (
                <View style={styles.popBack}>
                    <View style={styles.popContainer}>
                        <Text
                            style={styles.textTitle}
                        >Nueva Tarea</Text>
                        <Text
                            style={styles.textLabel}
                        >Tarea</Text>
                        <TextInput
                            placeholder="Agregar nombre de la tarea"
                            autoCapitalize="none"
                            style={styles.textInput}
                            value={tasksStore.taskName}
                            onChangeText={(text) => {
                                tasksStore.updateTextInput(text);
                            }}
                        />
                        <Text
                            style={styles.textLabel}>
                            Asignar a</Text>
                        <Picker
                            selectedValue={tasksStore.taskUserAssigned}
                            style={styles.textInput}
                            onValueChange={(itemValue, itemIndex) => tasksStore.updateUserPicker(itemValue)}>
                            <Picker.Item label="Seleccione un usuario" value="" />
                            <Picker.Item label="Cristian6569" value="cristian6569" />
                            <Picker.Item label="PaulaGar" value="paulagar" />
                        </Picker>
                        <Text
                            style={styles.textLabel}>
                            Estado de la tarea</Text>
                        <Picker
                            selectedValue={tasksStore.taskState}
                            style={styles.textInput}
                            onValueChange={(itemValue, itemIndex) => tasksStore.updateStatePicker(itemValue)}>
                            <Picker.Item label="Por hacer" value="todo" />
                            <Picker.Item label="En marcha" value="doing" />
                            <Picker.Item label="Terminado" value="done" />
                        </Picker>

                        <Button
                            title={'Añadir Tarea'}

                            buttonStyle={{
                                backgroundColor: '#310432',
                                borderRadius: 5,
                                width: 198,
                                height: 42

                            }}
                            titleStyle={{
                                /* Añadir tarea */
                                color: '#FBFBFB',
                                fontWeight: 500,
                                fontSize: 16
                            }}
                            disabled={(tasksStore.taskUserAssigned=='' && !tasksStore.taskName.lenght)}
                            onPress={() => {
                                tasksStore.addTask();
                                this.setState({ showAdd: !this.state.showAdd });
                            }}
                        />
                    </View>
                </View>
            )
    }

    constructDraggables() {
        if (tasksStore.showDraggs == true)
        return (
        <View style={styles.draggableContainer}>
            <View style={[styles.draggable, styles.draggableTodo]}>
                <Text>Pasar a por hacer</Text>
            </View>
            <View style={[styles.draggable, styles.draggableDoing]}>
            <Text>Pasar a en marcha</Text>

            </View>
            <View style={[styles.draggable, styles.draggableDone]}>
            <Text>Pasar a terminados</Text>

            </View>
        </View>)
    }
    render() {


        return (
            <View>

                <ScrollView>
                    <View style={styles.chartSection}>
                        <Text style={styles.generalTitle}> Proyecto en Kanban </Text>

                        <View style={styles.chartContainer} >
                            <Chart kind={"Pendiente"} percentage={tasksStore.todosPercentage} color={"#F66880"} />
                            <Chart kind={"En marcha"} percentage={tasksStore.doingsPercentage} color={"#FDC741"} />
                            <Chart kind={"Terminado"} percentage={tasksStore.donesPercentage} color={"#32F373"} />
                        </View>
                    </View>
                    <View style={styles.generalContainer}>
                        <View style={styles.todoContainer}>
                            <View style={styles.markerContainer}>
                                <View style={[styles.marker, styles.mTodo]} />
                                <Text style={[styles.mTodo, styles.markerText]}> Pendiente</Text>
                            </View>
                            {this.list(tasksStore.todos)}
                        </View>
                        <View style={styles.todoContainer}>
                            <View style={styles.markerContainer}>
                                <View style={[styles.marker, styles.mDoing]} />
                                <Text style={[styles.mDoing, styles.markerText]}> En marcha</Text>
                            </View>
                            {this.list(tasksStore.doings)}
                        </View>
                        <View style={styles.todoContainer}>
                            <View style={styles.markerContainer}>
                                <View style={[styles.marker, styles.mDone]} />
                                <Text style={[styles.mDone, styles.markerText]}> Terminadas</Text>
                            </View>
                            {this.list(tasksStore.dones)}
                        </View>


                    </View>

                </ScrollView>
                {this.constructDraggables()}
                {this.constructAddPopUp()}
            </View>
        )
    }
}


const styles = StyleSheet.create({

    draggableContainer: {
        position: "absolute",
        flexDirection: 'column'
    },
    draggable: {
        height: tasksStore.heightt / 3,
        width: width,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    draggableTodo : {
        backgroundColor: 'rgba(246,104,128,.9)'
    },
    draggableDoing : {
        backgroundColor: 'rgba(253,199,65,.9)'

    },
    draggableDone : {
        backgroundColor: 'rgba(50,243,115,.9)'

    },
    popBack: {
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,.8)',
        position: 'absolute',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    popContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 40,
        width: width * .8,
        height: height * .8,
        flexDirection: 'column',

    },
    generalTitle: {

        fontWeight: 'bold',
        fontSize: 16,
        color: '#310432'
    },
    chartSection: {
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#E0E0E0',
    },
    chartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        padding: 10
    },
    generalContainer: {
        margin: 10
    },
    todoContainer: {
        paddingBottom: 10,
        paddingTop: 5,
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 1,

    },
    markerContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        alignContent: 'center',
        alignItems: 'center'
    },
    marker: {
        width: 10,
        height: 10,

    },
    markerText: {
        fontSize: 20,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    mTodo: {
        color: '#F66880',
        backgroundColor: '#F66880',

    },
    mDoing: {
        color: '#FDC741',
        backgroundColor: '#FDC741',
    },
    mDone: {
        color: '#32F373',
        backgroundColor: '#32F373',
    },

})