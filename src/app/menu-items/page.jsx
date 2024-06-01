'use client'
import UserTabs from '@/components/layout/UserTabs';
import useProfile from "@/components/UseProfile";

export default function MenuItemsPage() {
  const { loading: profileLoading, data: profileData } = useProfile();

  if (profileLoading) {
    return 'Loading user info...';
  }

  if (!profileData.admin) {
    return 'Not an admin';
  }


  return (
    <section className='mt-8 max-w-lg mx-auto'>
      <UserTabs isAdmin={true} />
      <form className='mt-8'>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>Menu item name</label>
            <input type="text" />
          </div>
          <div className="mb-4">
            <button type='submit'>Create</button>
          </div>
        </div>
      </form>
    </section>
  )
}
