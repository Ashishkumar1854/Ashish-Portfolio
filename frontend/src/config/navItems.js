// frontend/src/config/navItems.js
import {
  Home,
  User,
  FolderKanban,
  Briefcase,
  MessageSquare,
  FileText,
  BookOpen,
  Headphones,
  LayoutDashboard,
} from "lucide-react";

const baseNavItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/about", label: "About", icon: User },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  {
    to: "/fresher-opportunities",
    label: "Fresher Jobs",
    icon: Briefcase,
    guestProtected: true,
  },
  {
    to: "/feedback",
    label: "Feedback",
    icon: MessageSquare,
    guestProtected: true,
  },
  { to: "/blog", label: "Blog", icon: FileText, guestProtected: true },
  { to: "/journey", label: "My Journey", icon: BookOpen },
  { to: "/assistant", label: "Hire Me / Assistant", icon: Headphones },
  {
    to: "/admin",
    label: "Admin Dashboard",
    icon: LayoutDashboard,
    role: "admin",
  },
];

export default baseNavItems;
