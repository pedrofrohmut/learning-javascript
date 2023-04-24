import { useParams } from "@solidjs/router"
import { createResource } from "solid-js"

const fetchProduct = async (id) => {
    const res = await fetch(`http://localhost:4000/products/${id}`)
    const product = await res.json()
    return product
}

const ProductDetailPage = () => {
    const params = useParams()

    const [product] = createResource(params.id, fetchProduct)

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
                </div>
            </Show>
        </div>
    )
}

export default ProductDetailPage
