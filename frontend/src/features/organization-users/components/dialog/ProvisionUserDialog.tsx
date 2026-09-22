"use client";

import React from "react";
import { Modal } from "@/components/common/Modal";
import { UserPlus, Link2 } from "lucide-react";
import { OrganizationUser, SubscribedProduct } from "../../types";
import { ProvisionUserForm } from "../form/ProvisionUserForm";

interface ProvisionUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUser?: OrganizationUser | null;
  preselectedProduct?: string | null;
  subscribedProducts?: SubscribedProduct[];
  organizationUsers?: OrganizationUser[];
}

export function ProvisionUserDialog({
  isOpen,
  onClose,
  selectedUser,
  preselectedProduct,
  subscribedProducts = [],
  organizationUsers = [],
}: ProvisionUserDialogProps) {
  const isExistingUser = Boolean(selectedUser);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-2xl"
      title={
        isExistingUser ? (
          <>
            <Link2 className="w-5 h-5 text-indigo-500" />
            <span>Link User to Subscribed Software</span>
          </>
        ) : (
          <>
            <UserPlus className="w-5 h-5 text-blue-500" />
            <span>Provision User & Allocate License</span>
          </>
        )
      }
      subtitle={
        isExistingUser
          ? `Allocate a software license seat for ${selectedUser?.user_username} without duplicate user records.`
          : "Creates a central account, triggers the remote software API, and consumes 1 license seat."
      }
    >
      <ProvisionUserForm
        subscribedProducts={subscribedProducts}
        organizationUsers={organizationUsers}
        selectedUser={selectedUser}
        preselectedProduct={preselectedProduct}
        onCancel={onClose}
        onSuccess={onClose}
      />
    </Modal>
  );
}
