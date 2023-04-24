import { createResource } from "solid-js"
import { A } from "@solidjs/router"

import Card from "../components/Card"

const fetchProducts = async () => {
    const res = await fetch("http://localhost:4000/products")
    const data = await res.json()
    return data
}

const HomePage = () => {
    const [products] = createResource(fetchProducts)

    return (
        <Show when={products} loading={<p>loading...</p>}>
            <div className="grid grid-cols-4 gap-10 my-4">
                <For each={products()}>
                    {(product) => (
                        <Card rounded={true} flat={true}>
                            <img src={product.img} alt="product image" />
                            <h2 className="my-3 font-bold">{product.title}</h2>
                            <A href={`/product/${product.id}`} class="btn">View Details</A>
                        </Card>
                    )}
                </For>
            </div>
        </Show>
    )
}

export default HomePage
