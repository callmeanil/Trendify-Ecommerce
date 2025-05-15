import { createContext, useState, useEffect } from "react"
import Swal from "sweetalert2"
export const CartContext = createContext()
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart")
        return savedCart ? JSON.parse(savedCart) : []
    })
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    // Add item to cart
    const addToCart = (product, quantity = 1) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id)

            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                )
            } else {
                return [...prevCart, { ...product, quantity }]
            }
        })
    }

    const handleRemoveFromCart = (productId) => {
        const item = cart.find((item) => item.id === productId)

        if (!item) return

        if (item.quantity > 1) {
            setCart((prevCart) =>
                prevCart.map((item) =>
                    item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                )
            )
            Swal.fire({
                icon: "success",
                title: "Quantity updated",
                text: `One unit of ${item.title} removed from cart.`,
                timer: 1500,
                showConfirmButton: false,
            })
        } else {
            Swal.fire({
                title: "Are you sure?",
                text: "Do you want to remove this item from the cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, remove it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
                    Swal.fire("Removed!", "The item has been removed.", "success")
                }
            })
        }
    }
    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            handleRemoveFromCart(productId)
            return
        }

        setCart((prevCart) =>
            prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item))
        )
    }
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0)
    }
    const getCartItemsCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0)
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart: handleRemoveFromCart,
                updateQuantity,
                getTotalPrice,
                getCartItemsCount,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
