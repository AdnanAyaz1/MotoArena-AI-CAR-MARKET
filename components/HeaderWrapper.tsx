import { getUser } from "@/actions/getUser";

import Header from "./Header";

const HeaderWrapper = async ({ isAdminPage = false }: { isAdminPage?: boolean }) => {
  const user = await getUser();
  return <Header user={user} isAdminPage={isAdminPage} />;
};

export default HeaderWrapper;
