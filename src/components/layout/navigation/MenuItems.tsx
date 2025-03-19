
import {
  Home,
  Leaf,
  Lightbulb,
  Users,
  Trophy,
  Book,
  Camera,
  LayoutGrid,
  Settings,
} from 'lucide-react';

export const menuItems = [
  { icon: <Home className="h-5 w-5" />, label: 'Dashboard', path: '/dashboard' },
  { icon: <Leaf className="h-5 w-5" />, label: 'Plants', path: '/plants' },
  { icon: <Lightbulb className="h-5 w-5" />, label: 'Techniques', path: '/techniques' },
  { icon: <Users className="h-5 w-5" />, label: 'Community', path: '/community' },
  { icon: <Trophy className="h-5 w-5" />, label: 'Challenges', path: '/challenges' },
  { icon: <Book className="h-5 w-5" />, label: 'Journal', path: '/journal' },
  { icon: <Camera className="h-5 w-5" />, label: 'Identify', path: '/identify' },
  { icon: <LayoutGrid className="h-5 w-5" />, label: 'Garden Planner', path: '/garden-planner' },
];

export const adminMenuItem = {
  icon: <Settings className="h-5 w-5" />,
  label: 'Admin',
  path: '/admin'
};
