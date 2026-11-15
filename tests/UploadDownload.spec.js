const ExcelJs = require('exceljs');
const path = require('path');
const os = require('os');
const { test, expect } = require('@playwright/test');

async function wrightExcelTest(searchText, ReplaceText, change, filePath) {
    //Optimization of code
    const Workbook = new ExcelJs.Workbook();
    await Workbook.xlsx.readFile(filePath);
    const worksheet = Workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);

    // using row and column property
    const cell = worksheet.getCell(output.row, output.column + change.colChange);
    cell.value = ReplaceText;
    await Workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        })
    })
    return output;
}

test('Ecel file download and upload validation', async ({ page }) => {
    const textSearch = "Mango";
    const textReplace = "360";
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;
    const filePath = path.join(os.homedir(), 'Downloads', 'download.xlsx');
    await download.saveAs(filePath);
    await wrightExcelTest(textSearch, textReplace, { rowChange: 0, colChange: 2 }, filePath);
    await page.locator('#fileinput').setInputFiles(filePath);

    const textlocator = page.getByText(textSearch);
    // const desiredRow = await page.getByRole('row', { name: textSearch }).first();
    const desiredRow = await page.getByRole('row').filter({ has: textlocator });
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(textReplace);

})
