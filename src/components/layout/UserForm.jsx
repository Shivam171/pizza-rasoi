'use client';
import EditableImage from "@/components/EditableImage";
import { useEffect, useState } from "react";
import useProfile from "../UseProfile";
import AddressInputs from "./AddressInputs";


export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [image, setImage] = useState(user?.image || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
  const [state, setState] = useState(user?.state || '');
  const [city, setCity] = useState(user?.city || '');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '');
  const [country, setCountry] = useState(user?.country || '');
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();

  useEffect(() => {
    if (user?.image) setImage(user?.image)
    if (user?.email) setEmail(user?.email)
    if (user?.name) setUserName(user?.name)
    if (user?.phone) setPhone(user?.phone)
    if (user?.streetAddress) setStreetAddress(user?.streetAddress)
    if (user?.state) setState(user?.state)
    if (user?.city) setCity(user?.city)
    if (user?.postalCode) setPostalCode(user?.postalCode)
    if (user?.country) setCountry(user?.country)
    if (user?.admin) setAdmin(user?.admin)
  }, [user])

  if (!user) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return (
    <div className="flex gap-4">
      <div className="">
        <div className="p-2 rounded-lg relative max-w-[120px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={ev => onSave(ev, { name: userName, image, phone, streetAddress, state, city, postalCode, country, admin })}>
        <label>Full name</label>
        <input type="text" placeholder="first and last name" value={userName} onChange={ev => { setUserName(ev.target.value) }} />

        <label>Email</label>
        <input type="text" disabled value={user.email} />

        <AddressInputs
          addressProps={{ phone, streetAddress, city, state, postalCode, country }}
          setAddressProps={(key, value) => {
            if (key === 'phone') setPhone(value)
            if (key === 'streetAddress') setStreetAddress(value)
            if (key === 'city') setCity(value)
            if (key === 'state') setState(value)
            if (key === 'postalCode') setPostalCode(value)
            if (key === 'country') setCountry(value)
          }}
        />

        {loggedInUserData?.admin && (
          <div className="">
            <label htmlFor={'adminCb'} className="p-2 inline-flex items-center gap-2 mb-2">
              <input
                checked={admin}
                onChange={ev => setAdmin(ev.target.checked)}
                type="checkbox"
                id="adminCb" />
              <span>Admin</span>
            </label>
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  )
}
