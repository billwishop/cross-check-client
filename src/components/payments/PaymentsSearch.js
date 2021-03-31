// Responsible for calculating the sum of the payments 
// when the user searches by name / ref_num

export const PaymentSearch = (payments, searchTerm) => {
    const filtered_payments = payments.filter(p => 
        p.ref_num.toLowerCase().includes(searchTerm.toLowerCase())
        || 
        p.tenant.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    let sum = 0
    for (const payment of filtered_payments){
        sum += payment.amount
    }

    return (
        sum
    )
}