import {
  CompanyType,
  EmployeeDetails,
  IDCardState,
  ServiceCenterDetails,
} from "@/types";
import {
  Briefcase,
  Calendar,
  CreditCard,
  Home,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import React, { useRef } from "react";
import SignatureCanvas from "./SignatureCanvas";

interface EditorFormProps {
  state: IDCardState;
  setState: React.Dispatch<React.SetStateAction<IDCardState>>;
}

const EditorForm: React.FC<EditorFormProps> = ({ state, setState }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateEmployee = (fields: Partial<EmployeeDetails>) => {
    setState((prev) => ({
      ...prev,
      employee: { ...prev.employee, ...fields },
    }));
  };

  const updateSC = (fields: Partial<ServiceCenterDetails>) => {
    setState((prev) => ({
      ...prev,
      serviceCenter: { ...prev.serviceCenter, ...fields },
    }));
  };

  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "employeePhoto" | "signatoryImage"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "employeePhoto") {
          updateEmployee({ photo: reader.result as string });
        } else {
          updateSC({ signatoryImage: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const companies = [
    { type: CompanyType.VOLTAS, color: "bg-blue-700" },
    { type: CompanyType.CARRIER, color: "bg-blue-900" },
    { type: CompanyType.DAIKIN, color: "bg-cyan-500" },
  ];

  return (
    <div className="space-y-10">
      {/* Company Selection */}
      <div className="grid grid-cols-3 gap-3">
        {companies.map((c) => (
          <button
            key={c.type}
            onClick={() => setState((prev) => ({ ...prev, company: c.type }))}
            className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
              state.company === c.type
                ? `${c.color} border-transparent text-white shadow-lg scale-105`
                : "border-slate-100 bg-white text-slate-600 hover:border-blue-200"
            }`}
          >
            <span className="font-bold text-xs md:text-sm">{c.type}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Employee Details */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
            <User size={18} className="text-blue-500" />
            Employee Details
          </h3>

          <div className="space-y-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-500 uppercase ml-1">
                Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handlePhotoChange(e, "employeePhoto")}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
              />
            </div>

            <div className="relative">
              <User
                className="absolute left-3 top-9 text-slate-400"
                size={16}
              />
              <label className="text-xs font-semibold text-slate-500 uppercase ml-1">
                Full Name
              </label>
              <input
                type="text"
                value={state.employee.name}
                onChange={(e) => updateEmployee({ name: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                placeholder="Enter Name"
              />
            </div>

            <div className="relative">
              <Briefcase
                className="absolute left-3 top-9 text-slate-400"
                size={16}
              />
              <label className="text-xs font-semibold text-slate-500 uppercase ml-1">
                Designation
              </label>
              <input
                type="text"
                value={state.employee.designation}
                onChange={(e) =>
                  updateEmployee({ designation: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                placeholder="Designation"
              />
            </div>

            <div className="relative">
              <CreditCard
                className="absolute left-3 top-9 text-slate-400"
                size={16}
              />
              <label className="text-xs font-semibold text-slate-500 uppercase ml-1">
                Emp ID / Number
              </label>
              <input
                type="text"
                value={state.employee.empId}
                onChange={(e) => updateEmployee({ empId: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                placeholder="Employee ID"
              />
            </div>

            <div className="relative">
              <Calendar
                className="absolute left-3 top-9 text-slate-400"
                size={16}
              />
              <label className="text-xs font-semibold text-slate-500 uppercase ml-1">
                Valid Upto
              </label>
              <input
                type="date"
                value={state.employee.validUpto}
                onChange={(e) => updateEmployee({ validUpto: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Service Center Details */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
            <Home size={18} className="text-emerald-500" />
            Service Center Settings
          </h3>

          <div className="space-y-3">
            <div className="relative">
              <Home
                className="absolute left-3 top-9 text-slate-400"
                size={16}
              />
              <label className="text-xs font-semibold text-slate-500 uppercase ml-1">
                SC Name
              </label>
              <input
                type="text"
                value={state.serviceCenter.name}
                onChange={(e) => updateSC({ name: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition"
                placeholder="Service Center Name"
              />
            </div>

            <div className="relative">
              <Phone
                className="absolute left-3 top-9 text-slate-400"
                size={16}
              />
              <label className="text-xs font-semibold text-slate-500 uppercase ml-1">
                Mobile / Tel
              </label>
              <input
                type="text"
                value={state.serviceCenter.mobile}
                onChange={(e) => updateSC({ mobile: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition"
                placeholder="Phone Numbers"
              />
            </div>

            <div className="relative">
              <MapPin
                className="absolute left-3 top-9 text-slate-400"
                size={16}
              />
              <label className="text-xs font-semibold text-slate-500 uppercase ml-1">
                Address
              </label>
              <textarea
                value={state.serviceCenter.address}
                onChange={(e) => updateSC({ address: e.target.value })}
                rows={3}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition resize-none"
                placeholder="Complete Address"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-500 uppercase ml-1">
                Authorized Signatory
              </label>

              <div className="flex flex-col gap-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoChange(e, "signatoryImage")}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 italic">
                  (Upload signature image or draw using canvas below)
                </span>
              </div>
              <SignatureCanvas
                onSave={(img) => updateSC({ signatoryImage: img })}
                currentImage={state.serviceCenter.signatoryImage}
              />
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-500 text-center">
        DISCLAIMER: We don't collect any personal data. All data remains on your
        device.
      </p>
    </div>
  );
};

export default EditorForm;
