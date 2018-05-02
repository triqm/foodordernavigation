'use strict';

import React, { Component } from 'react';
import { Card } from 'react-native-elements';

let {
    ToastAndroid,
    TouchableWithoutFeedback,
    TouchableHighlight,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
} = require('react-native');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as homeActions from '../actions/Home'; //Import your actions

class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getData(); //call our action
    }

    _pressRow(id) {
        if(this._isAvailableDay(id)) {
            this.props.navigation.navigate('Foods', {
                itemId: id,
            });
        }
    }

    _isAvailableDay(id) {
        let today = this.props.today_data;
        return typeof today != 'undefined' && today.wdayNumber >= id;
    }

    render() {
        if (this.props.loading) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator
                        animating={true}
                        style={[{height: 80}]}
                        size="small"
                    />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <FlatList
                        data={this.props.cards}
                        renderItem={({ item: rowData }) => {
                                return (
                                    <TouchableOpacity  underlayColor="black" onPress={() => this._pressRow(rowData.id)}>
                                        <Card
                                            title={rowData.title}
                                            image={{ uri: rowData.imageUrl }}
                                            containerStyle={{ padding: 0, width: 300 }}
                                            wrapperStyle={this._isAvailableDay(rowData.id) ? {} : styles.inactiveCard}
                                        >
                                        </Card>
                                    </TouchableOpacity>
                                );
                            }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            );
        }
    }
}

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
        cards: state.dataReducer.cards,
        today_data: state.dataReducer.today_data
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, homeActions), dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    inactiveCard: {
        width: 300,
        height: 'auto',
        backgroundColor: 'black',
        opacity: 0.3,
        zIndex: 9999
    }
});