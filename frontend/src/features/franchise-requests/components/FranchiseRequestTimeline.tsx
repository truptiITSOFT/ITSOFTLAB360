"use client";

import { FranchiseRequestStatus } from "../types";
import { Check, Clock, FileText, CreditCard, Building2 } from "lucide-react";

interface TimelineProps {
  status: FranchiseRequestStatus;
}

export function FranchiseRequestTimeline({ status }: TimelineProps) {
  const isRejected = status === "rejected";

  const stages = [
    { key: "pending", label: "Request Submitted", icon: Clock, description: "Pending Accountant Review" },
    { key: "approved", label: "Invoice Created", icon: FileText, description: "Approved & Invoice Generated" },
    { key: "paid", label: "Payment Verified", icon: CreditCard, description: "Invoice Paid & Ready for IT" },
    { key: "completed", label: "Franchise Created", icon: Building2, description: "Credentials & Access Issued" },
  ];

  const getStageIndex = (s: FranchiseRequestStatus) => {
    switch (s) {
      case "pending":
        return 0;
      case "approved":
        return 1;
      case "paid":
        return 2;
      case "completed":
        return 3;
      case "rejected":
        return -1;
      default:
        return 0;
    }
  };

  const currentIndex = getStageIndex(status);

  if (isRejected) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
          ✕
        </div>
        <div>
          <h4 className="font-semibold text-sm">Request Rejected</h4>
          <p className="text-xs text-red-600">This franchise request was rejected by Accountant review.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-5 left-8 right-8 h-1 bg-slate-200 -z-0" />
        <div
          className="absolute top-5 left-8 h-1 bg-blue-600 transition-all duration-500 -z-0"
          style={{ width: `${(currentIndex / (stages.length - 1)) * 80}%` }}
        />

        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={stage.key} className="flex flex-col items-center relative z-10 text-center px-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isDone
                    ? "bg-green-600 text-white shadow-md shadow-green-600/20"
                    : isCurrent
                    ? "bg-blue-600 text-white ring-4 ring-blue-100 shadow-md shadow-blue-600/20"
                    : "bg-slate-100 border border-slate-300 text-slate-400"
                }`}
              >
                {isDone ? <Check className="w-5 h-5 stroke-[3]" /> : <Icon className="w-5 h-5" />}
              </div>
              <span
                className={`mt-2 text-xs font-bold ${
                  isCurrent ? "text-blue-600" : isDone ? "text-green-700" : "text-slate-500"
                }`}
              >
                {stage.label}
              </span>
              <span className="text-[10px] text-slate-400 max-w-[100px] mt-0.5 hidden sm:block">
                {stage.description}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
