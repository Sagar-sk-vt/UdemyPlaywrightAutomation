const ExcelJs = require('exceljs');

async function excelTest() {
    //Using await 
    const Workbook = new ExcelJs.Workbook();
    await Workbook.xlsx.readFile("C:/Users/SagarKhobragade/Downloads/exceldownloadTest.xlsx")
    const worksheet = Workbook.getWorksheet('Sheet1');
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            console.log(cell.value);
        })
    })
}

excelTest();