// assets
import { ApiOutlined, ContactsOutlined, CreditCardOutlined, DashboardOutlined, LineChartOutlined, UserOutlined, LinkOutlined } from '@ant-design/icons';

// icons
const icons = {
  LinkOutlined,
  DashboardOutlined,
  CreditCardOutlined,
  ContactsOutlined,
  LineChartOutlined,
  ApiOutlined,
  UserOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'links',
      title: 'Links',
      type: 'item',
      url: '/links',
      icon: icons.LinkOutlined,
      breadcrumbs: false,
    }
  ]
};

export default dashboard;