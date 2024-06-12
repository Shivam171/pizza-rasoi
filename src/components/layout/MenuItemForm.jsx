import EditableImage from "@/components/EditableImage";
import { useEffect, useState } from "react";
import MenuItemPriceProps from "./MenuItemPriceProps";


export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || '');
  const [name, setName] = useState(menuItem?.name || '');
  const [description, setDescription] = useState(menuItem?.description || '');
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);
  const [category, setCategory] = useState(menuItem?.category || '');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (menuItem?.image) setImage(menuItem.image);
    if (menuItem?.name) setName(menuItem.name);
    if (menuItem?.description) setDescription(menuItem.description);
    if (menuItem?.category) setCategory(menuItem.category);
    if (menuItem?.basePrice) setBasePrice(menuItem.basePrice);
    if (menuItem?.sizes) setSizes(menuItem.sizes);
    if (menuItem?.extraIngredientPrices) setExtraIngredientPrices(menuItem.extraIngredientPrices);
  }, [menuItem]);

  useEffect(() => {
    fetch('/api/categories').then(res => {
      res.json().then(categories => {
        setCategories(categories);
      })
    })
  }, [])

  return (
    <form
      className="mt-8 max-w-2xl mx-auto"
      onSubmit={ev => onSubmit(ev, { image, name, description, basePrice, sizes, extraIngredientPrices, category })}>
      <div
        className="grid items-start gap-4"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div className="">
          <EditableImage link={image} setLink={setImage} />
        </div>

        <div className="grow">
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={(ev) => {
              setName(ev.target.value);
            }}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(ev) => {
              setDescription(ev.target.value);
            }}
          />
          <label>Category</label>
          <select value={category} onChange={ev => setCategory(ev.target.value)}>{categories?.length > 0 && categories.map(
            c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            )
          )}</select>
          <label>Base Price</label>
          <input
            type="text"
            value={basePrice}
            onChange={(ev) => {
              setBasePrice(ev.target.value);
            }}
          />
          <MenuItemPriceProps
            name={'Sizes'}
            addLabel={'Add item size'}
            props={sizes}
            setProps={setSizes} />
          <MenuItemPriceProps
            name={'Extra ingredients'}
            addLabel={'Add ingredients'}
            props={extraIngredientPrices}
            setProps={setExtraIngredientPrices} />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  )
}
