import banner from "./assets/banner.png"

import { createSignal } from "solid-js"

import Card from "./components/Card"

const App = () => {
    const [darkTheme, setDarkTheme] = createSignal(false)

    const toggleTheme = () => {
        setDarkTheme(!darkTheme())
    }

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
            </header>

            <img class="rounded-md" src={banner} alt="site banner" />

            <div className="grid grid-cols-4 gap-10 my-4">
                <Card rounded={true} flat={false}>
                    <h2>Ninja Tee, Black</h2>
                    <p>
                        Dolor eveniet architecto ad a deleniti Ducimus blanditiis error accusamus
                        error Adipisicing repellat optio reprehenderit laborum fugiat! Aperiam
                        possimus voluptatum ratione.
                    </p>
                    <button className="btn">Click Me!</button>
                </Card>
                <Card rounded={false} flat={false}>
                    <h2>Ninja Tee, White</h2>
                    <p>
                        Dolor eveniet architecto ad a deleniti Ducimus blanditiis error accusamus
                        error Adipisicing repellat optio reprehenderit laborum fugiat! Aperiam
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
                        Dolor eveniet architecto ad a deleniti Ducimus blanditiis error accusamus
                        error Adipisicing repellat optio reprehenderit laborum fugiat! Aperiam
                        possimus voluptatum Adipisicing dolorem aliquid sunt accusantium?
                    </p>
                    <button className="btn">Click Me!</button>
                </Card>
            </div>
        </div>
    )
}

export default App
