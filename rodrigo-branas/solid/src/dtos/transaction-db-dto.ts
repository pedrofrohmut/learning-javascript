import InstallmentDbDto from "./installment-db-dto"

class TransactionDbDto {
    public id?: string
    public code?: string
    public value?: number
    public number_installments?: number
    public payment_method?: string
    public created_at?: string
    public installments?: InstallmentDbDto[]
}

export default TransactionDbDto
