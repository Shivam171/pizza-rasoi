import AddToCartButton from "./AddToCartButton"

export default function MenuItemTile({ onAddToCart, ...item }) {
  const { name, description, image, basePrice, sizes, extraIngredientPrices } = item
  const hasSizesOrExtras = sizes?.length > 0 || extraIngredientPrices?.length > 0
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="">
        <img src={image} className="max-h-auto max-h-24 block mx-auto" alt="pizza" />
      </div>
      <h4 className="font-semibold my-3 text-xl">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      <AddToCartButton image={image} hasSizesOrExtras={hasSizesOrExtras} onClick={onAddToCart} basePrice={basePrice} />
    </div>
  )
}
