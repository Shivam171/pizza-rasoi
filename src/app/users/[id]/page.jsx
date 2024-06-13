"use client";
import useProfile from "@/components/UseProfile";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
export default function EditUserPage() {
  const { loading: profileLoading, data: profileData } = useProfile();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/profile?_id=${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(user => {
        setUser(user);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });
  }, [id]);

  const handleSaveButtonClick = async (ev, data) => {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, _id: id }),
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

  if (profileData && !profileData.admin) {
    return redirect('/login');
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
}
