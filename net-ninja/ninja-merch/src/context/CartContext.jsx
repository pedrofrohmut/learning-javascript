import { createStore } from "solid-js/store"
import { createContext, useContext } from "solid-js"

const CartContext = createContext()

export const CartContextProvider = (props) => {
    const [items, setItems] = createStore([])

    return <CartContext.Provider value={{ items, setItems }}>{props.children}</CartContext.Provider>
}

export const useCartContext = () => useContext(CartContext)
