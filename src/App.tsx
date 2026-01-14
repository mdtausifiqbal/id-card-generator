import AppNavbar from "@/components/AppNavbar";
import EditorForm from "@/components/EditorForm";
import { templates } from "@/components/templates";
import { companyList } from "@/lib/companies";
import { EmployeeDetails, IDCardState, ServiceCenterDetails } from "@/types";
import { Spinner } from "@heroui/react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import React, { Suspense, useEffect, useRef, useState } from "react";

const currentFinancialYearEndingDate = () => {
  const now = new Date();
  const year = now.getMonth() >= 3 ? now.getFullYear() + 1 : now.getFullYear();
  return `${year}-03-31`;
};

const DEFAULT_EMPLOYEE: EmployeeDetails = {
  name: "",
  designation: "",
  empId: "",
  validUpto: currentFinancialYearEndingDate(),
  photo: "",
};

const DEFAULT_SC: ServiceCenterDetails = {
  name: "",
  mobile: "",
  address: "",
  signatoryImage: null,
};

const App: React.FC = () => {
  const [state, setState] = useState<IDCardState>({
    company: companyList[0],
    employee: DEFAULT_EMPLOYEE,
    sc: DEFAULT_SC,
    template: templates.single,
  });

  const cardFrontRef = useRef<HTMLDivElement>(null);
  const cardBackRef = useRef<HTMLDivElement>(null);

  // Load saved Service Center details from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("service_center_details");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState((prev) => ({ ...prev, sc: parsed }));
      } catch (e) {
        console.error("Failed to parse saved service center details", e);
      }
    }
  }, []);

  const handleSaveSC = () => {
    localStorage.setItem("service_center_details", JSON.stringify(state.sc));
    alert("Service Center details saved successfully!");
  };

  const downloadPDF = async () => {
    if (!cardFrontRef.current) return;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [54, 85.6], // Standard CR80 size
    });

    const options = {
      scale: 4, // Higher scale for print quality
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    };

    // Capture Front
    const canvasFront = await html2canvas(cardFrontRef.current, options);
    const imgDataFront = canvasFront.toDataURL("image/png");
    pdf.addImage(imgDataFront, "PNG", 0, 0, 54, 85.6);

    if (cardBackRef.current) {
      pdf.addPage();
      const canvasBack = await html2canvas(cardBackRef.current, options);
      const imgDataBack = canvasBack.toDataURL("image/png");
      pdf.addImage(imgDataBack, "PNG", 0, 0, 54, 85.6);
    }

    pdf.save(
      `${state.employee.name}_${state.company.name}_ID.pdf`.toLowerCase()
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <AppNavbar onSave={handleSaveSC} onDownload={downloadPDF} />

      <main className="max-w-9xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Editor Side */}
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-slate-700">
              <div className="w-2 h-6 bg-blue-500 rounded-full" />
              Generator Settings
            </h2>
            <EditorForm state={state} setState={setState} />
          </section>
        </div>

        {/* Preview Side */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full flex flex-col items-center space-y-4 bg-content1 shadow-sm border border-slate-200 rounded-2xl p-6">
            <h2 className="text-lg font-semibold w-full text-center">
              Preview
            </h2>

            <Suspense fallback={<Spinner />}>
              <state.template.Component
                company={state.company}
                sc={state.sc}
                employee={state.employee}
                refs={[cardFrontRef, cardBackRef]}
              />
            </Suspense>

            <p className="text-xs text-slate-500 text-center max-w-xs">
              The generated PDF will be exactly 85.6mm x 54mm (Standard ISO ID-1
              size).
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
