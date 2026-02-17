"use client";

import { notFound, useParams } from "next/navigation";
import ReelsPage from "../reels/page";
import IdentityPage from "../aura/page";
import EntertainmentPage from "../cinema/page";

export default function ServiceDynamicPage() {
  const params = useParams();
  const slug = params?.slug as string;

  // Logic to determine which component to render based on slug
  if (['nova-life', 'nova-action', 'nova-magic'].includes(slug)) {
    return <ReelsPage />;
  }

  if (slug === 'nova-aura') {
    return <IdentityPage />;
  }

  if (['nova-cinema', 'nova-saga'].includes(slug)) {
    return <EntertainmentPage />;
  }

  return notFound();
}
