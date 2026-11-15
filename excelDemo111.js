const ExcelJs = require('exceljs');

async function excelTest() {
    //Using await 
    let output = {row:-1, column:-1};
    const Workbook = new ExcelJs.Workbook();
    await Workbook.xlsx.readFile("C:/Users/SagarKhobragade/Downloads/exceldownloadTest.xlsx")
    const worksheet = Workbook.getWorksheet('Sheet1');
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === "Iphone2")
            {
                output.row = rowNumber;
                output.column = colNumber;
            }
        })  
    })
    // using row and column property
    const cell = worksheet.getCell(output.row, output.column);
    cell.value = "Samsung";
    await Workbook.xlsx.writeFile("C:/Users/SagarKhobragade/Downloads/exceldownloadTest.xlsx");

}

excelTest();