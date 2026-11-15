const ExcelJs = require('exceljs');

async function excelTest() {
    //Using await 
    const Workbook = new ExcelJs.Workbook();
    await Workbook.xlsx.readFile("C:/Users/SagarKhobragade/Downloads/exceldownloadTest.xlsx")
    const worksheet = Workbook.getWorksheet('Sheet1');
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === "Iphone")
            {
                console.log(rowNumber);
                console.log(colNumber);
            }
        })  
    })
    // Define cell and row outside of the worksheet
    const cell = worksheet.getCell(3,2);
    cell.value = "Iphone2";
    await Workbook.xlsx.writeFile("C:/Users/SagarKhobragade/Downloads/exceldownloadTest.xlsx");

}

excelTest();