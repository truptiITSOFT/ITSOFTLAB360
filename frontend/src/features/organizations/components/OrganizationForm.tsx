"use client";

import { useState } from "react";
import { useCreateOrganization } from "../hooks/useOrganizations";
import { useAuth } from "@/features/authentication/hooks/useAuth";
import { Building2, Mail, Phone, MapPin, FileText, Loader2, CheckCircle } from "lucide-react";

interface FormProps {
  onSuccess?: () => void;
}

export function OrganizationForm({ onSuccess }: FormProps) {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gstin, setGstin] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Indore");
  const [state, setState] = useState("Madhya Pradesh");
  const [pincode, setPincode] = useState("452001");
  const [country, setCountry] = useState("India");
  const [successMsg, setSuccessMsg] = useState("");

  const createMutation = useCreateOrganization();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");

    const franchiseId = user?.franchise_id || 1;

    try {
      await createMutation.mutateAsync({
        name,
        email,
        phone,
        gstin,
        address,
        city,
        state,
        pincode,
        country,
        franchise: franchiseId,
      });

      setSuccessMsg(`Organization "${name}" created successfully.`);
      setName("");
      setEmail("");
      setPhone("");
      setGstin("");
      setAddress("");

      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-lg font-bold text-slate-800">Create Client Organization Record</h3>
        <p className="text-xs text-slate-500">Register a new client company / organization under your franchise</p>
      </div>

      {successMsg && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center space-x-2 text-sm font-medium">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {createMutation.isError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {createMutation.error?.message || "Failed to create organization record."}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Organization Name *</label>
          <div className="relative">
            <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. ABC Manufacturing Pvt Ltd"
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@abc.com"
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="9876543210"
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">GSTIN Number</label>
          <div className="relative">
            <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
              placeholder="23ABCDE1234F1Z5"
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">Registered Address</label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Full Address / Industrial Area"
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end pt-3 border-t border-slate-100">
        <button
          type="submit"
          disabled={createMutation.isPending}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center space-x-2 disabled:opacity-50"
        >
          {createMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Organization...</span>
            </>
          ) : (
            <span>Create Organization</span>
          )}
        </button>
      </div>
    </form>
  );
}

