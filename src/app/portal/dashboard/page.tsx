import { redirect } from "next/navigation";

export default async function PortalDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>;
}) {
  const query = await searchParams;
  redirect(query.preview === "qa" ? "/portal?preview=qa" : "/portal");
}
