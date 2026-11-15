const ExcelJs = require('exceljs');
const Workbook = new ExcelJs.Workbook();
// Using the function
Workbook.xlsx.readFile("C:/Users/SagarKhobragade/Downloads/exceldownloadTest.xlsx").then(function()
{
    const worksheet = Workbook.getWorksheet('Sheet1');
worksheet.eachRow((row, rowNumber) =>
{
    row.eachCell((cell, colNumber) =>
    {
        console.log(cell.value);
    })
})
})  
