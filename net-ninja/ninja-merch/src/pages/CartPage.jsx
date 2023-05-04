import Card from "../components/Card"

import { useCartContext } from "../context/CartContext"

const CartPage = () => {
    const { items } = useCartContext()

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
            </Card>
        </div>
    )
}

export default CartPage
