export const loadContent = async (resetForm, calculationId, calculations) => {
    const body = { calculationId }

    const response = await fetch('/api/get/getCalculationRows', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (response.ok) {
      const calcRows: any = JSON.parse(await response.text())
    
      resetForm({    
        values: {
          id: calcRows.id,
          totalSupply: calcRows.totalSupply,
          months: calcRows.months,
          areaData: [],
          authorClerkId: calcRows.authorClerkId,
          name: calcRows.title,
          calculations: calculations,
          calculationRows: calcRows.CalculationRows,
        },
      })
    }    
  }