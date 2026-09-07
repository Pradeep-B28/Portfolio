import { jsPDF } from "jspdf";
import { DEVELOPER } from "../data/developer";
import { PROJECTS } from "../data/projects";

export function generateRecruiterPDFReport(unlockedBoxIds = []) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  // Dark High-Security Header
  doc.setFillColor(15, 20, 28);
  doc.rect(0, 0, 210, 38, "F");

  // Gold Line Accent
  doc.setFillColor(224, 180, 92);
  doc.rect(0, 38, 210, 2, "F");

  // Title
  doc.setTextColor(224, 180, 92);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("THE VAULT — EXECUTIVE PORTFOLIO AUDIT REPORT", 12, 16);

  // Subtitle
  doc.setTextColor(237, 241, 246);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`${DEVELOPER.name} | ${DEVELOPER.title}`, 12, 24);
  doc.text(`Contact: ${DEVELOPER.email} | ${DEVELOPER.phone} | GitHub: github.com/Pradeep-B28`, 12, 31);

  // Body Setup
  let y = 44;

  // Executive Summary Card
  doc.setFillColor(245, 247, 250);
  doc.setDrawColor(200, 210, 220);
  doc.roundedRect(12, y, 186, 28, 2, 2, "FD");

  doc.setTextColor(30, 40, 50);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("CHIEF SECURITY OFFICER — EXECUTIVE SUMMARY", 16, y + 6);

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  const splitSummary = doc.splitTextToSize(DEVELOPER.summary, 178);
  doc.text(splitSummary, 16, y + 12);

  y += 32;

  // Core Metrics Grid
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 20, 28);
  doc.text("KEY PERFORMANCE & MENTORSHIP METRICS", 12, y);
  y += 5;

  const metrics = [
    { label: "Students Mentored", val: DEVELOPER.stats.studentsMentored },
    { label: "VIT Placement Boost", val: DEVELOPER.stats.vitPlacementBoost },
    { label: "Team Trainers Led", val: DEVELOPER.stats.teamSizeLed },
    { label: "Asset Diversity Score", val: `${DEVELOPER.stats.assetDiversityScore || 98}%` }
  ];

  metrics.forEach((m, idx) => {
    const x = 12 + idx * 46.5;
    doc.setFillColor(240, 243, 248);
    doc.rect(x, y, 44, 13, "F");
    doc.setFontSize(7.5);
    doc.setTextColor(100, 110, 120);
    doc.text(m.label, x + 3, y + 4.5);
    doc.setFontSize(9.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 20, 28);
    doc.text(m.val, x + 3, y + 10);
  });

  y += 18;

  // Valued Assets Section
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 20, 28);
  doc.text("VALUABLE ASSETS & AUDITED PROJECT PORTFOLIO", 12, y);
  y += 5;

  // Render Projects Table Header
  doc.setFillColor(20, 28, 40);
  doc.rect(12, y, 186, 6, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  doc.text("BOX", 14, y + 4.2);
  doc.text("PROJECT TITLE", 30, y + 4.2);
  doc.text("ROLE & TECH STACK", 90, y + 4.2);
  doc.text("VALUATION / IMPACT", 160, y + 4.2);

  y += 6;

  PROJECTS.forEach((proj, idx) => {
    const isOpened = unlockedBoxIds.includes(proj.id);
    const bg = idx % 2 === 0 ? 255 : 248;
    doc.setFillColor(bg, bg, bg);
    doc.rect(12, y, 186, 12, "F");

    doc.setFontSize(7.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(isOpened ? 180 : 100, isOpened ? 130 : 100, 20);
    doc.text(`[${proj.boxNumber}]`, 14, y + 4.5);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 20, 28);
    doc.text(proj.title.substring(0, 28), 30, y + 4.5);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(90, 100, 110);
    doc.text(proj.subtitle.substring(0, 32), 30, y + 9);

    doc.text(proj.techTags.slice(0, 4).join(" • "), 90, y + 4.5);
    doc.text(`Role: ${proj.role}`, 90, y + 9);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(20, 100, 40);
    doc.text(`$${(proj.valuation / 1000000).toFixed(1)}M USD`, 160, y + 4.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 110, 120);
    doc.text(`Score: ${proj.complexityScore}/100`, 160, y + 9);

    y += 12;
  });

  // Footer Sign-off
  y = 282;
  doc.setDrawColor(220, 225, 230);
  doc.line(12, y, 198, y);
  doc.setFontSize(7.5);
  doc.setTextColor(120, 130, 140);
  doc.text("Generated via THE VAULT 12D Developer Engine | Candidate: Pradeep B | github.com/Pradeep-B28", 12, y + 5);
  doc.text("CONFIDENTIAL RECRUITER REPORT", 155, y + 5);

  doc.save(`Pradeep_B_The_Vault_Executive_Report.pdf`);
}
