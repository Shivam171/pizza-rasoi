'use client';
import UserForm from "@/components/layout/UserForm";
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
      fetch('api/profile')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setUser(data);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        })
        .catch(error => {
          console.error('Error fetching profile:', error);
        });
    }
  }, [session, status]);

  if (status === 'loading' || !profileFetched) {
    return 'Loading...'
  }

  if (status === 'unauthenticated') {
    redirect('/login');
  }

  const handleProfileInfoUpdate = async (ev, data) => {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
      <div className="max-w-2xl mx-auto mt-8">
        <UserForm user={user} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  )
}
