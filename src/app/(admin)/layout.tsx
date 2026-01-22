"use server"

import { auth } from "@/features/auth/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import AdminNavbar from "@/features/admin/components/Admin"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || session.user.id !== "pv8fETHJNurooR2cx3Ju1ydLwmvsgRmG") {
    redirect("/")
  }

  return (
    <>
      <div className="pt-[73.52px] md:pt-[70px]">
        {children}
      </div>
      <AdminNavbar />
    </>
  )
}
