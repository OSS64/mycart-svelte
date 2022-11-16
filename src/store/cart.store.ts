import { writable } from 'svelte/store'

export const cart = writable([])
export class _CartStore {
	store = writable([])
	addToCart(product) {
		this.store.update((cart) => {
			const index = cart?.findIndex((item) => item.id === product.id)
			if (index === -1) {
				cart?.push({ ...product, quantity: 1 })
			} else {
				cart[index].quantity++
			}
			return cart
		})
		this.logger()
	}
	updateCartQuantity(product, quantity) {
		if (quantity === 0) {
			this.removeFromCart(product)
		}
		if (quantity > 0) {
			this.store.update((cart) => {
				console.log(cart, 22222)
				const index = cart?.findIndex((item) => item.id === product.id)
				if (index === -1) {
					cart.push({ ...product, quantity })
					return cart
				} else {
					cart[index].quantity = quantity
					return cart
				}
			})
		}
		this.logger()
	}
	removeFromCart(product) {
		this.store.update((cart) => {
			const index = cart?.findIndex((item) => item?.id === product?.id)
			if (index !== -1) {
				if (cart[index].quantity > 1) {
					cart[index].quantity--
				} else {
					cart?.splice(index, 1)
				}
			}
			return cart
		})
		this.logger()
	}
	clearItemFromCart(item) {
		this.store.update((cart) => {
			const index = cart?.findIndex((cartItem) => cartItem.id === item.id)
			if (index !== -1) {
				cart?.splice(index, 1)
			}
			return cart
		})
		this.logger()
	}
	clearCart() {
		this.store.set([])
		this.logger()
	}
	get total() {
		let total = 0
		this.store.subscribe((cart) => {
			cart?.forEach((item) => {
				total += item.price * item.quantity
			})
		})
		return total
		this.logger()
	}
	logger() {
		this.store.subscribe((cart) => {
			console.log(cart)
		})
	}
}
