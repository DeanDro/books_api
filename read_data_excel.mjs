import * as fs from 'fs';

function readFileContent(){
    try{
        fs.readFile("C:/Users/Konstantinos/Desktop/CS projects/backend/good_reads_data/books.csv", 'utf8',
                    (error, data)=>{
                        if (error){
                            console.error(error);
                            return 
                        }
                        console.log(data);
                    })
    } catch(error){
        console.error(error);
    }
}

let data = readFileContent();

