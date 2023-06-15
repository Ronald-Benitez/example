import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
// import "pdfmake/build/vfs_fonts";

export default function PDFBuilder() {
  const docDefinition = {
    content: [
      {
        text: "This is a header, using header style",
        style: "header",
      },
      "No styling here, this is a standard paragraph",
      {
        text: "Another text, using subheader style",
        style: "subheader",
      },
    ],
    styles: {
      header: {
        fontSize: 22,
        bold: true,
      },
      subheader: {
        fontSize: 15,
        bold: true,
      },
    },
  };

  return (
    <div>
      <button
        onClick={() => {
          pdfMake.createPdf(docDefinition).open();
        }}
      >
        Open PDF
      </button>
    </div>
  );
}
