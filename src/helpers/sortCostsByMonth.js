const sortExpenses = (monthsExpenses, fixedExpenses, cachedFixedExpenses) => {
  const allCosts = monthsExpenses.concat(fixedExpenses, cachedFixedExpenses)

  // Find out unique years
  let existingYears = []
  allCosts.map(expense => {
    if (typeof expense === 'undefined') {
      return
    }
    if (typeof expense !== undefined || typeof expense !== 'undefined') {
      existingYears.push(expense.year)
    }
  })
  const uniqueYears = [...new Set(existingYears)]

  // Sorting by year
  let sortedYears = uniqueYears.map(uniqueYear => {
    let a = []

    a = allCosts.filter(expense => {
      if (expense) {
        const year = expense.year
        return year == uniqueYear
      }
    })
    return { year: uniqueYear, expenses: a }
  })

  // Existing months in a year
  let existingMonths = []
  sortedYears.map(year => {
    year.expenses.map(costOfYear => {
      if (existingMonths.indexOf(costOfYear.month) === -1) {
        existingMonths.push(costOfYear.month)
      }
    })
  })
  existingMonths.sort()

  const totalSorted = uniqueYears.map(year => {
    const sortedByMOnth = existingMonths.map(month => {
      let expenses = []
      allCosts.map(expense => {
        // All non - fixed months costs
        if (
          (!expense.fixed &&
            (expense.month === month && expense.year === year)) ||
          // Fixed, same year, earlier months, no delete month
          (expense.fixed &&
            expense.year === year &&
            expense.month <= month &&
            !expense.deleteMonth) ||
          // Fixed, same year delete month before listing month
          (expense.fixed &&
            expense.year === year &&
            expense.deleteMonth > month) ||
          // Fixed, earlier year, no delete date
          (expense.fixed &&
            expense.fixed &&
            expense.year < year &&
            !expense.deleteMonth)
        ) {
          expenses.push(expense)
        }
      })
      const uniqueItems = [...new Set(expenses)]

      return { year: year, month: month, expenses: uniqueItems }
    })

    return { year: year, expenses: sortedByMOnth }
  })

  return totalSorted
}

export default sortExpenses
