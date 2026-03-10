import React, { createContext, useContext, useReducer, useCallback } from "react"

const CartContext = createContext()

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.title === action.item.title)
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.title === action.item.title
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.item, quantity: 1 }],
      }
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.title !== action.title),
      }
    case "UPDATE_QTY": {
      if (action.quantity < 1) {
        return {
          ...state,
          items: state.items.filter((i) => i.title !== action.title),
        }
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.title === action.title ? { ...i, quantity: action.quantity } : i
        ),
      }
    }
    case "CLEAR":
      return { ...state, items: [] }
    case "TOGGLE_DRAWER":
      return { ...state, drawerOpen: !state.drawerOpen }
    case "SET_DRAWER":
      return { ...state, drawerOpen: action.open }
    default:
      return state
  }
}

export function CartProvider({ children, formspreeId }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    drawerOpen: false,
  })

  const addItem = useCallback(
    (product) =>
      dispatch({
        type: "ADD_ITEM",
        item: {
          title: product.title,
          price: product.price,
          emoji: product.emoji,
          card_color: product.card_color,
        },
      }),
    []
  )

  const removeItem = useCallback(
    (title) => dispatch({ type: "REMOVE_ITEM", title }),
    []
  )

  const updateQty = useCallback(
    (title, quantity) => dispatch({ type: "UPDATE_QTY", title, quantity }),
    []
  )

  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), [])

  const toggleDrawer = useCallback(
    () => dispatch({ type: "TOGGLE_DRAWER" }),
    []
  )

  const setDrawer = useCallback(
    (open) => dispatch({ type: "SET_DRAWER", open }),
    []
  )

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = state.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        drawerOpen: state.drawerOpen,
        itemCount,
        subtotal,
        formspreeId,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        toggleDrawer,
        setDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
