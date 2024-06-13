"use client";
import useProfile from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { redirect } from "next/navigation";

export default function EditUserPage() {
  const { loading: profileLoading, data: profileData } = useProfile();

  if (profileData && !profileData.admin) {
    return redirect('/login');
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
    </section>
  );
}
