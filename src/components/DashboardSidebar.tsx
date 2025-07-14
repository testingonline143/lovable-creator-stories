import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  User,
  DollarSign,
  BookOpen,
  FileText,
  BarChart3,
  Settings,
  Eye,
  LogOut,
  PlusCircle,
  TrendingUp,
  Star,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DashboardSidebarProps {
  onSignOut: () => void;
  creator: {
    name: string;
    is_public: boolean;
    slug: string;
  } | null;
}

export function DashboardSidebar({ onSignOut, creator }: DashboardSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isCollapsed = state === 'collapsed';
  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
      isActive 
        ? 'bg-primary text-primary-foreground' 
        : 'hover:bg-muted'
    }`;

  const mainMenuItems = [
    { title: 'Overview', url: '/dashboard', icon: Home },
    { title: 'Profile', url: '/dashboard/profile', icon: User },
    { title: 'Revenue', url: '/dashboard/revenue', icon: DollarSign },
    { title: 'Courses', url: '/dashboard/courses', icon: BookOpen },
    { title: 'Success Stories', url: '/dashboard/stories', icon: FileText },
    { title: 'Analytics', url: '/dashboard/analytics', icon: BarChart3 },
  ];

  const quickActions = [
    { title: 'Add Course', url: '/dashboard/courses/new', icon: PlusCircle },
    { title: 'Add Story', url: '/dashboard/stories/new', icon: Star },
    { title: 'Update Revenue', url: '/dashboard/revenue/update', icon: TrendingUp },
  ];

  return (
    <Sidebar className={isCollapsed ? 'w-16' : 'w-64'} collapsible="icon">
      <SidebarContent className="bg-card border-border">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CS</span>
            </div>
            {!isCollapsed && (
              <div className="flex-1">
                <h2 className="text-lg font-bold text-foreground">CreatorStory</h2>
                <p className="text-xs text-muted-foreground">Creator Dashboard</p>
              </div>
            )}
          </div>
        </div>

        {/* Creator Info */}
        {!isCollapsed && creator && (
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">{creator.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={creator.is_public ? 'default' : 'secondary'} className="text-xs">
                    {creator.is_public ? 'Live' : 'Draft'}
                  </Badge>
                  {creator.is_public && (
                    <NavLink to={`/creator/${creator.slug}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        {!isCollapsed && (
          <SidebarGroup>
            <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {quickActions.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Settings & Logout */}
        <div className="mt-auto p-4 border-t border-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/dashboard/settings" className={getNavCls}>
                  <Settings className="h-4 w-4" />
                  {!isCollapsed && <span>Settings</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button onClick={onSignOut} className={getNavCls({ isActive: false })}>
                  <LogOut className="h-4 w-4" />
                  {!isCollapsed && <span>Sign Out</span>}
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}