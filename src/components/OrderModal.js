import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import t from 'tcomb-form-native'; // 0.6.9

import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Button,
    AsyncStorage,
    Alert
} from 'react-native'; // 5.0.6

import * as orderActions from '../actions/Order'; //Import your actions
import * as homeActions from '../actions/Home'; //Import your actions

const Form = t.form.Form;

const Order = t.struct({
    name: t.String,
    address: t.String,
    phone: t.String
});

class OrderModal extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        this.props.initOrderDetail();
    }

    async ok() {
        let result = await AsyncStorage.getItem('orders');
        let validate = this._form.validate();

        if(!validate.isValid()) {
            return;
        }

        const value = this._form.getValue();
        result = JSON.parse(result);

        if(!result || typeof result !== 'object') {
            await AsyncStorage.removeItem('orders');
            result = {};
        }

        console.log('today_data: ', this.props.today_data);
        result.name = value.name;
        result.address = value.address;
        result.phone = value.phone;

        result.wdayNumber = this.props.today_data.wdayNumber;
        result.week = this.props.today_data.week;

        let orderResult = JSON.stringify(result);
        await AsyncStorage.setItem('orders', orderResult);
        await this.props.updateOrders();
        let response = this.props.response;

        if(response.code !== 200) {
            Alert.alert(
                'Order status',
                'Fail',
                [],
                { cancelable: true }
            );
            return;
        }

        Alert.alert(
            'Order status',
            'Successfully',
            [
                {text: 'OK', onPress: () =>  this.props.navigation.navigate("Foods")},
            ],
            { cancelable: false }
        );
    }

    _validateFields() {
        return {
            fields: {
                name: {
                    error: "Please provide name",
                    returnKeyType: "next",
                    onSubmitEditing: () => this.refs.form.getComponent('name').refs.input.focus()
                },
                address: {
                    error: "Please provide address",
                    returnKeyType: "next",
                    onSubmitEditing: () => this.refs.form.getComponent('address').refs.input.focus()
                },
                phone: {
                    error: "Please provide phone",
                    returnKeyType: "next",
                    onSubmitEditing: () => this.refs.form.getComponent('phone').refs.input.focus()
                }
            }
        }
    }

    decorateInitValue() {
        return {
            name: this.props.name,
            address: this.props.address,
            phone: this.props.phone,
            response: this.props.response
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 30 }}>Order Address</Text>
                <View style={styles.title}>
                    <Form
                        ref={c => this._form = c}
                        type={Order}
                        options={this._validateFields}
                        value = {this.decorateInitValue()}
                    />
                </View>
                <Button
                    onPress={() => this.ok(this.props.foodId || null)}
                    title="Ok"
                />
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        loading: state.orderReducer.loading,
        name: state.orderReducer.name,
        address: state.orderReducer.address,
        phone: state.orderReducer.phone,
        today_data: state.dataReducer.today_data,
        response: state.orderReducer.response
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, homeActions, orderActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderModal);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
    },

    title: {
        paddingBottom: 10
    }
});