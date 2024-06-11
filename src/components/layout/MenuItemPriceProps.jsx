import { useState } from "react";
import ChevronDown from "../icons/ChevronDown";
import ChevronUp from "../icons/ChevronUp";
import Plus from "../icons/Plus";
import Trash from "../icons/Trash";
export default function MenuItemPriceProps({ name, addLabel, props, setProps }) {

  const [isOpen, setIsOpen] = useState(false);

  function addProp() {
    setProps(oldProps => {
      return [...oldProps, { name: "", price: 0 }]
    })
  }

  function editProp(index, ev, prop) {
    const newValue = ev.target.value;
    setProps(prevSizes => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    })
  }
  function removeProp(indexToRemove) {
    setProps(prevSizes => prevSizes.filter((v, i) => i !== indexToRemove))
  }

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button className="inline-flex p-1 border-0 justify-start" type="button" onClick={() => setIsOpen(prev => !prev)}>
        {isOpen && (
          <ChevronUp />
        )}
        {!isOpen && (
          <ChevronDown />
        )}
        <span>{name}</span>
        <span>{props?.length}</span>
      </button>
      <div className={isOpen ? 'block' : 'hidden'}>
        {props?.length > 0 && props.map((size, index) => {
          return (
            <div key={index} className="flex items-end gap-2">
              <div className="">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Size name"
                  onChange={ev => editProp(index, ev, 'name')}
                  value={size.name}
                />
              </div>
              <div className="">
                <label>Extra price</label>
                <input
                  type="text"
                  placeholder="Extra price"
                  onChange={ev => editProp(index, ev, 'price')}
                  value={size.price}
                />
              </div>
              <div className="">
                <button
                  type="button"
                  onClick={() => removeProp(index)}
                  className="bg-white mb-4 px-2"><Trash /></button>
              </div>
            </div>
          );
        })}
        <button className="bg-white items-center" type="button" onClick={addProp}>
          <Plus className="w-4 h-4" />
          <span>{addLabel}</span>
        </button>
      </div>
    </div>
  )
}
