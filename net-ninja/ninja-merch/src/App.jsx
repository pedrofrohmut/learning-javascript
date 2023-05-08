import banner from "./assets/banner.png"

import { createSignal } from "solid-js"
import { Route, Routes, A } from "@solidjs/router"

import HomePage from "./pages/HomePage"
import CartPage from "./pages/CartPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import { useCartContext } from "./context/CartContext"

const App = () => {
    const [darkTheme, setDarkTheme] = createSignal(false)

    const toggleTheme = () => {
        setDarkTheme(!darkTheme())
    }

    const { items } = useCartContext()

    const quantity = () => items.reduce((acc, curr) => acc + curr.quantity, 0)

    return (
        <div class="container m-auto">
            <header
                class="my-4 p-2 text-xl flex items-center gap-4"
                classList={{ "bg-neutral-900": darkTheme(), "text-white": darkTheme() }}
            >
                <span className="material-symbols-outlined cursor-pointer" onClick={toggleTheme}>
                    light_mode
                </span>
                <h1>Ninja Merch</h1>

                <A href="/">Home</A>
                <A href="/cart">Cart <span>({quantity()})</span> </A>
            </header>

            {/* Banner */}
            <img class="rounded-md" src={banner} alt="site banner" />

            <Routes>
                <Route path="/" component={HomePage} />
                <Route path="/cart" component={CartPage} />
                <Route path="/product/:id" component={ProductDetailPage} />
            </Routes>
        </div>
    )
}

export default App
