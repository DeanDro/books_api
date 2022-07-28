import readXlsxFile from "read-excel-file";

//Read data from file

async function getData(){
    try{
        return await readXlsxFile("filepath");
    } catch (error){
        console.error(error);
    }
}

function printData(){
    getData().then(rows=> console.log(rows))
            .catch(error=> console.error(error));
}

printData();