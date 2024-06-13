'use client'
import useProfile from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const { loading: profileLoading, data: profileData } = useProfile();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('/api/users').then(res => {
      res.json().then(users => {
        setUsers(users);
      })
    })
  }, [])

  if (profileLoading) {
    return 'Loading users info...';
  }

  if (!profileData.admin) {
    return 'Not an admin';
  }

  return (
    <section className="mt-8 custom-button">
      <UserTabs isAdmin={true} />
      <div className="mt-8 ">
        {users.length > 0 && users.map(user => (
          <div className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4" key={user._id}>
            <div className="grid grid-cols-2 md:grid-col-3 gap-4 grow">
              <div className="text-gray-900">
                {!!user.name && (<span>{user.name}</span>)}
                {!user.name && (<span className="italic">No name</span>)}
              </div>
              <span className="text-gray-500">{user.email}</span>
            </div>
            <div className="">
              <Link className="button" href={'/users/' + user._id}>Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
