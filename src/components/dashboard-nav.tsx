'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, ShoppingCart, Settings, DollarSign, Award, BookOpen } from 'lucide-react';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar';
import { KravMagaIcon } from './ui/krav-maga-icon';

const links = [
  { href: '/dashboard', label: 'Painel', icon: Home },
  { href: '/dashboard/students', label: 'Alunos', icon: Users },
  { href: '/dashboard/financials', label: 'Financeiro', icon: DollarSign },
  { href: '/dashboard/sales', label: 'Vendas', icon: ShoppingCart },
  { href: '/dashboard/belt-exams', label: 'Exames de Faixa', icon: Award },
  { href: '/dashboard/seminars', label: 'Seminários', icon: BookOpen },
];

export function DashboardNav() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
      <div className="flex h-full flex-col">
        <SidebarHeader className="p-4">
            <Link href="/dashboard" className="flex items-center gap-3">
                <KravMagaIcon className="h-8 w-8 text-sidebar-primary" />
                {state === 'expanded' && <span className="text-xl font-semibold text-sidebar-foreground">Krav Magá Ipiranga</span>}
            </Link>
        </SidebarHeader>

        <SidebarContent className="flex-1">
            <SidebarMenu>
            {links.map((link) => (
                <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                    asChild
                    isActive={pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href))}
                    tooltip={{ children: link.label }}
                >
                    <Link href={link.href}>
                        <link.icon className="h-5 w-5" />
                        <span>{link.label}</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton 
                        asChild 
                        isActive={pathname.startsWith('/dashboard/settings')}
                        tooltip={{ children: 'Configurações' }}
                    >
                        <Link href="/dashboard/settings">
                            <Settings className="h-5 w-5" />
                            <span>Configurações</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </div>
  );
}
