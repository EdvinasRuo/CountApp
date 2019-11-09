import React, {useState} from 'react'; 
import {StyleSheet, TouchableOpacity, View} from 'react-native'; 
import {Text, Button, Input} from 'react-native-elements'; 
import Spacer from '../components/spacer'; 
import AddCosts from '../components/addCostForm'; 
import {connect} from 'react-redux'; 
import checkNumbers from '../methods/validateNumbers'; 
import {setFavoriteTypes, setSearchTypes, addExpense} from '../redux/app-redux';

//Redux 
const mapStateToProps = (state) => {
    return {
        favoriteTypes: state.favoriteTypes,
        searchTypes: state.searchTypes,
        monthsExpenses: state.monthsExpenses,
    }; 
}; 
const mapDispatchToProps =(dispatch) => {
    return {
        setFavoriteTypes: (type) => {dispatch(setFavoriteTypes(type))},
        setSearchTypes: (searchType) => {dispatch(setSearchTypes(searchType))},
        addExpense: (name, cost) => {dispatch(addExpense(name, cost))},
    };
}; 

const AddExpenseScreen = (props) => {

    const [errorMessage, setErrorMessage] = useState(''); 

    addCosts = ({cost, type, quickMeniu}) => {        
        // Validate type input 
        if(!type) {
            setErrorMessage('You must enter a name of costs'); 
            return; 
        }
        type.trim(); 

        //Validate cost
        if(!cost) {
            setErrorMessage('You must enter a valid number.'); 
            return; 
        } 

        let trimmedCost = checkNumbers(cost); 
        if(!trimmedCost || trimmedCost === null || trimmedCost === '') {
            setErrorMessage('You must enter a valid number.'); 
            return; 
        }

        //Add to quick -meniu if marked 
        if(quickMeniu) {
            props.setFavoriteTypes(type); 
        }

        // Add to search array - always 
        props.setSearchTypes(type); 

        //Save expense for the month
        props.addExpense(type, cost);

        // Actions after
        setErrorMessage(''); 
        props.navigation.navigate('Home');

    };

    return (
    <>  
        <Spacer>
            { errorMessage 
                ? <Text style={styles.errorMessage}>
                {errorMessage}
                </Text> 
                : null
            }
            <Spacer>
                <AddCosts 
                    onSubmit={addCosts} 
                /> 
            </Spacer>
        </Spacer>    
    </>
    ); 
}; 



const styles = StyleSheet.create({

    errorMessage: { 
        color:'white', 
        backgroundColor:'#ff8a80',
        fontSize: 18, 
        padding: 5,
        textAlign: 'center'
    }


}); 

AddExpenseScreen.navigationOptions = {
    title:'Add an expense'
}; 

export default connect (mapStateToProps, mapDispatchToProps)(AddExpenseScreen);

