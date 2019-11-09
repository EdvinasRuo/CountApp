const sortBudget = (allBudget) => {

    // Find out unique years
    let existingYears = []; 
    allBudget.map((budgetItem) =>{
        if(typeof(budgetItem) === 'undefined') {
            return; 
        }
        if(typeof(budgetItem) != undefined || typeof(budgetItem) != 'undefined' ) {
            existingYears.push(budgetItem.year)
        }
    })
    const uniqueYears = [...new Set(existingYears)]; 
         
        //Sorting according years
        let sortedYears = [];
        sortedYears = uniqueYears.map((uniqueYear) => {
        let a = []

        a = allBudget.filter((budgetItem) => {
            
            return typeof(budgetItem)
        })

        a= allBudget.filter((budgetItem) => {
            if(budgetItem) {
                const year = budgetItem.year;
                return year == uniqueYear;
            }
            return;
            }); 
            return {year: uniqueYear, 
                    budgetItems: a
            }; 
        });

      var sortedMonths = sortedYears.map((year) => {
        
        //Existing months in a year 
        let existingMonths = []; 
        year.budgetItems.map((item) => {
           
            if(existingMonths.indexOf(item.month) === - 1){
                existingMonths.push(item.month)
            }
        }); 

        existingMonths.sort(); 

        const sortedBudgetItems = existingMonths.map((month) => {

            let filteredBudget = []; 
            year.budgetItems.map((item) => {
                if(item.month <= month && !item.deleteMonth) {
                    filteredBudget.push(item);
                }

                // Checking for budget with delete date   
                if(item.deleteMonth > month && item.year === item.deleteYear && item.month <= month) {
                    filteredBudget.push(item);
                }
  
            })
            return {month: month, 
                budgetItem: filteredBudget}
        })
        return {year: year.year,
                budget: sortedBudgetItems
        }
      });

      
return sortedMonths; 

}; 

export default sortBudget; 