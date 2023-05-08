import Card from "../components/Card"

import { useCartContext } from "../context/CartContext"

const CartPage = () => {
    const { items } = useCartContext()

    const total = () => items.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0)

    return (
        <div className="max-w-md my-8 mx-auto">
            <Card rouded={true}>
                <h2>Your Shopping Cart</h2>
                <For each={items}>
                    {(item) => (
                        <p class="my-3">
                            {item.title} - ${item.price} x {item.quantity}
                        </p>
                    )}
                </For>

                <p className="mt-8 pt-4 border-t-2 font-bold">
                    Total cart price - ${total()}
                </p>
            </Card>
        </div>
    )
}

export default CartPage
