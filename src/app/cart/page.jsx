'use client'
import { CartContext, cartProductPrice } from "@/components/AppContext"
import useProfile from "@/components/UseProfile"
import Trash from "@/components/icons/Trash"
import AddressInputs from "@/components/layout/AddressInputs"
import SectionHeaders from "@/components/layout/SectionHeaders"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"


export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext)

  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile()

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, state, postalCode, country } = profileData
      const addressFromProfile = { phone, streetAddress, city, state, postalCode, country }
      setAddress(addressFromProfile)
    }
  }, [profileData])

  let total = 0;
  cartProducts?.forEach(product => {
    total += cartProductPrice(product)
  })
  return (
    <section className='mt-8'>
      <div className="text-center">
        <SectionHeaders subHeader={'check out'} mainHeader={'Cart'} />
      </div>
      <div className="grid gap-8 grid-cols-2 mt-4 -mb-10">
        <div className="">
          {cartProducts?.length === 0 && (
            <div className="">No products in your shopping cart.</div>
          )}
          {cartProducts?.length > 0 && cartProducts.map((product, index) => {
            return (
              <div className="flex gap-4 border-b py-4 items-center" key={product._id}>
                <div className="w-24">
                  <Image src={product.image} width={240} height={240} alt={product.name} />
                </div>
                <div className="grow">
                  <h3 className="font-semibold">{product.name}</h3>
                  {product.size && (
                    <div className="text-sm">
                      <div className="">Size: <span>{product.size.name}</span></div>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div className="text-sm text-gray-500">
                      {product.extras.map(extra => (
                        <div className="" key={extra._id}>
                          <div>{extra.name} ${extra.price}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-lg font-semibold">
                  ${cartProductPrice(product)}
                </div>
                <div className="ml-2">
                  <button
                    type="button"
                    onClick={() => removeCartProduct(index)}
                    className="p-2">
                    <Trash />
                  </button>
                </div>
              </div>
            )
          })}
          <div className="py-2 text-right pr-16">
            <span className="text-gray-500">Subtotal:&nbsp;</span>
            <span className="text-lg font-semibold text-primary">${total}</span>
          </div>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form>
            <AddressInputs
              addressProps={address}
              setAddressProps={(key, value) => setAddress({ ...address, [key]: value })}
            />
            <button type="submit">Pay ${total}</button>
          </form>
        </div>
      </div>
    </section>
  )
}
