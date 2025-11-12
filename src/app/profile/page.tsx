import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Building2, Phone, Key, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProfileEditForm } from "@/components/profile-edit-form";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Fetch full user data from database
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      company: true,
      phone: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          quotes: true,
          projects: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link
              href="/dashboard"
              className="inline-flex items-center text-primary-500 hover:text-primary-400 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-2 gradient-text">
              My Profile
            </h1>
            <p className="text-gray-400">Manage your account information</p>
          </div>

          {/* Current Information */}
          <Card variant="default" className="p-8 mb-8">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <User className="w-4 h-4" />
                    <span>Name</span>
                  </div>
                  <div className="text-lg font-medium">{user.name || "Not set"}</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </div>
                  <div className="text-lg font-medium">{user.email}</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Building2 className="w-4 h-4" />
                    <span>Company</span>
                  </div>
                  <div className="text-lg font-medium">{user.company || "Not set"}</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Phone className="w-4 h-4" />
                    <span>Phone</span>
                  </div>
                  <div className="text-lg font-medium">{user.phone || "Not set"}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-400">Account Type</div>
                    <div className="font-medium mt-1">
                      <span className="px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-sm">
                        {user.role}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Member Since</div>
                    <div className="font-medium mt-1">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit Profile */}
          <Card variant="default" className="p-8 mb-8">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <p className="text-gray-400 text-sm mt-2">
                Update your personal information
              </p>
            </CardHeader>
            <CardContent>
              <ProfileEditForm user={user} />
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card variant="default" className="p-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                Change Password
              </CardTitle>
              <p className="text-gray-400 text-sm mt-2">
                Update your password to keep your account secure
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary-500 focus:outline-none transition-colors"
                    placeholder="Enter current password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary-500 focus:outline-none transition-colors"
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary-500 focus:outline-none transition-colors"
                    placeholder="Confirm new password"
                  />
                </div>

                <Button size="lg" variant="outline" className="w-full md:w-auto">
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card variant="default" className="p-8 mt-8 border-red-500/20">
            <CardHeader>
              <CardTitle className="text-red-500">Danger Zone</CardTitle>
              <p className="text-gray-400 text-sm mt-2">
                Irreversible account actions
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium mb-1">Delete Account</h4>
                  <p className="text-sm text-gray-400">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
