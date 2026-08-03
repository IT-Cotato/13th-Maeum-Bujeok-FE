"use client";

import AccountActionDialog from "@/features/user/components/AccountActionDialog";
import MyMenuSection from "@/features/user/components/MyMenuSection";
import { ACCOUNT_MENU_ITEMS, type MyMenuItem } from "@/features/user/constants";
import { useAccountActions } from "@/features/user/hooks/useAccountActions";

export default function AccountMenuSection() {
  const {
    activeDialog,
    closeDialog,
    confirmLogout,
    confirmWithdrawal,
    isSubmitting,
    openDialog,
  } = useAccountActions();

  const handleItemClick = (item: MyMenuItem): void => {
    if (item.action) {
      openDialog(item.action);
    }
  };

  return (
    <>
      <MyMenuSection
        items={ACCOUNT_MENU_ITEMS}
        onItemClick={handleItemClick}
        title="계정"
      />

      {activeDialog ? (
        <AccountActionDialog
          isSubmitting={isSubmitting}
          onCancel={closeDialog}
          onConfirm={
            activeDialog === "logout" ? confirmLogout : confirmWithdrawal
          }
          type={activeDialog}
        />
      ) : null}
    </>
  );
}
