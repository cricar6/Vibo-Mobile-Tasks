import React from 'react';
import { StyleSheet, TouchableHighlight, View, Text, ToastAndroid, PanResponder, Animated, Dimensions } from 'react-native';
import { observer } from "mobx-react";
import { tasksStore } from '../store/TasksStore';
import Svg, {
    Circle,
    G,
    TSpan,
} from 'react-native-svg';


@observer export default class Chart extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        let percentage = this.props.percentage;

        //ToastAndroid.show(percentage+"", ToastAndroid.SHORT);

        return (
            <View style={styles.container}>

                <Svg height={100} width={100} viewBox="0 0 42 42">
                    <Circle
                        cx="21"
                        cy="21"
                        r="15.91549430918954"
                        fill="#fff"
                        stroke='#A9A9A9'
                        strokeWidth="2"
                    />
                    <Circle
                        cx="21"
                        cy="21"
                        r="15.91549430918954"
                        stroke={this.props.color}
                        strokeWidth="2"
                        fill="transparent"
                        strokeDasharray={percentage + " " + Math.abs(percentage - 100)}
                        strokeDashoffset="200"
                        strokeLinecap="round"
                    />

                    <G>
                        <TSpan
                            x="11"
                            y="25"
                            fill={this.props.color}
                            fontSize="12">
                            {Math.trunc(percentage) + "%"}

                        </TSpan>

                    </G>

                </Svg>
                <Text>
                    {this.props.kind}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent:'center',
        alignItems:'center'
    },
})
