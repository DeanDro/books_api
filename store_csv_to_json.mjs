'use strict'
import { writeFileSync, readFileSync } from "fs";
import { storeDataInDatabase } from "./server_controller.mjs";

const filePath = "C:/Users/Konstantinos/Desktop/CS projects/backend/good_reads_data/books.csv";


function convertData(path){
    
    const fileContent = readFileSync(path);

    // Convert data to string
    let data = fileContent.toString().split("\r");

    // Create an array to store each row 
    let content = [];
    let headers = data[0].split(",");   // store hearders and traverse remaining rows
    
    for (let i = 1; i < data.length -1; i++ ){

        let obj = {};
        let row = data[i].split(",");
        for (let j=0; j<headers.length-1; j++){
            obj[headers[j]] = row[j];
        }

        // Store objects to content array
        content.push(obj);
    }

    return content;
}

// Create json file
// This file was already been created so for now we comment out this.
//let result = convertData(filePath);
//let jsonOutput = JSON.stringify(result);
//writeFileSync("output.json", jsonOutput);

// Store json data in to the database
function storeData(){
    
    // read the data and store in database
    const fileContent = readFileSync('output.json');
    let content = JSON.parse(fileContent);
    let data = content[0];
    let keys_dict = [];

    for (let key in data){
        keys_dict.push(key);
    }

    for (let key in content) {
        storeDataInDatabase(content[key]);
    }

}

storeData();

