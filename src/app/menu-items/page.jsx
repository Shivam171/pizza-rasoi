'use client'
import useProfile from "@/components/UseProfile";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuItemsPage() {
  const { loading: profileLoading, data: profileData } = useProfile();
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => {
        setMenuItems(menuItems);
      })
    })
  }, []);

  if (profileLoading) {
    return 'Loading user info...';
  }

  if (!profileData.admin) {
    return 'Not an admin';
  }

  console.log("MenuItems: ", menuItems);

  return (
    <section className="mt-8 mx-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link
          className="button flex custom-button"
          href={'/menu-items/new'}
        >
          <span>Create new menu item</span>
          <Right />
        </Link>
      </div>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-sm text-gray-500 mt-8">Edit menu items:</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 && menuItems.map(item => {
            return (
              <Link href={'/menu-items/edit/' + item._id} className="bg-gray-200 rounded-lg p-4" key={item._id}>
                <div className="relative">
                  <Image className="rounded-md" src={item.image} alt={item.name} width={100} height={100} />
                </div>
                <div className="text-center">
                  {item.name}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}