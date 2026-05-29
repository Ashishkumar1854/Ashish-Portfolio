import {
  Home,
  User,
  FolderKanban,
  FileText,
  BookOpen,
  Headphones,
  LayoutDashboard,
  Code2
} from "lucide-react";

const baseNavItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/about", label: "About", icon: User },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/skills", label: "Skills", icon: Code2 },
  { to: "/journey", label: "My Journey", icon: BookOpen },
  { to: "/blog", label: "Blog", icon: FileText, guestProtected: true },
  {
    to: "/admin",
    label: "Admin Dashboard",
    icon: LayoutDashboard,
    role: "admin",
  },
];

export default baseNavItems;
