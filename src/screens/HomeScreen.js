import React from 'react'; 
import {StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native'; 
import {Text} from 'react-native-elements'; 
import Spacer from '../components/spacer'; 
import {AntDesign} from '@expo/vector-icons'; 
import QuickList from '../components/quickList'; 
import ListExpsenses from '../components/listMonthsExpenses';  
import {connect} from 'react-redux'; 
import moment from 'moment';

//Redux 
const mapStateToProps = (state) => {
    return {
        favoriteTypes: state.favoriteTypes,
        searchTypes: state.searchTypes,
        monthsExpenses: state.monthsExpenses,
        fixedExpenses: state.fixedExpenses,
        cachedFixedExpenses: state.cachedFixedExpenses
    }; 
}; 


const homeScreen = ({navigation, monthsExpenses, fixedExpenses}) => {

    const thisMonthsArray = monthsExpenses.filter((object) => {

        return object.month == moment().format('M') 
        && object.year === moment().format('YYYY');
    });

    thisMonthsArray.sort(); 

    let thisMonthsFixed = []
    thisMonthsFixed = fixedExpenses.filter((obj) => {
            return moment().format('YYYY') === obj.year && obj.month <= moment().format('M') 
            || moment().format('YYYY') === obj.year && obj.deleteMonth > moment().format('M')
            || obj.year < moment().format('YYYY') && !obj.deleteMonth
    })

    //Total cost this month 
    let totalCost = 0;
    thisMonthsArray.map((obj) => {
        totalCost += parseFloat(obj.cost);
    });

    let totalFixed = 0; 
    if(thisMonthsFixed) {
        thisMonthsFixed.map((fixedCost) => {
            totalFixed +=parseFloat(fixedCost.cost);
        })
    }

    
    return (
    <ScrollView>  
        <Spacer>
            <Text h3 style={styles.title}>Add your daily costs here.</Text>  
            <Text style={styles.quickMenu}>Your quick - menu items: </Text>
        </Spacer>
        <QuickList/>
        <Spacer>
            <TouchableOpacity onPress={()=>navigation.navigate('AddExpense')}>
                <AntDesign 
                    name="pluscircle" 
                    size={50} 
                    style={styles.plus}
                />
            </TouchableOpacity>
        </Spacer>    
        <Spacer>
            <Text>Month's expenses</Text>
            {thisMonthsArray.length > 0 
            ? <View style={styles.monthsContainer}>
                <ListExpsenses array={thisMonthsArray}/>
                <Text style={styles.monthsSubTotal}>Total cost: {totalCost}</Text>
            </View>
            : <Text style={styles.smallInfo}>No expenses yet. Press plus sign above to add.</Text>}
        </Spacer>
        <Spacer>
        <Text>Fixed expenses</Text>
        {thisMonthsFixed.length > 0 ? 
        <View style={styles.fixedCostContainer}>
            <ListExpsenses array={thisMonthsFixed}/>
            <Text style={styles.monthsSubTotal}>Total Fixed cost: {totalFixed}</Text>
        </View>
        :  <Text style={styles.smallInfo}>No fixed expenses yet. Press 'Fixed Expenses' in the meniu below to add.</Text> }

        </Spacer>
        <View style={styles.totalSumContainer}>
            <Text style={styles.totalSum}>Total this month: {totalCost + totalFixed}</Text>
        </View>
        
    </ScrollView>
    ); 
}; 

homeScreen.navigationOptions = {
    header:null
}; 

const styles = StyleSheet.create({
    title:{
        paddingTop: 15
    }, 
    plus: {
        color: '#00e676'
    }, 
    quickMenu: {
        paddingTop: 20, 
        fontSize: 20
    }, 
    totalSumContainer:{
        backgroundColor:'#f3f1f1',
        flex:1
    },
    totalSum:{
        alignSelf:'flex-end',
        paddingRight: 30, 
        fontSize: 20, 
    }, 
    smallInfo:{
        fontSize: 13, 
        color: 'grey'
    }, 
    monthsContainer: {
        backgroundColor: '#f8fbfe',
        borderColor:'#3394e8', 
        borderWidth: 2
        
    }, 
    fixedCostContainer: {
        backgroundColor: '#f1f3f2', 
        borderColor:'#9b9d9f', 
        borderWidth: 2
    },
    monthsSubTotal: {
        fontSize: 15,
        alignSelf:'flex-end',
        paddingRight: 10, 
        fontWeight: 'bold',
        paddingTop: 3
    }

    

}); 


export default connect (mapStateToProps)(homeScreen);

