"use client";

import { useState, useEffect } from "react";
import { provisionUserSchema, ProvisionUserRequest, OrganizationUser } from "../types";
import { useProvisionUser } from "./useProvisionUser";

interface UseProvisionUserFormProps {
  selectedUser?: OrganizationUser | null;
  preselectedProduct?: string | null;
  onSuccess?: () => void;
}

export function useProvisionUserForm({
  selectedUser,
  preselectedProduct,
  onSuccess,
}: UseProvisionUserFormProps) {
  const [formData, setFormData] = useState<ProvisionUserRequest>({
    username: selectedUser?.user_username || "",
    email: selectedUser?.user_email || "",
    first_name: selectedUser?.user_first_name || "",
    last_name: selectedUser?.user_last_name || "",
    password: "",
    product_name: preselectedProduct || "",
    role: selectedUser?.role || "ORG_EMPLOYEE",
    designation: selectedUser?.designation || "",
    department: selectedUser?.department || "",
    permissions: {},
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const provisionMutation = useProvisionUser();

  useEffect(() => {
    if (selectedUser) {
      setFormData((prev) => ({
        ...prev,
        username: selectedUser.user_username,
        email: selectedUser.user_email,
        first_name: selectedUser.user_first_name,
        last_name: selectedUser.user_last_name,
        role: selectedUser.role,
        designation: selectedUser.designation || "",
        department: selectedUser.department || "",
      }));
    }
    if (preselectedProduct) {
      setFormData((prev) => ({
        ...prev,
        product_name: preselectedProduct,
      }));
    }
  }, [selectedUser, preselectedProduct]);

  const handleChange = (field: keyof ProvisionUserRequest, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    setApiError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError(null);

    // Validate using Zod schema
    const result = provisionUserSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        if (fieldName && !fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await provisionMutation.mutateAsync(result.data);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      const errorMsg =
        err?.data?.remote_api_error ||
        err?.data?.non_field_errors?.[0] ||
        err?.data?.product?.[0] ||
        err?.data?.subscription?.[0] ||
        err?.message ||
        "Failed to provision user for product";
      setApiError(errorMsg);
    }
  };

  const selectExistingUser = (user: OrganizationUser | null) => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        username: user.user_username,
        email: user.user_email,
        first_name: user.user_first_name || "",
        last_name: user.user_last_name || "",
        password: "",
        role: user.role || "ORG_EMPLOYEE",
        designation: user.designation || "",
        department: user.department || "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        role: "ORG_EMPLOYEE",
        designation: "",
        department: "",
      }));
    }
    setErrors({});
    setApiError(null);
  };

  return {
    formData,
    errors,
    apiError,
    isSubmitting: provisionMutation.isPending,
    isExistingUser: Boolean(selectedUser),
    handleChange,
    handleSubmit,
    selectExistingUser,
  };
}

