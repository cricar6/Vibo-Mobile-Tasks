import React from 'react';
import { StyleSheet, TouchableHighlight, View, Text, ToastAndroid, PanResponder, Animated, Dimensions } from 'react-native';
import { observer } from "mobx-react";
import { tasksStore } from '../store/TasksStore';

const { width, height } = Dimensions.get('window');


@observer export default class Task extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pan: new Animated.ValueXY(),
            scale: new Animated.Value(1),
            showDraggs: false,
            dropAreaValues: null,

        };
    }
    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,

            onPanResponderGrant: (e, gestureState) => {
                this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value });
                this.state.pan.setValue({ x: 0, y: 0 });
                Animated.spring(
                    this.state.scale,
                    { toValue: 1.1, friction: 5 }
                ).start();
                tasksStore.showDraggs = true;
            },

            onPanResponderMove: Animated.event([
                null, { dx: this.state.pan.x, dy: this.state.pan.y },
            ]),

            onPanResponderRelease: (e, gestureState) => {
                tasksStore.showDraggs = false;

                let what = this.isDropArea(gestureState);
                if (this.props.complete != what) {
                    Animated.spring(
                        this.state.scale,
                        { toValue: 0, friction: 3 }
                    ).start(({ finished }) => {
                        if (finished) {

                            //ToastAndroid.show(what, ToastAndroid.SHORT);
                            this.handleTaskPressing(what);
                            
    
                        }
                    });
                } else {
                    Animated.spring(           
                        this.state.pan,        
                        {toValue:{x:0,y:0}},
 
                    ).start(({ finished }) => {
                            if (finished) {
    
                                Animated.spring(           
                                    this.state.scale,
                                    { toValue: 1, friction: 5 }, 
                                ).start()
                            
                            }
                        }  
                    ); 
                }




                

                    
            }
        });
    }

    isDropArea(gesture) {
        let kind ;
        if (gesture.moveY < tasksStore.heightt/3) {
            kind = 'todo'
        } else if (gesture.moveY > tasksStore.heightt/3 && gesture.moveY < (tasksStore.heightt/3)*2) {
            kind = 'doing'
        } else if (gesture.moveY > tasksStore.heightt/3) {
            kind = 'done'
        }
        return kind;
    }
      
    checkState() {
        //ToastAndroid.show(this.props.complete, ToastAndroid.SHORT)
        if (this.props.complete == "todo") {
            return <View style={[styles.taskState, styles.todo]} />;
        } else
            if (this.props.complete == "doing") {
                return <View style={[styles.taskState, styles.doing]} />;
            } else
                if (this.props.complete == "done") {
                    return <View style={[styles.taskState, styles.done]} />;
                } else {
                    return <View style={[styles.taskState]} />;
                }
    }


    handleTaskPressing(kind) {

            if (kind == "todo") {
                this.props.doc.ref.update({
                    complete: "todo"
                })
            } else if (kind == "doing") {
                this.props.doc.ref.update({
                    complete: "doing"
                })
            } else if (kind == "done") {
                this.props.doc.ref.update({
                    complete: "done"
                })
            }

        
    }

    render() {

        if (tasksStore.loading == true) {
            return null;
        }

        let { pan, scale } = this.state;
        let [translateX, translateY] = [pan.x, pan.y];
        let taskStyle = { transform: [{ translateX }, { translateY }, { scale }] };

        return (
            /*
                      <TouchableHighlight underlayColor="white"   onPress={ () => this.handleTaskPressing()} >
             </TouchableHighlight>

            */
            <View>


                <Animated.View style={[taskStyle, styles.container]} {...this._panResponder.panHandlers} >
                    <View style={styles.subcontainer} >
                        <View style={styles.subcontainer}>
                            {
                                this.checkState()
                            }
                            <Text style={styles.text}> {this.props.name} </Text>
                        </View>
                        <View style={styles.assign} />
                    </View>

                </Animated.View>
            </View>



        )
    }
}

const styles = StyleSheet.create({

    container: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        backgroundColor: 'white',
        margin: 2,
        marginStart: 30,
        padding: 5,
        paddingEnd: 10
    },
    subcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#666666',
        fontSize: 16,
        marginStart: 10,

    },
    taskState: {
        width: 30,
        height: 30,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#E0E0E0',

    },
    todo: {
        backgroundColor: '#F66880',
        borderWidth: 0,

    },
    doing: {
        backgroundColor: '#FDC741',
        borderWidth: 0,

    },
    done: {
        backgroundColor: '#32F373',
        borderWidth: 0,

    },

    assign: {
        width: 20,
        height: 20,
        backgroundColor: '#C4C4C4',
        borderRadius: 50,


    }
})
