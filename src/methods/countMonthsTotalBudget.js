
const countTotal = (AllBudget, listedMonth, listedYear) => {

    let totalSum =0; 
    AllBudget.map((item) => {

        //No delete year
        if(!item.deleteYear && (item.year === listedYear && item.month <= listedMonth  ||  item.year < listedYear )) {
            totalSum +=  parseFloat(item.cost);
        }

        //With delete year 
        if(item.deleteYear) {
            if(item.deleteMonth > listedMonth && item.year === listedYear && (item.month < item.deleteMonth && item.year === item.deleteYear)) {    
                totalSum +=  parseFloat(item.cost);
            }
        }
        
    }); 

    return totalSum;
}; 


export default countTotal; 