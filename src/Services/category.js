// appHttp = {
//     method: "GET",
//     body: JSON.stringify(),
//     headers: { "Content-type": "application/json" }
// }

export function getCategories() {
    return fetch('https://dummyjson.com/product/categories')
      .then(data => data.json())
  }

  export function getCategoryWiseProduct(category) {
    return fetch(`https://dummyjson.com/product/category/${category}`)
      .then(data => data.json())
  }

  export function getProductDetails(id) {
    return fetch(`https://dummyjson.com/products/${id}`)
      .then(data => data.json())
  }