import InstallmentsGenerator from "../entities/InstallmentsGenerator"
import InstallmentsPriceGenerator from "../entities/InstallmentsPriceGenerator"
import InstallmentsSacGenerator from "../entities/InstallmentsSacGenerator"

class InstallmentsGeneratorFactory {
    static create(type: string): InstallmentsGenerator {
        switch (type) {
            case "price":
                return new InstallmentsPriceGenerator()
            case "sac":
                return new InstallmentsSacGenerator()
            default:
                throw new Error("Invalid installment type")
        }
    }
}

export default InstallmentsGeneratorFactory
