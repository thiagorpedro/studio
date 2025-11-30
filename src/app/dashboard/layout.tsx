import type { ReactNode } from 'react';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { DashboardNav } from '@/components/dashboard-nav';
import { Header } from '@/components/header';
import { cookies } from 'next/headers';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const layout = cookies().get("sidebar_state");
  const defaultOpen = layout ? layout.value === "true" : true;

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <Sidebar>
        <DashboardNav />
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="p-4 sm:p-6 lg:p-8 bg-secondary/50 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
