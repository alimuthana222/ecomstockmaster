
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Package, 
  Boxes, 
  AlertTriangle, 
  FileBarChart, 
  Settings, 
  Menu
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { cn } from '@/lib/utils';

const navItems = [
  { title: 'Dashboard', path: '/', icon: BarChart3 },
  { title: 'Products', path: '/products', icon: Package },
  { title: 'Inventory', path: '/inventory', icon: Boxes },
  { title: 'Low Stock', path: '/low-stock', icon: AlertTriangle },
  { title: 'Reports', path: '/reports', icon: FileBarChart },
  { title: 'Settings', path: '/settings', icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center h-14 px-4">
        <div className="flex items-center gap-2 text-white">
          <Package className="h-6 w-6" />
          <span className="text-lg font-bold">InventoryManager</span>
        </div>
        <SidebarTrigger className="ml-auto h-8 w-8 text-sidebar-foreground">
          <Menu className="h-4 w-4" />
        </SidebarTrigger>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild
                    className={cn(
                      location.pathname === item.path && "bg-sidebar-accent text-sidebar-accent-foreground"
                    )}
                  >
                    <Link to={item.path}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="text-xs text-sidebar-foreground/60 text-center">
          EcommerceInventoryManager v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
