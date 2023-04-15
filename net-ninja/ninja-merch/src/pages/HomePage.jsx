import { createResource } from "solid-js"

import Card from "../components/Card"

const fetchProducts = async () => {
    const res = await fetch("http://localhost:4000/products")
    const data = await res.json()
    return data
}

const HomePage = () => {
    const [products] = createResource(fetchProducts)

    return (
        <div className="grid grid-cols-4 gap-10 my-4">
            <Card rounded={true} flat={false}>
                <h2>Ninja Tee, Black</h2>
                <p>
                    Dolor eveniet architecto ad a deleniti Ducimus blanditiis error accusamus error
                    Adipisicing repellat optio reprehenderit laborum fugiat! Aperiam possimus
                    voluptatum ratione.
                </p>
                <button className="btn">Click Me!</button>
            </Card>
            <Card rounded={false} flat={false}>
                <h2>Ninja Tee, White</h2>
                <p>
                    Dolor eveniet architecto ad a deleniti Ducimus blanditiis error accusamus error
                    Adipisicing repellat optio reprehenderit laborum fugiat! Aperiam
                </p>
                <button className="btn">Click Me!</button>
            </Card>
            <Card rounded={false} flat={true}>
                <h2>Ninja Tee, Blue</h2>
                <p>Dolor eveniet architecto ad a deleniti Ducimus blanditiis error accusamus</p>
                <button className="btn">Click Me!</button>
            </Card>
            <Card rounded={true} flat={true}>
                <h2>Ninja Tee, Green</h2>
                <p>
                    Dolor eveniet architecto ad a deleniti Ducimus blanditiis error accusamus error
                    Adipisicing repellat optio reprehenderit laborum fugiat! Aperiam possimus
                    voluptatum Adipisicing dolorem aliquid sunt accusantium?
                </p>
                <button className="btn">Click Me!</button>
            </Card>

            <p>{console.log(products(), products.loading)}</p>
        </div>
    )
}

export default HomePage
