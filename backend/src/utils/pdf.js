// utils/pdf.js
import puppeteer from "puppeteer";
import fs from "fs";

export const generateProposalPDF = async (proposal) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(
    `<h1>Proposal</h1><pre>${JSON.stringify(proposal, null, 2)}</pre>`
  );
  const pdfPath = `./pdfs/proposal-${proposal._id}.pdf`;
  await page.pdf({ path: pdfPath, format: "A4" });
  await browser.close();
  return pdfPath;
};

export const generateAgreementPDF = async (agreement) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(
    `<h1>Agreement</h1><pre>${JSON.stringify(agreement, null, 2)}</pre>`
  );
  const pdfPath = `./pdfs/agreement-${agreement._id}.pdf`;
  await page.pdf({ path: pdfPath, format: "A4" });
  await browser.close();
  return pdfPath;
};
