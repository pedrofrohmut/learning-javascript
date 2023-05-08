import { useParams } from "@solidjs/router"
import { createResource, createSignal } from "solid-js"

import { useCartContext } from "../context/CartContext"

const fetchProduct = async (id) => {
    const res = await fetch(`http://localhost:4000/products/${id}`)
    const product = await res.json()
    return product
}

const ProductDetailPage = () => {
    const params = useParams()

    const [product] = createResource(params.id, fetchProduct)

    const { items, setItems } = useCartContext()

    const [isAdding, setIsAdding] = createSignal(false)

    const addProduct = () => {
        setIsAdding(true)
        setTimeout(() => setIsAdding(false), 1000)

        const exists = items.find(x => x.id === product().id)
        if (exists) {
            // inc quantity of existing one
            setItems(x => x.id === product().id, "quantity", x => x + 1)
            return
        }

        // add new
        setItems([...items, { ...product(), quantity: 1 }])
    }

    return (
        <div class="my-7">
            <Show when={product()} fallback={<p>loading...</p>}>
                <div className="grid grid-cols-5 gap-7">
                    <div className="col-span-2">
                        <img src={product().img} alt="Product Image" />
                    </div>

                    <div className="col-span-3">
                        <h2 className="text-3xl font-bold mb-7">{product().title}</h2>
                        <p>{product().description}</p>
                        <p className="my-7 text-2xl">Only ${product().price}</p>
                    </div>

                    <button className="btn" onClick={addProduct} disabled={isAdding()}>Add to Cart</button>

                    <Show when={isAdding()}>
                        <div className="m-2 p-2 border-amber-500 border-2 rounded-md inline-block">
                            {product().title} was added to the cart
                        </div>
                    </Show>
                </div>
            </Show>
        </div>
    )
}

export default ProductDetailPage
