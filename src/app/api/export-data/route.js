import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Flat from "@/app/lib/models/flat";
import ExcelJS from "exceljs";
import puppeteer from "puppeteer";

export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format") || "excel";
    const flats = await Flat.find();

    if (format === "excel") {
      const workbook = new ExcelJS.Workbook();

      const typeGroups = flats.reduce((acc, flat) => {
        acc[flat.type] = acc[flat.type] || [];
        acc[flat.type].push(flat);
        return acc;
      }, {});

      for (const type in typeGroups) {
        const sheet = workbook.addWorksheet(type);
        const flatGroup = typeGroups[type];

        const columns = Object.keys(flatGroup[0].toObject()).filter(
          (key) => key !== "_id" && key !== "__v" && key !== "vacant" && key !== "block"
        );

        sheet.columns = columns.map((key) => ({
          header:
            key[0].toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
          key,
          width: 24,
          font: "bold",
          alignment: 'center'
        }));

        sheet.getRow(1).eachCell((cell) => {
          cell.font = { bold: true };
          cell.alignment = { vertical: "middle", horizontal: "center" };
        });

        // Add data rows
        flatGroup.forEach((flat) => {
          const flatObj = flat.toObject();
          const rowData = {};
          columns.forEach((key) => (rowData[key] = flatObj[key]));
          const row = sheet.addRow(rowData);

          // Center align each cell in the row
          row.eachCell((cell) => {
            cell.alignment = { vertical: "middle", horizontal: "center" };
          });
        });

      }

      const buffer = await workbook.xlsx.writeBuffer();
      return new NextResponse(buffer, {
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": "attachment; filename=flats.xlsx",
        },
      });
    }

    // ✅ PDF Export using Puppeteer
    else if (format === "pdf") {
      // Group flats by type
      const groupedFlats = flats.reduce((acc, flat) => {
        acc[flat.type] = acc[flat.type] || [];
        acc[flat.type].push(flat);
        return acc;
      }, {});

      const capitalize = (str) =>
        str
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (char) => char.toUpperCase())
          .trim();

      // Build the HTML for all type sections
      let htmlSections = ``;

      for (const type in groupedFlats) {
        const flatGroup = groupedFlats[type];
        if (flatGroup.length === 0) continue;

        const columns = Object.keys(flatGroup[0].toObject()).filter(
          (key) =>
            key !== "_id" &&
            key !== "__v" &&
            key !== "block" &&
            key !== "vacant" &&
            key !== "updatedAt"
        );

        const section = `
      <div class="section">
        <h2>${type} Flats</h2>
        <table>
          <thead>
            <tr>
              ${columns.map((key) => `<th>${capitalize(key)}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${flatGroup
            .map((flat) => {
              const obj = flat.toObject();
              return `<tr>
                  ${columns
                  .map((key) => `<td>${obj[key] ?? ""}</td>`)
                  .join("")}
                </tr>`;
            })
            .join("")}
          </tbody>
        </table>
      </div>
    `;
        htmlSections += section;
      }

      const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Flat Export</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 40px;
            background: #fff;
          }
          h1 {
            text-align: center;
            color: #333;
            margin-bottom: 40px;
          }
          .section {
            width: 90%;
            margin-bottom: 50px;
            page-break-inside: avoid;
          }
          h2 {
            text-align: center;
            color: #444;
            margin-bottom: 20px;
            text-transform: uppercase;
            text-decoration: underline;
            underline-offset: 10
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
            font-size: 11px;
          }
          th {
            background-color: #f0f0f0;
            min-width: 60px;
          }
            .policy {
    text-align: justify;
    font-size: 13px;
    color: #555;
    background-color: #f9f9f9;
    padding: 15px 20px;
    border-left: 4px solid #053c65;
    margin: 20px 0 30px;
    border-radius: 5px;
  }
        </style>
      </head>
      <body>
        <h1>Housing (Flat Details)</h1>
        <h5 class="policy" style="text-align: justify; font-size: 12px; margin-top: 20px; max-width: 700px;">
  This document contains confidential housing data maintained by the institution. The data presented herein is owned and managed solely by the administrative department. It includes personal and structural details of residential flats, and is intended strictly for official internal use. Unauthorized distribution, modification, or public sharing of this information is prohibited. Only users with administrative privileges are permitted to update or modify the database. By accessing this document, you acknowledge and agree to abide by these data usage policies and institutional confidentiality protocols.
</h5>
        ${htmlSections}

      </body>
    </html>
  `;

      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "networkidle0" });

      const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
      await browser.close();

      return new NextResponse(pdfBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment; filename=flats.pdf",
        },
      });
    } else {
      return NextResponse.json(
        { error: "Invalid format. Use 'excel' or 'pdf'." },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("Export Error:", err);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
