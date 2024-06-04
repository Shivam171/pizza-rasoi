'use client'
import useProfile from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState('');
  const { loading: profileLoading, data: profileData } = useProfile();
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, [])

  function fetchCategories() {
    fetch('/api/categories').then(res => {
      res.json().then(categories => {
        setCategories(categories);
      })
    })
  }

  if (profileLoading) {
    return 'Loading user info...';
  }

  if (!profileData.admin) {
    return 'Not an admin';
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    console.log("New category name:", categoryName);
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch('/api/categories', {
        method: editedCategory ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      fetchCategories();
      if (response.ok) {
        console.log("Category created successfully");
        resolve();
      }
      else {
        console.error("Failed to create category!");
        reject();
      }
    })
    await toast.promise(creationPromise, {
      loading: editedCategory
        ? 'Updating category...'
        : 'Creating you new category...',
      success: editedCategory
        ? 'Category updated'
        : 'Category created',
      error: 'Error, sorry...',
    })
    setCategoryName('');
    setEditedCategory(null);
  }

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? 'Update Category' : 'New category name'}
              {editedCategory && (
                <>: <b>{editedCategory.name}</b></>
              )}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={ev => setCategoryName(ev.target.value)}
            />
          </div>
          <div className="pb-4">
            <button type="submit" className="border border-primary">
              {editedCategory ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Edit category:</h2>
        {categories?.length > 0 && categories.map(c => (
          <button
            onClick={() => {
              setEditedCategory(c);
              setCategoryName(c.name);
            }}
            className="rounded-xl p-2 px-4 flex gap-1 cursor-pointer mb-1 border border-gray-300" key={c._id}>
            <span>{c.name}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
