
export default function AddressInputs({ addressProps, setAddressProps }) {
  const { phone, streetAddress, city, state, postalCode, country } = addressProps
  return (
    <>
      <label>Phone</label>
      <input type="tel" placeholder="Phone number" value={phone} onChange={ev => { setAddressProps('phone', ev.target.value) }} />

      <label>Street Address</label>
      <input type="text" placeholder="Street address" value={streetAddress} onChange={ev => { setAddressProps('streetAddress', ev.target.value) }} />

      <div className="grid grid-cols-2 gap-2">
        <div className="">
          <label>City</label>
          <input type="text" placeholder="City" value={city} onChange={ev => { setAddressProps('city', ev.target.value) }} />
        </div>
        <div className="">
          <label>State</label>
          <input type="text" placeholder="State" value={state} onChange={ev => { setAddressProps('state', ev.target.value) }} />
        </div>
      </div>

      <label>Postal Code</label>
      <input type="text" placeholder="Postal Code" value={postalCode} onChange={ev => { setAddressProps('postalCode', ev.target.value) }} />

      <label>Country</label>
      <input type="text" placeholder="Country" value={country} onChange={ev => { setAddressProps('country', ev.target.value) }} />
    </>
  )
}
