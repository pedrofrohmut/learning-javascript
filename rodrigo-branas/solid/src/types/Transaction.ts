import Installment from "./Installment"

type Transaction = {
    id: string
    code: string
    value: number
    numberInstallments: number
    paymentMethod: string
    createdAt: string
    installments: Installment[]
}

export default Transaction
