"use client"
const MenuItem = React.lazy(() => import('@/components/menu/MenuItem'));
const SectionHeaders = React.lazy(() => import('@/components/layout/SectionHeaders'));
import React, { Suspense, useEffect, useState } from "react";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('/api/menu-items')
      .then(res => res.json())
      .then(menuItems => setMenuItems(menuItems));
    fetch('/api/categories')
      .then(res => res.json())
      .then(categories => setCategories(categories))
  }, [])

  return (
    <section className="mt-8">
      {categories.length > 0 && categories.map((category) => {
        return (
          <div key={category._id}>
            <div className="text-center">
              <SectionHeaders mainHeader={category.name} subHeader={"Best Seller"} />
            </div>
            <div className="mt-6 mb-12 grid grid-cols-3 gap-4">
              {menuItems.filter((item) => item.category === category._id).map((item) => {
                return <Suspense fallback={<div>Loading...</div>} key={item._id}><MenuItem {...item} /></Suspense>
              })}
            </div>
          </div>
        )
      })}
    </section>
  )
}
