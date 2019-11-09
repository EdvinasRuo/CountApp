

const countTotal = (monthsExpenses) => {

    let totalSum =0; 

    monthsExpenses.map((expense) => {    
        totalSum += parseFloat(expense.cost)
    }); 


  
    return totalSum;
}; 


export default countTotal; 