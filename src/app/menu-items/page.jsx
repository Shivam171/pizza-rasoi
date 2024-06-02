'use client'
import useProfile from "@/components/UseProfile";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuItemsPage() {
  const { loading: profileLoading, data: profileData } = useProfile();
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => {
        setMenuItems(menuItems);
        console.log(menuItems);
      })
    })
  }, []);

  if (profileLoading) {
    return 'Loading user info...';
  }

  if (!profileData.admin) {
    return 'Not an admin';
  }

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
      <div className="">
        {menuItems?.length > 0 && menuItems.map(item => {
          <div className="">
            {item.name}
          </div>
        })}
      </div>
    </section>
  )
}