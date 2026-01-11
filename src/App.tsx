import {
  CompanyType,
  EmployeeDetails,
  IDCardState,
  ServiceCenterDetails,
} from "@/types";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, IdCard, Save } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import EditorForm from "./components/EditorForm";
import IDCardPreview from "./components/IDCardPreview";

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
    company: CompanyType.VOLTAS,
    employee: DEFAULT_EMPLOYEE,
    serviceCenter: DEFAULT_SC,
  });

  const cardFrontRef = useRef<HTMLDivElement>(null);
  const cardBackRef = useRef<HTMLDivElement>(null);

  // Load saved Service Center details from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("service_center_details");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState((prev) => ({ ...prev, serviceCenter: parsed }));
      } catch (e) {
        console.error("Failed to parse saved service center details", e);
      }
    }
  }, []);

  const handleSaveSC = () => {
    localStorage.setItem(
      "service_center_details",
      JSON.stringify(state.serviceCenter)
    );
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

    // If it's Carrier, add a second page for Instructions
    if (state.company === CompanyType.CARRIER && cardBackRef.current) {
      pdf.addPage();
      const canvasBack = await html2canvas(cardBackRef.current, options);
      const imgDataBack = canvasBack.toDataURL("image/png");
      pdf.addImage(imgDataBack, "PNG", 0, 0, 54, 85.6);
    }

    pdf.save(`${state.employee.name}_${state.company}_ID.pdf`);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-9xl mx-auto px-4 py-4 flex flex-row md:items-center justify-between gap-2 md:gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <IdCard className="text-white w-6 h-6" />
            </div>
            <h1 className="text-base md:text-xl font-bold text-slate-800">
              ID Card Generator
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveSC}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium"
            >
              <Save size={18} />
              <span className="hidden md:inline-block">Save SC Details</span>
            </button>
            <button
              onClick={downloadPDF}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-lg"
            >
              <Download size={18} />
              <span className="hidden md:inline-block">Download PDF</span>
            </button>
          </div>
        </div>
      </header>

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
          <div className="sticky top-28 w-full flex flex-col items-center space-y-8">
            <h2 className="text-lg font-semibold text-slate-700 w-full text-center">
              Live Preview
            </h2>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative">
                <IDCardPreview
                  state={state}
                  frontRef={cardFrontRef}
                  backRef={cardBackRef}
                />
              </div>
            </div>

            <p className="text-sm text-slate-500 text-center max-w-xs">
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
