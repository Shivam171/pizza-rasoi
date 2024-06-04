import EditableImage from "@/components/EditableImage";
import { useState, useEffect } from "react";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || '');
  const [name, setName] = useState(menuItem?.name || '');
  const [description, setDescription] = useState(menuItem?.description || '');
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');

  useEffect(() => {
    if (menuItem?.image) setImage(menuItem.image);
    if (menuItem?.name) setName(menuItem.name);
    if (menuItem?.description) setDescription(menuItem.description);
    if (menuItem?.basePrice) setBasePrice(menuItem.basePrice);
  }, [menuItem]);

  return (
    <form 
      className="mt-8 max-w-md mx-auto" 
      onSubmit={ev => onSubmit(ev, {image, name, description, basePrice})}>
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
          <label>Base Price</label>
          <input
            type="text"
            value={basePrice}
            onChange={(ev) => {
              setBasePrice(ev.target.value);
            }}
          />
          <div className="bg-gray-200">
            <label>Sizes</label>
          </div>
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  )
}
