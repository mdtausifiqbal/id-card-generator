import carrierLogo from "@/assets/carrier.jpg";
import daikinLogo from "@/assets/daikin.jpg";
import voltasLogo from "@/assets/voltas.jpg";
import { CompanyType, IDCardState } from "@/types";
import React from "react";
import Paper from "./Paper";

interface IDCardPreviewProps {
  state: IDCardState;
  frontRef: React.RefObject<HTMLDivElement>;
  backRef: React.RefObject<HTMLDivElement>;
}

const logoMap = {
  [CompanyType.VOLTAS]: voltasLogo,
  [CompanyType.DAIKIN]: daikinLogo,
  [CompanyType.CARRIER]: carrierLogo,
};

const IDCardPreview: React.FC<IDCardPreviewProps> = ({
  state,
  frontRef,
  backRef,
}) => {
  const { company, employee, serviceCenter } = state;

  const renderLogo = () => {
    const logo = (
      <div className="flex flex-col items-center gap-2">
        <img src={logoMap[company]} alt={company} className="w-40 h-auto" />
        <span className="text-sm font-medium text-black uppercase">
          Authorized Representative
        </span>
      </div>
    );
    return logo;
  };

  const formattedDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8">
      {/* Front Side */}
      <Paper ref={frontRef}>
        {renderLogo()}

        <div className="flex-grow flex flex-col items-center">
          <div className="w-36 h-40 my-4 border-2 border-slate-800 overflow-hidden">
            {employee.photo ? (
              <img
                src={employee.photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                No Photo
              </div>
            )}
          </div>

          <div className="w-full space-y-1/2">
            <div className="flex text-sm">
              <span className="w-24 font-medium text-slate-700">Name</span>
              <span className="mx-1">:</span>
              <span className="font-bold text-blue-800 flex-1">
                {employee.name}
              </span>
            </div>
            <div className="flex text-sm">
              <span className="w-24 font-medium text-slate-700">
                Designation
              </span>
              <span className="mx-1">:</span>
              <span className="flex-1">{employee.designation}</span>
            </div>
            <div className="flex text-sm">
              <span className="w-24 font-medium text-slate-700">Emp. Id</span>
              <span className="mx-1">:</span>
              <span className="flex-1">{employee.empId}</span>
            </div>
            <div className="flex text-sm">
              <span className="w-24 font-medium text-slate-700">
                Valid Upto
              </span>
              <span className="mx-1">:</span>
              <span className="flex-1">
                {formattedDate(employee.validUpto)}
              </span>
            </div>
          </div>

          {company !== CompanyType.CARRIER && (
            <div className="my-2 w-full text-xs leading-tight text-slate-900">
              <p>Employee of our Authorized Service Centre</p>
              <p className="mt-1">Name: {serviceCenter.name}</p>
              <p>Tel: {serviceCenter.mobile}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center">
          <div className="h-12 w-36 relative">
            {serviceCenter.signatoryImage ? (
              <img
                src={serviceCenter.signatoryImage}
                alt="Signature"
                className="h-full w-full object-contain mix-blend-multiply"
              />
            ) : (
              <div className="w-full h-full border-b border-dashed border-slate-300"></div>
            )}
          </div>
          <p className="text-[12px] font-bold text-slate-800 mt-2">
            {company === CompanyType.CARRIER
              ? "Issuing Authority"
              : "Authorized Signatory"}
          </p>
        </div>
      </Paper>

      {/* Back Side (Mostly for Carrier instructions) */}
      {company === CompanyType.CARRIER && (
        <Paper ref={backRef}>
          <div className="text-center">
            <span className="text-lg font-bold border-slate-800 inline-block">
              Instruction
            </span>
          </div>

          <div className="h-[2px] bg-slate-800 w-full mb-4"></div>

          <div className="space-y-6 text-xs leading-relaxed text-slate-900 font-medium">
            <p>The holder of this card is authorized to</p>

            <p>
              1) Inspect the appliance & carry out necessary servicing & repairs
              against valid service request
            </p>

            <p>
              2) Collect payment on our behalf for service rendered on a
              chargeable basis
            </p>

            <div className="space-y-1">
              <p className="text-slate-700 font-semibold">
                For any queries please contact:
              </p>
              <p className="text-red-600 font-bold text-sm uppercase">
                {serviceCenter.name}
              </p>
              <div className="flex gap-1 text-red-600">
                <span className="font-medium">Address:</span>
                <span className="flex-1">{serviceCenter.address}</span>
              </div>
              <div className="flex gap-1 text-red-600">
                <span className="font-medium">Contact:</span>
                <span className="flex-1">{serviceCenter.mobile}</span>
              </div>
            </div>
          </div>
        </Paper>
      )}
    </div>
  );
};

export default IDCardPreview;
