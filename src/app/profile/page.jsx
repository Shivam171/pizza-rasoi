'use client';
import EditableImage from "@/components/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const session = useSession();
  const { status } = session;
  const [userName, setUserName] = useState('');
  const [image, setImage] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
      fetch('api/profile').then(response => {
        response.json().then(data => {
          // console.log(data);
          setPhone(data.phone);
          setStreetAddress(data.streetAddress);
          setCity(data.city);
          setState(data.state);
          setPostalCode(data.postalCode);
          setCountry(data.country);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        })
      });
    }
  }, [session, status]);

  // console.log(session);

  if (status === 'loading' || !profileFetched) {
    return 'Loading...'
  }

  if (status === 'unauthenticated') {
    redirect('/login');
  }

  const handleProfileInfoUpdate = async (ev) => {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userName, image, streetAddress, phone, postalCode, city, state, country
        }),
      })
      if (response.ok)
        resolve()
      else
        reject();
    })
    toast.promise(savingPromise, {
      loading: 'Saving...',
      success: 'Profile saved !',
      error: 'An error occured ! Try again.',
    });
  }

  return (
    <section className='mt-8'>
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-md mx-auto mt-8">
        <div className="flex gap-4">
          <div className="">
            <div className="p-2 rounded-lg relative max-w-[120px]">
              <EditableImage link={image} setLink={setImage}/>
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <label>Full name</label>
            <input type="text" placeholder="first and last name" value={userName} onChange={ev => { setUserName(ev.target.value) }} />

            <label>Email</label>
            <input type="text" disabled value={session.data.user.email} />

            <label>Phone</label>
            <input type="tel" placeholder="Phone number" value={phone} onChange={ev => { setPhone(ev.target.value) }} />

            <label>Street Address</label>
            <input type="text" placeholder="Street address" value={streetAddress} onChange={ev => { setStreetAddress(ev.target.value) }} />

            <div className="flex gap-2">
              <div className="">
                <label>City</label>
                <input type="text" placeholder="City" value={city} onChange={ev => { setCity(ev.target.value) }} />
              </div>
              <div className="">
                <label>State</label>
                <input type="text" placeholder="State" value={state} onChange={ev => { setState(ev.target.value) }} />
              </div>
            </div>

            <label>Postal Code</label>
            <input type="text" placeholder="Postal Code" value={postalCode} onChange={ev => { setPostalCode(ev.target.value) }} />

            <label>Country</label>
            <input type="text" placeholder="Country" value={country} onChange={ev => { setCountry(ev.target.value) }} />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  )
}
