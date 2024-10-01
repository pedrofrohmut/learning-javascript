import InstallmentDto from "./installment-dto"

class TransactionDto {
    public id?: string
    public code?: string
    public value?: number
    public numberInstallments?: number
    public paymentMethod?: string
    public createdAt?: string
    public installments?: InstallmentDto[]
}

export default TransactionDto
