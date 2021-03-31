// Responsible for responding to a date range selection

export const PaymentDateRange = (payments, startDate, endDate) => {

    const filtered_payments = payments.filter(p => 
        new Date(p.date) >= new Date(startDate)
        && 
        new Date(p.date) <= new Date(endDate)
        )

    return (
        filtered_payments
    )
}