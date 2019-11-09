const findBudgetPerName =(budget, listName, listMonth,listYear) => {

let totalSum =0; 

budget.filter((budgetItem) => {
    // Budget withour delete date
    if(!budgetItem.deleteMonth && budgetItem.name === listName && budgetItem.year === listYear && budgetItem.month <= listMonth) {
        totalSum += parseFloat(budgetItem.cost)
    }

    // Checking for budget with delete date   
    if(budgetItem.deleteMonth > listMonth && budgetItem.year === listYear && budgetItem.month <= listMonth) {
        totalSum += parseFloat(budgetItem.cost)
    }

}); 

return totalSum; 
}; 


export default findBudgetPerName;