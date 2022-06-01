const express = require('express');
const router = express.Router();

const fs = require('fs');

const path = require('path');

const helpers = require('../lib/helpers');

const pool = require('../config/conexiondb');

const { isLoggedIn,noNeedSeeIfyouLogIn } = require('../lib/auth');

const verifyToken = require('../lib/verifyToken');
const { render } = require('timeago.js');
const readline = require('readline');

//const ObjectsToCsv = require('objects-to-csv');


//,verifyToken
router.get("/",async(req, res)=>{

    const user = req.user;

    res.render('formLoadBase');
});

router.post('/upload',async (req,res) => {
    
    let EDFile = req.files.fileBase;
    let error = false;
    let message ="";

    //return res.json({message,error,status:500});
    
    
    console.log(EDFile.name.slice(0,-4));
    if(EDFile.mimetype !="text/plain"){
        message = "El tipo de archivo seleccionado no es valido. Seleccione un archivo tipo texto";
        error = true;
        //return res.render('formLoadBase',{message,error});
        await helpers.sleep(1000);
        return res.json({message,error,status:500});
    }else{

        let pathFile = path.join(__dirname, "../public/files",EDFile.name);

        let uploadFileResponse = (await helpers.uploadFile(EDFile,pathFile))==true ? true:false;
        console.log(uploadFileResponse);

        if(uploadFileResponse)  return res.json({message:"Error al cargar el archivo seleccionado.",error:true,status:500});

        if(uploadFileResponse==false){
            await helpers.sleep(1000);
            let valor= "";

            const readInterface = readline.createInterface({
                input: fs.createReadStream(pathFile)
            });    

            let infoNewFile = "";
            let indiceLine = 1;
            let arrayNewFile =[];
            let A1,	B1,	C1,	D1,	E1,	F1,	G1,	H1,	I1,	J1,	K1,	L1,	M1,	N1,	O1,	P1,	Q1,	R1,	S1,	T1,	U1,	V1,	W1,	X1,	Y1,	Z1,	A2,	A3,	A4,	A5,	A6,	A7; 


            for await (const line of readInterface) {
                // Each line in the readline input will be successively available here as
                // `line`.
                if(!error){
                    newline ="";
                    arrayNewLine = [];
                    
                    /*if(line.length>332 || line.length<332){
                        message = "El formato del archivo de texto no cumple con las especificaciónes requeridas para la homologación de la información. Linea "+indiceLine+" Largo de linea "+line.length;
                        error = true;
                        console.log(pathFile);
                        fs.unlinkSync(pathFile);
                        return res.json({message,error,status:500});
                    }*/


                    //Tipo de identificación Contratante (Cotizante)
                    if(!helpers.validRole('CC,TI,RC,CE,PA,PE,PT,CN,CD,TE,SC,MS',line.substring(0,2).toUpperCase()) && !error){
                        message = "El formato del archivo de texto no cumple con las especificaciónes requeridas para la homologación de la información. Tipo de identificación no definido. Linea "+indiceLine;
                        error = true;
                        fs.unlinkSync(pathFile);
                        return res.json({message,error,status:500});
                    }
                    A1 = line.substring(0,2);
                    newline =newline+line.substring(0,2)+",";
                    
                    //arrayNewLine.push(newline);
                    //console.log(newline);


                    //Número de identificación Contratante (Cotizante)
                    if(!helpers.esNumero(helpers.trimLeftCero(line.substring(2,18))) && !error){
                        message = "El formato del archivo de texto no cumple con las especificaciónes requeridas para la homologación de la información. Número de identificación no definido. Linea "+indiceLine;
                        error = true;
                        fs.unlinkSync(pathFile);
                        return res.json({message,error,status:500});
                    }
                    valor = await helpers.trimLeftCero(line.substring(2,18));
                    B1 = valor;
                    newline =newline+valor+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);


                    //Tipo de identificación Beneficiario
                    if(!helpers.validRole('CC,TI,RC,CE,PA,PE,PT,CN,CD,TE,SC,MS',line.substring(18,20).toUpperCase()) && !error){
                        message = "El formato del archivo de texto no cumple con las especificaciónes requeridas para la homologación de la información. Tipo de identificación beneficiario no definido. Linea "+indiceLine;
                        error = true;
                        fs.unlinkSync(pathFile);
                        return res.json({message,error,status:500});
                    }
                    C1=line.substring(18,20);
                    newline =newline+line.substring(18,20)+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //Número de identificación Beneficiario
                    if(!helpers.esNumero(helpers.trimLeftCero(line.substring(20,36))) && !error){
                        message = "El formato del archivo de texto no cumple con las especificaciónes requeridas para la homologación de la información. Número de identificación beneficiario no definido. Linea "+indiceLine;
                        error = true;
                        fs.unlinkSync(pathFile);
                        return res.json({message,error,status:500});
                    }
                    valor = await helpers.trimLeftCero(line.substring(20,36));
                    D1 = valor;
                    newline =newline+valor+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //Primer Apellido
                    E1=line.substring(36,51).trim();
                    newline =newline+line.substring(36,51).trim()+",";
                    
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //Segundo Apellido
                    F1=line.substring(51,66).trim();
                    newline =newline+line.substring(51,66).trim()+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //Nombre
                    G1 = line.substring(66,86).trim();
                    newline =newline+line.substring(66,86).trim()+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //Segundo Nombre
                    H1 = line.substring(86,106).trim();
                    newline =newline+line.substring(86,106).trim()+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //Sexo
                    if(!helpers.validRole('F,M',line.substring(106,107)) && !error){
                        message = "El formato del archivo de texto no cumple con las especificaciónes requeridas para la homologación de la información. Sexo no definido. Linea "+indiceLine;
                        error = true;
                        fs.unlinkSync(pathFile);
                        return res.json({message,error,status:500});
                    }
                    I1 = line.substring(106,107).trim();
                    newline =newline+line.substring(106,107).trim()+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //Código IPS
                    J1 = line.substring(107,112).trim();
                    newline =newline+line.substring(107,112).trim()+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //Teléfono
                    if(!helpers.esNumero(helpers.trimLeftCero(line.substring(112,122))) && !error){
                        message = "El formato del archivo de texto no cumple con las especificaciónes requeridas para la homologación de la información. Número de telefono no definido. Linea "+indiceLine;
                        error = true;
                        //return res.render('formLoadBase',{message,error});
                        fs.unlinkSync(pathFile);
                        return res.json({message,error,status:500});
                    }
                    valor = await helpers.trimLeftCero(line.substring(112,122));
                    K1 = valor;
                    newline =newline+valor+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //Fecha de Nacimiento
                    if(!helpers.esNumero(helpers.trimLeftCero(line.substring(122,130))) && !error){
                        message = "El formato del archivo de texto no cumple con las especificaciónes requeridas para la homologación de la información. Fecha nacimiento no definido. Linea "+indiceLine;
                        error = true;
                        //return res.render('formLoadBase',{message,error});
                        fs.unlinkSync(pathFile);
                        return res.json({message,error,status:500});
                    }
                    valor = await helpers.trimLeftCero(line.substring(122,130));
                    L1 = valor;
                    newline =newline+valor+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //Estrato
                    if(!helpers.esNumero(helpers.trimLeftCero(line.substring(130,131))) && !error){
                        message = "El formato del archivo de texto no cumple con las especificaciónes requeridas para la homologación de la información. Estrato no definido. Linea "+indiceLine;
                        error = true;
                        //return res.render('formLoadBase',{message,error});
                        fs.unlinkSync(pathFile);
                        return res.json({message,error,status:500});
                    }
                    valor = await helpers.trimLeftCero(line.substring(130,131));
                    M1 = valor;
                    newline =newline+valor+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //Contratante
                    if(!helpers.validRole('S,N',line.substring(131,132)) && !error){
                        message = "El formato del archivo de texto no cumple con las especificaciónes requeridas para la homologación de la información. contratante no definido. Linea "+indiceLine;
                        error = true;
                        //return res.render('formLoadBase',{message,error});
                        fs.unlinkSync(pathFile);
                        return res.json({message,error,status:500});
                    }
                    N1 = line.substring(131,132).trim();
                    newline =newline+line.substring(131,132).trim()+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);
            
                    //Tipo de IPS
                    if(!helpers.esNumero(helpers.trimLeftCero(line.substring(132,133))) && !error){
                        message = "El formato del archivo de texto no cumple con las especificaciónes requeridas para la homologación de la información. Tipo IPS no definido. Linea "+indiceLine;
                        error = true;
                        //return res.render('formLoadBase',{message,error});
                        fs.unlinkSync(pathFile);
                        return res.json({message,error,status:500});
                    }
                    valor = await helpers.trimLeftCero(line.substring(132,133));
                    O1 = valor;
                    newline =newline+valor+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //Número Beneficiario
                    P1= line.substring(133,135).trim();
                    newline =newline+line.substring(133,135).trim()+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //Plan
                    Q1 = line.substring(135,145).trim();
                    newline =newline+line.substring(135,145).trim()+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //Anexo
                    R1 = line.substring(145,146).trim();
                    newline =newline+line.substring(145,146).trim()+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //Producto
                    S1 = line.substring(146,148).trim();
                    newline =newline+line.substring(146,148).trim()+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //Semanas
                    if(!helpers.esNumero(helpers.trimLeftCero(line.substring(148,153))) && !error){
                        message = "El formato del archivo de texto no cumple con las especificaciónes requeridas para la homologación de la información. Semanas cotizadas no definido. Linea "+indiceLine;
                        error = true;
                        //return res.render('formLoadBase',{message,error});
                        fs.unlinkSync(pathFile);
                        return res.json({message,error,status:500});
                    }
                    valor = await helpers.trimLeftCero(line.substring(148,153));
                    T1 = valor;
                    newline =newline+valor+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //Derecho Servicio
                    if(!helpers.validRole('S,N',line.substring(153,154)) && !error){
                        message = "El formato del archivo de texto no cumple con las especificaciónes requeridas para la homologación de la información. Derecho a servicio no definido. Linea "+indiceLine;
                        error = true;
                        //return res.render('formLoadBase',{message,error});
                        fs.unlinkSync(pathFile);
                        return res.json({message,error,status:500});
                    }
                    U1 = line.substring(153,154).trim();
                    newline =newline+line.substring(153,154).trim()+",";
                    
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //Parentesco
                    V1 = line.substring(154,156).trim();
                    newline =newline+line.substring(154,156).trim()+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //Razón Social Empleador
                    W1 = line.substring(156,206).trim();
                    newline =newline+line.substring(156,206).trim()+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //Causal de No Servicio
                    X1 = line.substring(206,208).trim();
                    newline =newline+line.substring(206,208).trim()+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //Teléfono Empleador
                    if(!helpers.esNumero(helpers.trimLeftCero(line.substring(208,218))) && !error){
                        message = "El formato del archivo de texto no cumple con las especificaciónes requeridas para la homologación de la información. Telefono empleador no definido. Linea "+indiceLine;
                        error = true;
                        //return res.render('formLoadBase',{message,error});
                        fs.unlinkSync(pathFile);
                        return res.json({message,error,status:500});
                    }
                    valor = await helpers.trimLeftCero(line.substring(208,218));
                    Y1 = valor;
                    newline =newline+valor+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //Número Solicitud
                    if(!helpers.esNumero(helpers.trimLeftCero(line.substring(218,226))) && !error){
                        message = "El formato del archivo de texto no cumple con las especificaciónes requeridas para la homologación de la información. Número solicitud no definido. Linea "+indiceLine;
                        error = true;
                        //return res.render('formLoadBase',{message,error});
                        fs.unlinkSync(pathFile);
                        return res.json({message,error,status:500});
                    }
                    valor = await helpers.trimLeftCero(line.substring(218,226));
                    Z1 = valor;
                    newline =newline+valor+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);   

                    //Período
                    if(!helpers.esNumero(helpers.trimLeftCero(line.substring(226,232))) && !error){
                        message = "El formato del archivo de texto no cumple con las especificaciónes requeridas para la homologación de la información. Periodo no definido. Linea "+indiceLine;
                        error = true;
                        //return res.render('formLoadBase',{message,error});
                        fs.unlinkSync(pathFile);
                        return res.json({message,error,status:500});
                    }
                    valor = await helpers.trimLeftCero(line.substring(226,232));
                    A2 = valor;
                    newline =newline+valor+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //Ciudad
                    A3 = line.substring(232,277).trim();
                    newline =newline+line.substring(232,277).trim()+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //Dirección
                    A4 = line.substring(277,327).trim();
                    newline =newline+line.substring(277,327).trim()+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //Tutela
                    A5  = line.substring(327,328).trim();
                    newline =newline+line.substring(327,328).trim()+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //CONDICION ESPECIAL
                    A6 = line.substring(328,330).trim();
                    newline =newline+line.substring(328,330).trim()+",";
                    //arrayNewLine.push(newline);
                    //console.log(newline);

                    //CODIGO EXIME
                    A7 = line.substring(330,332).trim();
                    newline =newline+line.substring(330,332).trim()+"\n";
                    //arrayNewLine.push(newline);
                    //console.log(newline);
                    

                    infoNewFile = infoNewFile+newline;
                    arrayNewFile.push({ A1,	B1,	C1,	D1,	E1,	F1,	G1,	H1,	I1,	J1,	K1,	L1,	M1,	N1,	O1,	P1,	Q1,	R1,	S1,	T1,	U1,	V1,	W1,	X1,	Y1,	Z1,	A2,	A3,	A4,	A5,	A6,	A7});

                }
                indiceLine++;
            }
            console.log(infoNewFile);
            let newNameFile = pathFile.slice(0,-4)+'.csv';
            fs.writeFile(newNameFile, infoNewFile, (err) => {
                if (err)
                //console.log(err);
                return res.json({message:err,error:true,status:500});
                else {
                    return res.json({message:`La homologación de los datos se ha realizado satisfactoriamente. Para descargar presionar <a href="files/${EDFile.name.slice(0,-4)}.csv">aquí</a>`,error:false,status:200});
                }
            });

            
        }
        
        
    }


});


module.exports = router;