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
    AsyncStorage
} from 'react-native'; // 5.0.6

import * as orderActions from '../actions/Order'; //Import your actions

const Form = t.form.Form;

const OrderFood = t.struct({
    amount: t.Number,
    description: t.maybe(t.String)
});

class OrderFoodModal extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        const { params } = this.props.navigation.state;
        const foodId = params ? params.foodId : null;
        const foodName = params ? params.foodName : null;

        this.props.initOrderFoodDetail(foodId, foodName);
    }

    async ok(foodId) {
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

        result.orderList = {};
        result.orderList[foodId] = value;

        let orderResult = JSON.stringify(result);
        await AsyncStorage.setItem('orders', orderResult);
        this.props.navigation.navigate("Foods");
    }

    _validateFields() {
        return {
            fields: {
                amount: {
                    error: "Please provide amount",
                    returnKeyType: "next",
                    onSubmitEditing: () => this.refs.form.getComponent('amount').refs.input.focus()
                }
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 30 }}>{JSON.stringify(this.props.foodName || 'Unknown')}</Text>
                <View style={styles.title}>
                    <Form
                        ref={c => this._form = c}
                        type={OrderFood}
                        options={this._validateFields}
                        value = {(this.props.order) ? this.props.order : null}
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
        foodName: state.orderReducer.foodName,
        foodId: state.orderReducer.foodId,
        order: state.orderReducer.order
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, orderActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderFoodModal);

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