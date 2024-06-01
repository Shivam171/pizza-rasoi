'use client'
import EditableImage from '@/components/EditableImage';
import UserTabs from '@/components/layout/UserTabs';
import useProfile from "@/components/UseProfile";
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function MenuItemsPage() {
  const { loading: profileLoading, data: profileData } = useProfile();
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState('');

  if (profileLoading) {
    return 'Loading user info...';
  }

  if (!profileData.admin) {
    return 'Not an admin';
  }

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();
    const data = {
      image, name, description, basePrice
    }
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/menu-items', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
      if (response.ok) {
        resolve()
      } else {
        reject()
      }
    })
    await toast.promise(savingPromise, {
      loading: 'Saving this tasty item...',
      success: 'Item saved',
      error: 'Error saving item!'
    })
  }

  return (
    <section className='mt-8'>
      <UserTabs isAdmin={true} />
      <form className='mt-8 max-w-lg mx-auto' onSubmit={handleFormSubmit}>
        <div
          className="grid items-start gap-4"
          style={{ gridTemplateColumns: '.3fr .7fr' }}
        >
          <div className="">
            <EditableImage link={image} setLink={setImage} />
          </div>
          <div className="grow">
            <label>Item name</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => { setName(ev.target.value) }}
            />
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(ev) => { setDescription(ev.target.value) }}
            />
            <label>Base Price</label>
            <input
              type="text"
              value={basePrice}
              onChange={(ev) => { setBasePrice(ev.target.value) }}
            />
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </section>
  )
}
