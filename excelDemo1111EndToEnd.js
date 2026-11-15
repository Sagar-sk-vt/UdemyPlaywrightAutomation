const ExcelJs = require('exceljs');

async function wrightExcelTest(searchText, ReplaceText, change ,filePath) {
    //Optimization of code
    const Workbook = new ExcelJs.Workbook();
    await Workbook.xlsx.readFile(filePath);
    const worksheet = Workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);
    
    // using row and column property
    const cell = worksheet.getCell(output.row, output.column+change.colChange);
    cell.value = ReplaceText;
    await Workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {
     let output = {row:-1, column:-1};
    worksheet.eachRow((row, rowNumber) => { 
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText)
            {
                output.row = rowNumber;
                output.column = colNumber;
            }
        })  
    }) 
    return output;
}

wrightExcelTest("Samsung1",360, {rowChange:0, colChange:2},"C:/Users/SagarKhobragade/Downloads/exceldownloadTest.xlsx");