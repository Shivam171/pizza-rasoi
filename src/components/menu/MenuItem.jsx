import Image from "next/image";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../AppContext";
import MenuItemTile from "../MenuItemTile";

export default function MenuItem(menuItem) {
  const { name, image, description, basePrice, sizes = [], extraIngredientPrices } = menuItem;
  const { addToCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);

  async function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return
    }
    addToCart(menuItem, selectedSize, selectedExtras);
    setShowPopup(false);
    toast.success('Item added to cart!', {
      position: 'top-right',
    })
  }

  function handleExtraThingClick(ev, extraThing) {
    const checked = ev.target.checked
    if (checked) {
      setSelectedExtras(prev => [...prev, extraThing])
    } else {
      setSelectedExtras(prev => {
        return prev.filter(e => e.name !== extraThing.name)
      })
    }
  }

  function handleClosePopup() {
    setShowPopup(false);
  }

  let selectedPrice = basePrice;

  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }

  if (selectedExtras.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }

  return (
    <>
      {showPopup && (
        <div
          onClick={handleClosePopup}
          className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div
            onClick={e => e.stopPropagation()}
            className="my-8 bg-white p-2 rounded-lg max-w-md" style={{ width: '400px' }}>
            <div className="overflow-y-scroll p-2" style={{ maxHeight: 'calc(100vh - 100px)' }}>
              <Image
                src={image}
                width={300}
                height={200}
                alt={name}
                className="mx-auto"
              />
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
              {sizes.length > 0 && (
                <div className="p-2">
                  <h3 className="text-center text-gray-700 mb-1">Pick your size:</h3>
                  {sizes.map((size, index) => (
                    <label key={index} className="flex items-center gap-2 p-4 border rounded-md mb-1">
                      <input
                        type="radio"
                        name="size"
                        value={size.name}
                        onClick={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                      /> {size.name} + ${basePrice + size.price}
                    </label>
                  ))}
                  {extraIngredientPrices?.length > 0 && (
                    <div className="p-2">
                      <h3 className="text-center text-gray-700 mb-1">Any extras?</h3>
                      {extraIngredientPrices.map((extra, index) => (
                        <label key={index} className="flex items-center gap-2 p-4 border rounded-md mb-1">
                          <input
                            type="checkbox"
                            name="extra"
                            value={extra.name}
                            onClick={(ev) => handleExtraThingClick(ev, extra)}
                          /> {extra.name} + ${extra.price}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <button
                onClick={handleAddToCartButtonClick}
                type="button"
                className="bg-primary text-white sticky bottom-2">
                Add to cart ${selectedPrice}
              </button>
              <button
                onClick={handleClosePopup}
                className="mt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <MenuItemTile
        onAddToCart={handleAddToCartButtonClick}
        {...menuItem}
      />
    </>
  );
}
