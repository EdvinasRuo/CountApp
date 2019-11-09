

const sortCostsByName = (monthsCosts) => {

    // find out all unique names 
    const allCostNames =[];
    monthsCosts.map((expense) => {
       allCostNames.push(expense.name.trim())
    }); 
    let uniqueCostNames = [... new Set(allCostNames)]; 

    // Add costs to right array -  according name 
    const sortedByName = uniqueCostNames.map((name) => {
        let expenses = []; 
        monthsCosts.map((cost) => {

            if(cost.name.trim() === name.trim()) {
                expenses.push(cost);
            }
        })
        return {name : name, 
                expenses: expenses  
        }
    });

return sortedByName; 
    
}; 


export default sortCostsByName; 