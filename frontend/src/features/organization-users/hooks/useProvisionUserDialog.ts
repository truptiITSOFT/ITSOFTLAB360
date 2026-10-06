"use client";

import { useState, useCallback } from "react";
import { OrganizationUser } from "../types";

export function useProvisionUserDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<OrganizationUser | null>(null);
  const [preselectedProduct, setPreselectedProduct] = useState<string | null>(null);

  const openDialog = useCallback(
    (user?: OrganizationUser | null, productName?: string | null) => {
      setSelectedUser(user || null);
      setPreselectedProduct(productName || null);
      setIsOpen(true);
    },
    []
  );

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    setSelectedUser(null);
    setPreselectedProduct(null);
  }, []);

  return {
    isOpen,
    selectedUser,
    preselectedProduct,
    openDialog,
    closeDialog,
  };
}
