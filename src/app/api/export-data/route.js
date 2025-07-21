import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Flat from "@/app/lib/models/flat";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";
import { Readable } from "stream";
import path from "path";
import fs from "fs";

export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format") || "excel";

    const flats = await Flat.find();

    if (format === "excel") {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Flats");

      if (flats.length === 0) {
        worksheet.addRow(["No data available"]);
      } else {
        // Get keys excluding _id and __v
        const columns = Object.keys(flats[0].toObject()).filter(
          (key) => key !== "_id" && key !== "__v"
        );

        worksheet.columns = columns.map((key) => ({
          header:
            key[0].toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
          key,
          width: 20,
        }));

        flats.forEach((flat) => {
          const flatObj = flat.toObject();
          const filtered = columns.reduce((acc, key) => {
            acc[key] = flatObj[key];
            return acc;
          }, {});
          worksheet.addRow(filtered);
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
    } else if (format === "pdf") {
      const doc = new PDFDocument();
      const stream = Readable.from(doc);

      const fontPath = path.join(
        process.cwd(),
        "public/fonts/Roboto-Regular.ttf"
      );
      if (!fs.existsSync(fontPath)) {
        return NextResponse.json(
          { error: "Font file not found. Ensure Roboto-Regular.ttf exists." },
          { status: 500 }
        );
      }

      doc.font(fontPath);

      if (!fs.existsSync(fontPath)) {
        return NextResponse.json(
          {
            error:
              "Font file not found. Place Roboto-Regular.ttf in /public/fonts.",
          },
          { status: 500 }
        );
      }

      doc.font(fontPath);
      doc.fontSize(16).text("Flat Data", { align: "center" }).moveDown();

      flats.forEach((flat, index) => {
        const { _id, __v, ...rest } = flat.toObject();
        doc
          .fontSize(10)
          .text(
            `${index + 1}. Flat No: ${rest["Flat No."] || rest.flatNo || "N/A"}`
          );
        Object.entries(rest).forEach(([key, value]) => {
          doc.text(`   ${key}: ${value ?? ""}`);
        });
        doc.moveDown();
      });

      doc.end();

      return new NextResponse(stream, {
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
