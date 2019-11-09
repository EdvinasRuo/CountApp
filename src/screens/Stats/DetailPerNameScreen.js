import React from 'react'; 
import {StyleSheet, FlatList, View, TouchableOpacity} from 'react-native'; 
import {Text} from 'react-native-elements'; 
import Spacer from '../../components/spacer'; 
import {AntDesign} from '@expo/vector-icons'; 
import {connect} from 'react-redux';
import {deleteExpense} from '../../redux/app-redux'; 

const mapDispatchToProps =(dispatch) => {
    return {
        deleteExpense: (id) => {dispatch(deleteExpense(id))},
    };
}; 

const CostDetailScreen = ({navigation, deleteExpense}) => {
    
    const deleteVarExpense = (id) => {
        deleteExpense(id); 
        navigation.goBack();
    };

    const currentItem = navigation.state.params.item.item; 
  
    return (
    <>  
        <Spacer>
         <Text>Expense name: {currentItem.name}</Text>
            <FlatList 
                data={currentItem.expenses}
                keyExtractor= {item => item.id}
                renderItem={(item)=> {
                    return <>
                        <View style={styles.listContainer}>
                            {!item.item.fixed 
                            ? <TouchableOpacity onPress={() => deleteVarExpense(item.item.id)}>
                                <AntDesign name="delete" size={20} style={styles.delIcon}/>
                            </TouchableOpacity> 
                            : null}
                            <Text style={styles.listItem}>{item.item.date}</Text>
                            <Text style={styles.listItem}>{item.item.cost}</Text>
                        </View> 
                    </>
                }}
            />
        </Spacer>
           
    </>
    ); 
}; 




const styles = StyleSheet.create({
    listContainer:{
        flexDirection:'row',
        justifyContent:'flex-end'
    }, 
    listItem:{
        padding: 5,
        flex:1, 
        paddingBottom: 0,
    }, 
    delIcon: { 
        color: "red",
        padding: 5,
        paddingTop: 10
    }

}); 

CostDetailScreen.navigationOptions = {
    title: `Cost logg screen`
}; 




export default connect(null,mapDispatchToProps)(CostDetailScreen);