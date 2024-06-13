"use client";
import DeleteButton from "@/components/DeleteButton";
import useProfile from "@/components/UseProfile";
import Left from "@/components/icons/Left";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditMenuItemPage() {
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState(null);
  const { loading: profileLoading, data: profileData } = useProfile();

  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(items => {
        const item = items.find(i => i._id === id)
        setMenuItem(item);
      })
    })
  }, [id])

  if (profileData && !profileData.admin) {
    return redirect('/login');
  }



  const handleFormSubmit = async (ev, data) => {
    ev.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving this tasty item...",
      success: "Item saved",
      error: "Error saving item!",
    });
    setRedirectToItems(true);
  };

  if (redirectToItems) {
    return redirect("/menu-items");
  }


  const handleDeleteClick = async () => {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch(`/api/menu-items?_id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    })

    await toast.promise(promise, {
      loading: 'Deleting menu item...',
      success: 'Item deleted',
      error: 'Error deleting item!',
    })
    setRedirectToItems(true);
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={"/menu-items"} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
      <div className="max-w-2xl mx-auto mt-2">
        <div className="max-w-lg ml-auto pl-12">
          <DeleteButton label={"Delete this menu item"} onDelete={handleDeleteClick} />
        </div>
      </div>
    </section>
  );
}
