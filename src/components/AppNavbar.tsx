"use client";

import { useMobile } from "@/lib/hooks";
import { Button, Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import { Download, Save } from "lucide-react";

function AppNavbar({
  onSave,
  onDownload,
}: {
  onSave: () => void;
  onDownload: () => void;
}) {
  const isMobile = useMobile();
  return (
    <Navbar maxWidth="full" isBlurred isBordered className="shadow-sm">
      <NavbarBrand className="gap-2">
        <img
          src="/icon-192.png"
          style={{ width: "36px", height: "36px" }}
          alt="app logo"
        />
        <p className="font-bold text-inherit">ID Card Generator</p>
      </NavbarBrand>
      <NavbarContent justify="end" className="gap-3">
        <Button
          onPress={onSave}
          color="primary"
          variant="flat"
          isIconOnly={isMobile}
          title="Save SC Details"
        >
          <Save size={16} /> {isMobile ? "" : "Save SC Details"}
        </Button>
        <Button
          onPress={onDownload}
          color="primary"
          isIconOnly={isMobile}
          title="Download PDF"
        >
          <Download size={16} /> {isMobile ? "" : "Download PDF"}
        </Button>
      </NavbarContent>
    </Navbar>
  );
}

export default AppNavbar;
