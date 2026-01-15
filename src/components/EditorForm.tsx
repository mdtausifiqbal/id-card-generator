import { EmployeeDetails, IDCardState, ServiceCenterDetails } from "@/types";
import { Input, Select, SelectItem, Textarea } from "@heroui/react";
import {
  Briefcase,
  BuildingIcon,
  Calendar,
  CreditCard,
  Home,
  LayoutDashboardIcon,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import React, { useRef } from "react";
import { companies, companyList } from "../lib/companies";
import SignatureCanvas from "./SignatureCanvas";
import { templates } from "./templates";

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
      sc: { ...prev.sc, ...fields },
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

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Select
          isRequired
          defaultSelectedKeys={["single"]}
          label="Template"
          placeholder="Select an template"
          labelPlacement="outside-top"
          startContent={
            <LayoutDashboardIcon className="text-default-400" size={20} />
          }
          variant="bordered"
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              template: templates[e.target.value],
            }))
          }
          value={state.template.id}
        >
          {Object.values(templates).map((template) => (
            <SelectItem key={template.id}>{template.name}</SelectItem>
          ))}
        </Select>
        <Select
          isRequired
          label="Company"
          placeholder="Select Company"
          showScrollIndicators
          startContent={<BuildingIcon className="text-default-400" size={20} />}
          variant="bordered"
          labelPlacement="outside-top"
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              company: companies[e.target.value],
            }))
          }
          value={state.company.name}
          defaultSelectedKeys={[companyList[0].name]}
        >
          {companyList.map((c) => (
            <SelectItem
              key={c.name}
              startContent={
                <img
                  src={`/${c.logo}`}
                  width={36}
                  className="h-auto bg-white"
                  loading="lazy"
                />
              }
            >
              {c.name}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Employee Details */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
            <User size={18} className="text-blue-500" />
            Employee Details
          </h3>

          <div className="flex flex-col gap-4">
            <Input
              type="file"
              accept="image/*"
              label="Photo"
              variant="bordered"
              labelPlacement="outside-top"
              onChange={(e) => handlePhotoChange(e, "employeePhoto")}
              classNames={{
                inputWrapper: "p-0 shadow-none",
                input:
                  "inline-block file:p-2 file:px-4 file:mr-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition",
              }}
            />

            <Input
              isRequired
              label="Name"
              variant="bordered"
              labelPlacement="outside-top"
              placeholder="Enter name"
              value={state.employee.name}
              onChange={(e) => updateEmployee({ name: e.target.value })}
              startContent={<User className="text-default-400" size={16} />}
            />

            <Input
              isRequired
              label="Designation"
              variant="bordered"
              labelPlacement="outside-top"
              placeholder="Enter designation"
              value={state.employee.designation}
              onChange={(e) => updateEmployee({ designation: e.target.value })}
              startContent={
                <Briefcase className="text-default-400" size={16} />
              }
            />

            <Input
              isRequired
              label="Emp ID / Number"
              variant="bordered"
              labelPlacement="outside-top"
              placeholder="Enter employee ID"
              value={state.employee.empId}
              onChange={(e) => updateEmployee({ empId: e.target.value })}
              startContent={
                <CreditCard className="text-default-400" size={16} />
              }
            />

            <Input
              isRequired
              type="date"
              label="Valid Upto"
              variant="bordered"
              labelPlacement="outside-top"
              placeholder="Enter valid date"
              value={state.employee.validUpto}
              onChange={(e) => updateEmployee({ validUpto: e.target.value })}
              startContent={<Calendar className="text-default-400" size={16} />}
            />
          </div>
        </div>

        {/* Service Center Details */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
            <Home size={18} className="text-emerald-500" />
            Service Center Settings
          </h3>

          <div className="flex flex-col gap-4">
            <Input
              isRequired
              label="SC Name"
              variant="bordered"
              labelPlacement="outside-top"
              placeholder="Enter service center name"
              value={state.sc.name}
              onChange={(e) => updateSC({ name: e.target.value })}
              startContent={<Home className="text-default-400" size={16} />}
            />

            <Input
              isRequired
              label=" Mobile / Tel"
              variant="bordered"
              labelPlacement="outside-top"
              placeholder="Enter mobile no"
              value={state.sc.mobile}
              onChange={(e) => updateSC({ mobile: e.target.value })}
              startContent={<Phone className="text-default-400" size={16} />}
            />

            <Textarea
              isRequired
              label="Address"
              variant="bordered"
              labelPlacement="outside-top"
              placeholder="Enter address"
              value={state.sc.address}
              onChange={(e) => updateSC({ address: e.target.value })}
              startContent={<MapPin className="text-default-400" size={16} />}
              classNames={{ innerWrapper: "py-3" }}
              rows={3}
            />

            <div className="flex flex-col gap-2">
              <Input
                type="file"
                accept="image/*"
                label="Authorized Signatory"
                variant="bordered"
                labelPlacement="outside-top"
                onChange={(e) => handlePhotoChange(e, "signatoryImage")}
                classNames={{
                  inputWrapper: "p-0 shadow-none",
                  input:
                    "inline-block file:p-2 file:px-4 file:mr-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition",
                }}
              />
              <div>
                <span className="text-[10px] text-default-500 italic">
                  (Upload signature image or draw using canvas below)
                </span>
              </div>
              <SignatureCanvas
                onSave={(img) => updateSC({ signatoryImage: img })}
                currentImage={state.sc.signatoryImage}
              />
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-default-500 text-center">
        DISCLAIMER: We don't collect any personal data. All data remains on your
        device.
      </p>
    </div>
  );
};

export default EditorForm;
