import Installment from "./installment"
import { v4 as uuidv4 } from "uuid"

class Transaction {
    private readonly id: string
    private readonly code: string
    private readonly value: number
    private readonly numberInstallments: number
    private readonly paymentMethod: string
    private readonly installments: Installment[]

    constructor(
        id: string,
        code: string,
        value: number,
        numberInstallments: number,
        paymentMethod: string,
        installments: any
    ) {
        this.id = id
        this.code = code
        this.value = value
        this.numberInstallments = numberInstallments
        this.paymentMethod = paymentMethod
        this.installments = installments
    }

    public getId = () => this.id
    public getCode = () => this.code
    public getValue = () => this.value
    public getNumberInstallments = () => this.numberInstallments
    public getPaymentMethod = () => this.paymentMethod
    public getInstallments = () => this.installments

    async generateInstalments() {
        const N = this.numberInstallments
        const total = this.value
        const portion = parseFloat((total / N).toFixed(2))
        const extraFromPortionRounding = parseFloat((total - portion * N).toFixed(2))

        for (let i = 1; i <= N; i++) {
            const currentPortion = i == N ? portion + extraFromPortionRounding : portion
            this.installments.push(new Installment(uuidv4(), i, currentPortion))
        }
    }
}

export default Transaction
