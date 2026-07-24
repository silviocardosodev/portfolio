"use client";

import { ArrowDownToLine } from "lucide-react";

const cvFiles = [
  {
    href: "/downloads/CV-SilvioAlvesCardoso.pdf",
    name: "CV-SilvioAlvesCardoso.pdf",
  },
  {
    href: "/downloads/CURRICULUM-SilvioAlvesCardoso.pdf",
    name: "CURRICULUM-SilvioAlvesCardoso.pdf",
  },
];

type CvDownloadButtonProps = {
  className: string;
  label: string;
};

function getAssetPath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return `${basePath}${path}`;
}

export function CvDownloadButton({ className, label }: CvDownloadButtonProps) {
  function handleDownload() {
    cvFiles.forEach((file) => {
      const link = document.createElement("a");

      link.href = getAssetPath(file.href);
      link.download = file.name;
      link.rel = "noreferrer";
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  }

  return (
    <button className={className} type="button" onClick={handleDownload}>
      <ArrowDownToLine size={18} aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}
