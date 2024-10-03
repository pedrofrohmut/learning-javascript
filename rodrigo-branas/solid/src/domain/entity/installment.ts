class Installment {
    private readonly id: string
    private readonly number: number
    private readonly value: number

    constructor(id: string, number: number, value: number) {
        this.id = id
        this.number = number
        this.value = value
    }

    public getId = () => this.id
    public getNumber = () => this.number
    public getValue = () => this.value
}

export default Installment
