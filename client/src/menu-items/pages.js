// assets
import { IconKey } from '@tabler/icons';
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

// constant
const icons = {
  IconKey,
  AutoAwesomeMosaicOutlinedIcon,
  AssignmentOutlinedIcon,
  GroupOutlinedIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Pages',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Authentication',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'login3',
          title: 'Login',
          type: 'item',
          url: '/pages/login/login3',
          target: true
        },
        {
          id: 'register3',
          title: 'Register',
          type: 'item',
          url: '/pages/register/register3',
          target: true
        }
      ]
    },
    {
      id: 'leads',
      title: 'Leads',
      type: 'collapse',
      icon: icons.AutoAwesomeMosaicOutlinedIcon,
      children: [
        {
          id: 'material-icons',
          title: 'View Leads',
          type: 'item',
          external: true,
          url: '/app/leads',
          breadcrumbs: false
        },
        {
          id: 'addLead',
          title: 'Add Lead',
          type: 'item',
          url: '/app/leads/add',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'courses',
      title: 'Courses',
      type: 'collapse',
      icon: icons.AssignmentOutlinedIcon,
      children: [
        {
          id: 'material-icons',
          title: 'View Course',
          type: 'item',
          external: true,
          url: '/app/courses',
          breadcrumbs: false
        },
        {
          id: 'addLead',
          title: 'Add Course',
          type: 'item',
          url: '/app/courses/add',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'users',
      title: 'Users',
      type: 'collapse',
      icon: icons.GroupOutlinedIcon,
      children: [
        {
          id: 'material-icons',
          title: 'View User',
          type: 'item',
          external: true,
          url: '/app/users',
          breadcrumbs: false
        },
        {
          id: 'addLead',
          title: 'Add User',
          type: 'item',
          url: '/app/users/add',
          breadcrumbs: false
        }
      ]
    }

  ]
};

export default pages;
