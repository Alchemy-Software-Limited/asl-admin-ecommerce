import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { CustomersView } from 'src/sections/user/view';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Customers - ${CONFIG.appName}`}</title>
      </Helmet>

      <CustomersView />
    </>
  );
}
