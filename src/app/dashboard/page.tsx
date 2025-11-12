import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, User, FileText, Settings } from "lucide-react";
import { SignOutButton } from "@/components/sign-out-button";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-2 gradient-text">
                Dashboard
              </h1>
              <p className="text-gray-400">Welcome back, {user.name}!</p>
            </div>
            <SignOutButton />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card variant="default" className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <div className="text-3xl font-display font-bold">0</div>
                  <div className="text-sm text-gray-400">Active Quotes</div>
                </div>
              </div>
            </Card>

            <Card variant="default" className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
                  <Settings className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <div className="text-3xl font-display font-bold">0</div>
                  <div className="text-sm text-gray-400">Projects</div>
                </div>
              </div>
            </Card>

            <Card variant="default" className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-primary-500">
                    {user.role}
                  </div>
                  <div className="text-sm text-gray-400">Account Type</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card variant="default" className="p-8">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button size="lg" asChild>
                  <Link href="/calculators">Get New Quote</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/profile">View Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card variant="default" className="p-8 mt-6">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-white/5">
                <span className="text-gray-400">Name</span>
                <span className="font-medium">{user.name}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/5">
                <span className="text-gray-400">Email</span>
                <span className="font-medium">{user.email}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-400">Role</span>
                <span className="px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-sm">
                  {user.role}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
