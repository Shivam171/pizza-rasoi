'use client';
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const session = useSession();
  const [userName, setUserName] = useState('');
  const { status } = session;
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(session.data.user.name);
    }
  }, [session, status]);

  // console.log(session);

  if (status === 'loading') {
    return 'Loading...'
  }

  if (status === 'unauthenticated') {
    redirect('/login');
  }

  const userImage = session.data.user.image;


  const handleProfileInfoUpdate = async (ev) => {
    ev.preventDefault();
    setSaved(false);
    setIsSaving(true);
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName }),
    })
    setIsSaving(false);
    if (response.ok) {
      setSaved(true);
    }
  }

  const handleFileChange = async (ev) => {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData;
      data.set('file', files[0]);
      await fetch('api/upload', {
        method: 'POST',
        body: data,
      })
    }
  }

  return (
    <section className='mt-8'>
      <h1 className='text-center text-primary text-4xl mb-4'>Profile</h1>
      <div className="max-w-md mx-auto">
        {saved && (
          <h1 className="text-center bg-green-200 p-4 rounded-lg border border-green-300" >Profile saved !</h1>
        )}
        {isSaving && (
          <h1 className="text-center bg-blue-200 p-4 rounded-lg border border-blue-300" >Saving...</h1>
        )}
        <div className="flex gap-4 items-center">
          <div className="">
            <div className="p-2 rounded-lg relative">
              <Image className="rounded-lg w-full h-full mb-1" src={userImage} alt={'avatar'} width={300} height={300} />
              <label>
                <input type="file" name="" id="" className="hidden" onChange={handleFileChange} />
                <span className="border border-gray-300 rounded-lg p-2 text-center block cursor-pointer">Edit</span>
              </label>
              {/* <button type="button">Edit</button> */}
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input type="text" placeholder="first and last name" value={userName} onChange={ev => { setUserName(ev.target.value) }} />
            <input type="text" disabled value={session.data.user.email} />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  )
}
