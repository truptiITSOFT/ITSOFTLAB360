"use client";

import React, { useState } from "react";
import { Modal } from "@/components/common/Modal";
import { KeyRound, ExternalLink, Copy, Check, ShieldCheck, Clock } from "lucide-react";
import { SsoLaunchResponse } from "../../types";

interface SsoLaunchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  ssoData: SsoLaunchResponse | null;
  username?: string;
}

export function SsoLaunchDialog({
  isOpen,
  onClose,
  ssoData,
  username,
}: SsoLaunchDialogProps) {
  const [copied, setCopied] = useState(false);

  if (!ssoData) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(ssoData.sso_token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-lg"
      title={
        <>
          <KeyRound className="w-5 h-5 text-emerald-500" />
          <span>Single Sign-On (SSO) Launch</span>
        </>
      }
      subtitle={`Authenticated launch session for ${username || "user"} into ${ssoData.product_name}.`}
    >
      <div className="space-y-5">
        {/* Verification Status Banner */}
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-start space-x-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-200">
              Central SSO Token Generated
            </h4>
            <p className="text-emerald-700 dark:text-emerald-300/90 mt-0.5">
              The user has been authenticated by ITSOFTLAB360 and mapped to remote account{" "}
              <span className="font-mono font-bold">{ssoData.external_user_id}</span>. No password
              entry required.
            </p>
          </div>
        </div>

        {/* Metadata Details */}
        <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80">
          <div>
            <span className="text-slate-400 font-medium">Target Portal:</span>
            <p className="font-bold text-slate-800 dark:text-slate-100">{ssoData.product_name}</p>
          </div>
          <div>
            <span className="text-slate-400 font-medium">Remote User ID:</span>
            <p className="font-mono font-bold text-slate-800 dark:text-slate-100 truncate">
              {ssoData.external_user_id}
            </p>
          </div>
          <div className="col-span-2 flex items-center space-x-1.5 text-slate-500 dark:text-slate-400 pt-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Token expires in 5 minutes (single-use cryptographic signature)</span>
          </div>
        </div>

        {/* SSO Token Box */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Cryptographic SSO Token
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              readOnly
              value={ssoData.sso_token}
              className="w-full px-3 py-2 text-xs font-mono bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 select-all"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300 shrink-0"
              title="Copy token"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              alert(
                `Launching ${ssoData.product_name} SSO session with token: ${ssoData.sso_token.slice(0, 16)}...`
              );
              onClose();
            }}
            className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center space-x-2 transition-all"
          >
            <span>Launch {ssoData.product_name}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </Modal>
  );
}
