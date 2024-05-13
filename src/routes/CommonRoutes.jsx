
// project import
import MinimalLayout from "../layout/minimal/MinimalLayout";
import PrivacyPolicy from '../pages/legal/PrivacyPolicy';
import TermsOfService from '../pages/legal/TermsOfService';
import AboutUs from '../pages/info/AboutUs';
import ForwardLink from "../pages/links/ForwardLink";
import BioLink from "../pages/biolink/BioLink";
import HomePage from "../pages/home/HomePage";
import DiscoverPage from "../pages/discover/DiscoverPage";

const CommonRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
      {
        path: '',
        element: <HomePage />
      },
      {
        path: 'discover',
        element: <DiscoverPage />
      },
      {
        path: 'legal/privacy',
        element: <PrivacyPolicy />
      },
      {
        path: 'legal/terms',
        element: <TermsOfService />
      },
      {
        path: 'info/about',
        element: <AboutUs />
      },
      {
        path: ':linkId',
        element: <ForwardLink />
      },
      {
        path: 'm/:bioId',
        element: <BioLink />
      }
    ]
  };
  
  export default CommonRoutes;