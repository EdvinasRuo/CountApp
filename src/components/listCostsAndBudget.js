import React, {useContext } from 'react'; 
import {StyleSheet, Text, FlatList, TouchableOpacity, View} from 'react-native'; 
import {Divider} from 'react-native-elements'; 
import Spacer from './spacer'; 
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
import countTotal from '../methods/countTotal';
import countMonthsBudget from '../methods/countMonthsTotalBudget'; 

const ExpensesList = ({costs, navigation, allBudget}) => {


    return(
        <Spacer>
            <FlatList
            data={costs}
            keyExtractor = {item => item.year}
            renderItem={({item})=> {
                return <>     
                    <Collapse>
                    <CollapseHeader style={styles.yearContainer}>
                            <Text style={styles.year}>{item.year}</Text> 
                        </CollapseHeader>
                        <CollapseBody>
                            <View style={styles.titleContainer}>
                                <Text style={styles.titleItem}>Month</Text>
                                <Text style={styles.titleItem}>Expenses</Text>
                                <Text style={styles.titleItem}>Budget</Text>
                            </View>
                    <FlatList 
                        data= {item.expenses}
                        keyExtractor={item => item.month}
                        renderItem={(month)=> {
                            return <> 
                                <TouchableOpacity onPress={()=> navigation.navigate('StatDetail', {month, allBudget})} >
                                    <Divider style={{ backgroundColor: 'black' }} />
                                    <View style={styles.listContainer}>
                                        <Text style={styles.monthItem}>{'Month ' + month.item.month }</Text>
                                        <Text style={styles.monthItem}>
                                            {countTotal(month.item.expenses)}
                                        </Text>
                                        <Text style={styles.monthItem}>
                                         {countMonthsBudget(allBudget, month.item.expenses[0].month, month.item.expenses[0].year)}
                                        </Text>
                                    </View>
                                </TouchableOpacity>                               
                            </>
                        }}
                    />
                    </CollapseBody>
                </Collapse>    
                </>
            }}     
        /> 
    </Spacer>
    ); 
}; 


const styles = StyleSheet.create({

    yearContainer: {
        flexDirection:'row', 
        justifyContent:'center'
    },
    year:{
        fontSize: 26,
        marginBottom: 15,
        textAlign:'center'
    }, 
    titleContainer:{
        flexDirection:'row',
        justifyContent:'flex-end',
        
    }, 
    titleItem:{
        padding: 5,
        flex:1, 
        paddingBottom: 0,
        fontSize: 18,
        fontWeight:'bold',
    
    }, 

    listContainer:{
        flexDirection:'row',
        justifyContent:'flex-end'
    }, 
    arrow: {
        fontSize:16,
        paddingTop: 15,
        paddingLeft: 2,
        color: 'rgb(224,224,224)'
    },
    dateContainer: {
        marginBottom: 5
    },
    date: {
        fontSize: 15,
        margin: 7,
        marginLeft: 15,
        color: '#606060'
    }, 
    monthItem:{
        padding: 5,
        flex:1, 
        paddingBottom: 0,
        fontSize: 18,
    },
    chevron: {
        marginTop: 5,
        color: 'rgb(224,224,224)'
    }

}); 

export default ExpensesList; 