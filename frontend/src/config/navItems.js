import {
  Home,
  User,
  FolderKanban,
  FileText,
  BookOpen,
  Headphones,
  LayoutDashboard,
} from "lucide-react";

const baseNavItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/about", label: "About", icon: User },
  { to: "/projects", label: "Projects", icon: FolderKanban },


  { to: "/blog", label: "Blog", icon: FileText, guestProtected: true },
  { to: "/journey", label: "My Journey", icon: BookOpen },
  { to: "/assistant", label: "Hire Me ", icon: Headphones },
  {
    to: "/admin",
    label: "Admin Dashboard",
    icon: LayoutDashboard,
    role: "admin",
  },
];

export default baseNavItems;
