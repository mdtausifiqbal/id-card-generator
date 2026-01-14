import Paper from "@/components/Paper";
import { formattedDate } from "@/lib/utils";
import type { TemplateProps } from "@/types";

export default function OnePageTemplate({
  company,
  employee,
  sc,
  refs,
}: TemplateProps) {
  return (
    <Paper ref={refs[0]}>
      <div className="flex flex-col items-center gap-2">
        <img
          src={`/${company.logo}`}
          alt={company.name}
          className="w-40 h-10 max-h-10 object-contain"
          loading="lazy"
        />
        <span className="text-sm font-medium text-black uppercase">
          Authorized Representative
        </span>
      </div>

      <div className="flex-grow flex flex-col items-center">
        <div className="w-36 h-40 my-4 border-2 border-slate-800 overflow-hidden">
          {employee.photo ? (
            <img
              src={employee.photo}
              alt="Profile"
              className="w-full h-full object-cover"
              loading="lazy"
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
            <span className="w-24 font-medium text-slate-700">Designation</span>
            <span className="mx-1">:</span>
            <span className="flex-1">{employee.designation}</span>
          </div>
          <div className="flex text-sm">
            <span className="w-24 font-medium text-slate-700">Emp. Id</span>
            <span className="mx-1">:</span>
            <span className="flex-1">{employee.empId}</span>
          </div>
          <div className="flex text-sm">
            <span className="w-24 font-medium text-slate-700">Valid Upto</span>
            <span className="mx-1">:</span>
            <span className="flex-1">{formattedDate(employee.validUpto)}</span>
          </div>
        </div>

        <div className="my-2 w-full text-xs leading-tight text-slate-900">
          <p>Employee of our Authorized Service Centre</p>
          <p className="mt-1">Name: {sc.name}</p>
          <p>Tel: {sc.mobile}</p>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="h-12 w-36 relative">
          {sc.signatoryImage ? (
            <img
              src={sc.signatoryImage}
              alt="Signature"
              className="h-full w-full object-contain mix-blend-multiply"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full border-b border-dashed border-slate-300"></div>
          )}
        </div>
        <p className="text-[12px] font-bold text-slate-800 mt-2">
          Authorized Signatory
        </p>
      </div>
    </Paper>
  );
}
