//@flow

import React from 'react';
import { Card } from 'react-native-elements';

import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Text,
    ActivityIndicator,
    Button
} from 'react-native'; // 5.0.6
import * as homeActions from '../actions/Home'; //Import your actions
import * as orderActions from '../actions/Order'; //Import your actions

import {API_DOMAIN_URL} from '../utils/Constants';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class Foods extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({ navigation }) => {
        const {state} = navigation;
        return {
            title: 'Menu',
            headerRight: (
                <View
                    style={styles.orderBtn}
                >
                    <Button
                        title='Order'
                        onPress={() => navigation.navigate('OrderModal') }
                    />
                </View>

            ),
        };
    };

    componentWillMount(){
        const {setParams} = this.props.navigation;
    }


    componentDidMount() {
        this.props.getFood(); //call our action
    }

    _pressRow(id, name) {
        this.props.navigation.navigate('OrderFoodModal', {
            foodId: id,
            foodName: name,
        });
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
                        data={this.props.today_food}
                        renderItem={({ item: rowData }) => {
                                return (
                                    <TouchableOpacity  underlayColor="black" onPress={() => this._pressRow(rowData.id, rowData.name)}>
                                        <Card
                                            title={rowData.name}
                                            image={{ uri: API_DOMAIN_URL + '/files/' + rowData.image }}
                                            containerStyle={{ padding: 0, width: 300 }}
                                        >
                                            <Text style={{ marginBottom: 10 }}>
                                                {rowData.description} | {rowData.price} VND
                                            </Text>
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
        today_food: state.dataReducer.today_food
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, homeActions, orderActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Foods);


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
    },
    orderBtn: {
        padding: 10
    }
});
