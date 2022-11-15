async function getPrice() {
    loading = true
    error = false
    let response = await fetch('http://localhost:3000/priceRg')
    let prices = await response.json()
    pricedata = prices
  }

  getPrice()


$: console.log("pricedata",pricedata)
