const mongoose = require("mongoose");
var dotenv = require('dotenv');
dotenv.config({ path: "../.env" }); // where is the '.env' file

const Material = require('../models/material');
const Category = require('../models/category');

/*
- General[0]
  - Material Informàtic[1]
    - Impressores[2]
    - Ordinadors[3]
    - Sobretaula[4]
    - Protatil[5]
    - Programari[6]
  - Material d'Oficina[7]
    - Bolígrafs i llapisos[8]
    - Arxivadors[9]
  - Mobiliari Escolar[10]
    - Taules[11]
    - Cadires[12]
    - Pissarres[13]
    - Armaris[14]
    - Bancs[15]
    - Prestatgeries[16]

*/

const seeder = async () => { 
   try {
      await mongoose.connect(process.env.MONGODB_URI)

      const PORT = process.env.PORT || 8080; 
      const url = `http://localhost:${PORT}/images/materials/`;

      await Material.collection.drop();    // Delete materials collection  
      let categories = await Category.find();
    


       await Material.create({ name: "cadira", image: url + "DSC_5241.png", description: "Cadira escolar amb respatller recte, ideal per a l'ús a l'aula.", category: categories[12]._id });
       await Material.create({ name: "taula reunio ovalada", image: url + "DSC_5242.png", description: "Taula de reunions ovalada amb superfície ampla per a reunions de grup.", category: categories[11]._id });
       await Material.create({ name: "armari 2 cossos", image: url + "DSC_5243.png", description: "Armari amb dos cossos per a emmagatzemament d'objectes a l'oficina o l'aula.", category: categories[14]._id });
       await Material.create({ name: "taula direccio", image: url + "DSC_5244.png", description: "Taula de direcció elegant i funcional per a l'ús en despatxos o aules.", category: categories[11]._id });
       await Material.create({ name: "cadira despatx", image: url + "DSC_5246.png", description: "Cadira ergonòmica per a despatxos, proporcionant comoditat durant llargues hores de treball.", category: categories[12]._id });
       await Material.create({ name: "cadira treball", image: url + "DSC_5248.png", description: "Cadira pràctica i còmoda per a tasques de treball diari.", category: categories[12]._id });
       await Material.create({ name: "taula treball", image: url + "DSC_5249.png", description: "Taula de treball amb ample espai per a realitzar tasques diverses.", category: categories[11]._id });
       await Material.create({ name: "armari portes persiana", image: url + "DSC_5251.png", description: "Armari amb portes de persiana per a un accés fàcil i estalvi d'espai.", category: categories[14]._id });
       await Material.create({ name: "taula material", image: url + "DSC_5252.jpg", description: "Taula pràctica per a col·locar i organitzar material divers.", category: categories[11]._id });
       await Material.create({ name: "cadira repos", image: url + "DSC_5253.png", description: "Cadira relaxant per a zones de descans o espera.", category: categories[12]._id });
       await Material.create({ name: "banc metalic", image: url + "DSC_5254.png", description: "Banc resistents i durador, ideal per a zones comuns.", category: categories[15]._id });
       await Material.create({ name: "cadira menjar vermella", image: url + "DSC_5255.png", description: "Cadira de menjador en color vermell, ideal per a menjadors escolars.", category: categories[12]._id });
       await Material.create({ name: "taula menjar curta beige", image: url + "DSC_5256.png", description: "Taula de menjador curta amb acabat en color beige.", category: categories[11]._id });
       await Material.create({ name: "taula menja llarga beige", image: url + "DSC_5257.png", description: "Taula de menjador llarga amb acabat en color beige, ideal per a menjadors escolars.", category: categories[11]._id });
       await Material.create({ name: "taula menjar llarga verda", image: url + "DSC_5258.png", description: "Taula de menjador llarga en color verd, perfecta per a menjadors escolars o àrees de restauració.", category: categories[11]._id });
       await Material.create({ name: "taula menjar curta verda", image: url + "DSC_5259.png", description: "Taula de menjador curta en color verd, adequada per a menjadors escolars o espais recreatius.", category: categories[11]._id });
       await Material.create({ name: "cadira blava", image: url + "DSC_5260.png", description: "Cadira de color blau, ideal per a àrees de treball o estudi.", category: categories[12]._id });
       await Material.create({ name: "cadira gris", image: url + "DSC_5261.png", description: "Cadira de color gris, pràctica i versàtil per a diversos entorns.", category: categories[12]._id });
       await Material.create({ name: "cadira blanca", image: url + "DSC_5262.png", description: "Cadira de color blanc, elegant i moderna per a espais contemporanis.", category: categories[12]._id });
       await Material.create({ name: "taula verda alumne", image: url + "DSC_5263.png", description: "Taula de color verd destinada a ús dels alumnes, ideal per a entorns educatius.", category: categories[11]._id });
       await Material.create({ name: "banc metalic", image: url + "DSC_5264.png", description: "Banc metàl·lic robust i durador, perfecte per a zones d'espera o exteriors.", category: categories[15]._id });
       await Material.create({ name: "cadira vermella publicitat", image: url + "DSC_5267.png", description: "Cadira de color vermell amb espai per a publicitat, ideal per a esdeveniments o exposicions.", category: categories[12]._id });
       await Material.create({ name: "taula gris publicitat", image: url + "DSC_5268.png", description: "Taula de color gris amb espai per a publicitat, perfecta per a promocions o esdeveniments.", category: categories[11]._id });
       await Material.create({ name: "cadira alumne color fusta", image: url + "DSC_5269.png", description: "Cadira per a alumnes amb acabat en color fusta, clàssica i còmoda per a entorns educatius.", category: categories[12]._id });
       await Material.create({ name: "cadira docent color blau", image: url + "DSC_5270.png", description: "Cadira per a personal docent de color blau, ergonòmica i funcional per a despatxos o aules.", category: categories[12]._id });
       await Material.create({ name: "taula docent + buc 2 calaixos", image: url + "DSC_5271.png", description: "Taula per a personal docent amb buc i dos calaixos, ideal per a organització de materials i documents.", category: categories[11]._id });
       await Material.create({ name: "taula alumne color fusta", image: url + "DSC_5272.png", description: "Taula per a alumnes amb acabat en color fusta, pràctica i resistenta per a l'ús diari.", category: categories[11]._id });
       await Material.create({ name: "armari baix 2 cossos", image: url + "DSC_5273.png", description: "Armari baix amb dos cossos per a emmagatzemament d'objectes a l'aula o l'oficina.", category: categories[14]._id });
       await Material.create({ name: "armari portes persiana", image: url + "DSC_5274.png", description: "Armari amb portes de persiana per a un accés fàcil i estalvi d'espai, perfecte per a magatzem.", category: categories[14]._id });
       await Material.create({ name: "arxivador 8 calaixos", image: url + "DSC_5275.png", description: "Arxivador amb vuit calaixos per a organització de documents i materials.", category: categories[9]._id });
       await Material.create({ name: "taula mostrador doble mostrador", image: url + "DSC_5276.png", description: "Taula mostrador doble amb ampli espai de treball i mostrador per a atenció al públic.", category: categories[11]._id });
       await Material.create({ name: "arxivador 3 calaixos", image: url + "DSC_5278.png", description: "Arxivador amb tres calaixos per a emmagatzemament d'objectes i documents.", category: categories[9]._id });
       await Material.create({ name: "arxivador carpetes bagul", image: url + "DSC_5279.png", description: "Arxivador especialment dissenyat per a carpetes i documents de mida gran.", category: categories[9]._id });
       await Material.create({ name: "taula de treball recta + buc 3 calaixos", image: url + "DSC_5280.png", description: "Taula de treball amb superfície recta i buc de tres calaixos per a organització de materials.", category: categories[11]._id });
       await Material.create({ name: "cadira blava amb rodes i braç", image: url + "DSC_5281.png", description: "Cadira de color blau amb rodes i reposabraços, ideal per a oficines o aules.", category: categories[12]._id });
       await Material.create({ name: "cadira treball", image: url + "DSC_5281.png", description: "Cadira ergonòmica i confortable per a tasques de treball diàries.", category: categories[12]._id });
       await Material.create({ name: "taula treball semicorba + buc 4 calaixos", image: url + "DSC_5283.png", description: "Taula de treball amb superfície semicorba i buc de quatre calaixos per a organització d'objectes.", category: categories[11]._id });
       await Material.create({ name: "cadira treballador", image: url + "DSC_5284.png", description: "Cadira pràctica i funcional per a tasques laborals quotidianes.", category: categories[12]._id });
       await Material.create({ name: "tamboret", image: url + "DSC_5285.png", description: "Tamboret compacte i versàtil per a ús en diverses situacions.", category: categories[12]._id });
       await Material.create({ name: "moble 2 estants", image: url + "DSC_5286.jpg", description: "Moble amb dos estants per a emmagatzemament de materials i documents.", category: categories[14]._id });
       await Material.create({ name: "cadira blava 4 potes", image: url + "DSC_5287.png", description: "Cadira de color blau amb quatre potes, ideal per a entorns de treball.", category: categories[12]._id });
       await Material.create({ name: "cadira blava 4 potes", image: url + "DSC_5288.png", description: "Cadira de color blau amb quatre potes, còmoda i resistenta.", category: categories[12]._id });
       await Material.create({ name: "taula treball semicorba + buc 4 calaixos", image: url + "DSC_5290.png", description: "Taula de treball amb superfície semicorba i buc de quatre calaixos, ideal per a organització de tasques.", category: categories[11]._id });
       await Material.create({ name: "armari auxiliar amb calaixera", image: url + "DSC_5291.png", description: "Armari auxiliar amb calaixera per a emmagatzemament de materials diversos.", category: categories[14]._id });
       await Material.create({ name: "taula llarga color faig", image: url + "DSC_5292.png", description: "Taula llarga amb acabat en color fagot, ideal per a àrees de treball o estudis.", category: categories[11]._id });
       await Material.create({ name: "taula llarga 4 potes color faig", image: url + "DSC_5293.png", description: "Taula llarga amb quatre potes i acabat en color fagot, perfecta per a tasques diverses.", category: categories[11]._id });
       await Material.create({ name: "cadira negra 4 potes", image: url + "DSC_5294.png", description: "Cadira de color negre amb quatre potes, versàtil i elegant per a entorns diversos.", category: categories[12]._id });
       await Material.create({ name: "armari portes persiana", image: url + "DSC_5295.png", description: "Armari amb portes de persiana per a un accés fàcil i estalvi d'espai.", category: categories[14]._id });
       await Material.create({ name: "cadira negra 4 potes amb braç", image: url + "DSC_5296.png", description: "Cadira de color negre amb quatre potes i reposabraços, còmoda i pràctica per a usos variats.", category: categories[12]._id });
       await Material.create({ name: "taula de reunio color faig ovalada", image: url + "DSC_5297.png", description: "Taula de reunions ovalada amb acabat en color fagot, ideal per a reunions de grup.", category: categories[11]._id });
       await Material.create({ name: "taula de treball recta + buc 2 calaixos color faig", image: url + "DSC_5298.png", description: "Taula de treball recta amb buc de dos calaixos i acabat en color fagot, perfecta per a organització de tasques.", category: categories[11]._id });
       await Material.create({ name: "moble 4 estants sense portes", image: url + "DSC_5324.png", description: "Moble amb quatre estants sense portes per a emmagatzemament de materials diversos.", category: categories[14]._id });
       await Material.create({ name: "cadira negra 4 potes", image: url + "DSC_5301.png", description: "Cadira de color negre amb quatre potes, versàtil i funcional per a diverses situacions.", category: categories[12]._id });
       await Material.create({ name: "taula verda docent amb calaixera", image: url + "DSC_5302.png", description: "Taula de color verd destinada a ús del personal docent, amb calaixera per a emmagatzemament de materials.", category: categories[11]._id });
       await Material.create({ name: "taula verda alumne", image: url + "DSC_5303.png", description: "Taula de color verd destinada a ús dels alumnes, ideal per a entorns educatius.", category: categories[11]._id });
       await Material.create({ name: "cadira verda alumne", image: url + "DSC_5304.png", description: "Cadira de color verd destinada a ús dels alumnes, còmoda i resistenta per a llargues hores d'estudi.", category: categories[12]._id });
       await Material.create({ name: "armari baix 2 cossos color blanc", image: url + "DSC_5305.png", description: "Armari baix amb dos cossos i acabat en color blanc, perfecte per a emmagatzemament d'objectes diversos.", category: categories[14]._id });
       await Material.create({ name: "cadira negra 4 potes sense braç", image: url + "DSC_5307.png", description: "Cadira de color negre amb quatre potes, sense reposabraços, ideal per a espais reduïts.", category: categories[12]._id });
       await Material.create({ name: "taula reunions cuadrada", image: url + "DSC_5308.png", description: "Taula de reunions de forma quadrada, pràctica i funcional per a sessions de treball en grup.", category: categories[11]._id });
       await Material.create({ name: "cadira negra 4 potes sense braç", image: url + "DSC_5309.png", description: "Cadira de color negre amb quatre potes, sense reposabraços, versàtil per a diferents entorns.", category: categories[12]._id });
       await Material.create({ name: "armari portes persiana", image: url + "DSC_5310.png", description: "Armari amb portes de persiana per a un accés fàcil i estalvi d'espai, perfecte per a emmagatzemament.", category: categories[14]._id });
       await Material.create({ name: "cadira despatx", image: url + "DSC_5311.png", description: "Cadira de despatx elegant i confortable, ideal per a tasques de treball prolongades.", category: categories[12]._id });
       await Material.create({ name: "taula recta dos braços + calaixera 4 calaixos", image: url + "DSC_5312.png", description: "Taula de treball amb superfície recta, dos braços i buc de quatre calaixos, perfecta per a organització de tasques.", category: categories[11]._id });
       await Material.create({ name: "arxivador gris 4 calaixos", image: url + "DSC_5313.png", description: "Arxivador de color gris amb quatre calaixos per a organització de documents i materials d'oficina.", category: categories[9]._id });
       await Material.create({ name: "taula recta dos braços + calaixera 3 calaixos", image: url + "DSC_5314.png", description: "Taula de treball amb superfície recta, dos braços i buc de tres calaixos, ideal per a organització d'objectes.", category: categories[11]._id });
       await Material.create({ name: "banc color verd", image: url + "DSC_5315.png", description: "Banc de color verd, robust i durador, perfecte per a zones d'espera o exteriors.", category: categories[15]._id });
       await Material.create({ name: "armari baix 2 cossos color blanc", image: url + "DSC_5316.png", description: "Armari baix amb dos cossos i acabat en color blanc, pràctic i funcional per a emmagatzemament.", category: categories[14]._id });
       await Material.create({ name: "armari portes persiana", image: url + "DSC_5317.png", description: "Armari amb portes de persiana per a un accés fàcil i estalvi d'espai, ideal per a magatzem.", category: categories[14]._id });
       await Material.create({ name: "cadira blava 4 potes sense braç", image: url + "DSC_5318.png", description: "Cadira de color blau amb quatre potes, sense reposabraços, versàtil per a diferents entorns.", category: categories[12]._id });
       await Material.create({ name: "cadira negra 4 potes sense braç", image: url + "DSC_5319.png", description: "Cadira de color negre amb quatre potes, sense reposabraços, còmoda i funcional per a usos variats.", category: categories[12]._id });
       await Material.create({ name: "taula gris quatre potes metaliques", image: url + "DSC_5320.png", description: "Taula de color gris amb quatre potes metàl·liques, robusta i durable per a àrees de treball.", category: categories[11]._id });
       await Material.create({ name: "taula color beige dos potes", image: url + "DSC_5321.png", description: "Taula de color beige amb dues potes, pràctica i versàtil per a espais reduïts.", category: categories[11]._id });
       await Material.create({ name: "taula color beige departament", image: url + "DSC_5322.png", description: "Taula de color beige ideal per a departaments o àrees de treball específiques.", category: categories[11]._id });
       await Material.create({ name: "taula auxiliar amb potes color gris", image: url + "DSC_5323.png", description: "Taula auxiliar amb potes de color gris, útil per a suport addicional en diferents espais.", category: categories[11]._id });
       await Material.create({ name: "prestatgeria descoberta color beige", image: url + "DSC_5324.png", description: "Prestatgeria descoberta de color beige, ideal per a exposició o emmagatzemament lleuger.", category: categories[16]._id });
       await Material.create({ name: "taula alumne color fusta", image: url + "DSC_5277.png", description: "Taula per a alumnes amb acabat en color fusta, ideal per a tasques d'estudi.", category: categories[11]._id });
       await Material.create({ name: "arxivador 3 calaixos", image: url + "DSC_5278.png", description: "Arxivador amb tres calaixos per a emmagatzemament d'objectes i documents.", category: categories[9]._id });
       await Material.create({ name: "arxivador carpetes bagul", image: url + "DSC_5279.png", description: "Arxivador especialment dissenyat per a carpetes i documents de mida gran.", category: categories[9]._id });
       await Material.create({ name: "taula de treball recta + buc 3 calaixos", image: url + "DSC_5280.png", description: "Taula de treball amb superfície recta i buc de tres calaixos per a organització de materials.", category: categories[11]._id });
       await Material.create({ name: "cadira treball", image: url + "DSC_5281.png", description: "Cadira ergonòmica i confortable per a tasques de treball diàries.", category: categories[12]._id });
       await Material.create({ name: "taula treball semicorba + buc 4 calaixos", image: url + "DSC_5283.png", description: "Taula de treball amb superfície semicorba i buc de quatre calaixos per a organització d'objectes.", category: categories[11]._id });
       await Material.create({ name: "cadira treballador", image: url + "DSC_5284.png", description: "Cadira pràctica i funcional per a tasques laborals quotidianes.", category: categories[12]._id });
       await Material.create({ name: "tamboret", image: url + "DSC_5285.png", description: "Tamboret compacte i versàtil per a ús en diverses situacions.", category: categories[12]._id });
       await Material.create({ name: "cadira blava 4 potes", image: url + "DSC_5287.png", description: "Cadira de color blau amb quatre potes, ideal per a entorns de treball.", category: categories[12]._id });
       await Material.create({ name: "llibreria auxiliar", image: url + "DSC_5325.png", description: "Llibreria auxiliar per a emmagatzemament d'objectes o exposició de materials.", category: categories[14]._id });
       await Material.create({ name: "taula modular beige departament", image: url + "DSC_5326.png", description: "Taula modular de color beige ideal per a departaments o àrees de treball específiques.", category: categories[11]._id });
       await Material.create({ name: "composicio tres moduls armari+calaixos+prestatges beige", image: url + "DSC_5327.png", description: "Composició de tres mòduls: armari, calaixos i prestatges, amb acabat en color beige.", category: categories[14]._id });
       await Material.create({ name: "taula rectangular", image: url + "DSC_5329.png", description: "Taula de forma rectangular, versàtil i funcional per a diverses aplicacions.", category: categories[11]._id });
       await Material.create({ name: "armari dos portes", image: url + "DSC_5330.png", description: "Armari amb dues portes per a un emmagatzemament segur i organitzat.", category: categories[14]._id });
       await Material.create({ name: "armari 4 calaixos", image: url + "DSC_5331.png", description: "Armari amb quatre calaixos per a una organització eficient d'objectes petits.", category: categories[14]._id });
       await Material.create({ name: "armari dos portes", image: url + "DSC_5332.png", description: "Armari amb dues portes per a un emmagatzemament segur i organitzat.", category: categories[14]._id });
       await Material.create({ name: "taula rectangular color fusta", image: url + "DSC_5333.png", description: "Taula de forma rectangular amb acabat en color fusta, elegant i clàssica.", category: categories[11]._id });
       await Material.create({ name: "cadira negra", image: url + "DSC_5334.png", description: "Cadira de color negre, versàtil i còmoda per a diferents entorns.", category: categories[12]._id });
       await Material.create({ name: "taula despatx forma de L", image: url + "DSC_5335.png", description: "Taula de despatx amb forma de L, optimitza l'espai i proporciona àrees de treball addicionals.", category: categories[11]._id });
       await Material.create({ name: "armari obert dos estanteries", image: url + "DSC_5336.png", description: "Armari obert amb dues prestatgeries per a exposició o emmagatzemament visible.", category: categories[14]._id });
       await Material.create({ name: "cadira negra despatx", image: url + "DSC_5337.png", description: "Cadira de color negre dissenyada per a entorns de despatx, elegant i ergonòmica.", category: categories[12]._id });
       await Material.create({ name: "armari 6 estanteries", image: url + "DSC_5338.png", description: "Armari amb sis prestatgeries per a una gran capacitat d'emmagatzemament.", category: categories[14]._id });
       await Material.create({ name: "armari de clau", image: url + "DSC_5339.png", description: "Armari amb sistema de clau per a un emmagatzemament segur i privat.", category: categories[14]._id });
       await Material.create({ name: "cadira alumne color fusta", image: url + "DSC_5340.png", description: "Cadira de color fusta destinada a ús dels alumnes, clàssica i resistenta.", category: categories[12]._id });
       await Material.create({ name: "taula alumne color fusta", image: url + "DSC_5341.png", description: "Taula de color fusta destinada a ús dels alumnes, pràctica i funcional.", category: categories[11]._id });
       await Material.create({ name: "taula alumne color fusta", image: url + "DSC_5342.png", description: "Taula de color fusta destinada a ús dels alumnes, pràctica i funcional.", category: categories[11]._id });
       await Material.create({ name: "cadira alumne color fusta", image: url + "DSC_5343.png", description: "Cadira de color fusta destinada a ús dels alumnes, còmoda i resistenta.", category: categories[12]._id });
       await Material.create({ name: "cadira negra professor", image: url + "DSC_5344.png", description: "Cadira de color negre destinada al professorat, ergonòmica i elegant.", category: categories[12]._id });
       await Material.create({ name: "taula professor amb calaixos", image: url + "DSC_5345.png", description: "Taula destinada al professorat amb calaixos per a emmagatzemament de materials.", category: categories[11]._id });
       await Material.create({ name: "taula gran color fusta", image: url + "DSC_5346.png", description: "Taula de grans dimensions amb acabat en color fusta, ideal per a reunions o presentacions.", category: categories[11]._id });
       await Material.create({ name: "armari obert 3 estanteries", image: url + "DSC_5347.png", description: "Armari obert amb tres prestatgeries per a una exposició ordenada i accessible.", category: categories[14]._id });
       await Material.create({ name: "cadira alumne color fusta", image: url + "DSC_5348.png", description: "Cadira de color fusta dissenyada per a ús dels alumnes, còmoda i resistenta.", category: categories[12]._id });
       await Material.create({ name: "armari de ferro", image: url + "DSC_5349.png", description: "Armari fabricat en ferro per a una major durabilitat i resistència.", category: categories[14]._id });
       await Material.create({ name: "taula alumne color fusta", image: url + "DSC_5350.png", description: "Taula de color fusta destinada a ús dels alumnes, pràctica i funcional.", category: categories[11]._id });
       await Material.create({ name: "cadira blanca amb rodes", image: url + "DSC_5351.png", description: "Cadira de color blanc amb rodes per a una mobilitat fàcil i versàtil.", category: categories[12]._id });
       await Material.create({ name: "taula gran color fusta", image: url + "DSC_5352.png", description: "Taula de grans dimensions amb acabat en color fusta, ideal per a reunions o presentacions.", category: categories[11]._id });
       await Material.create({ name: "cadira plastic gris", image: url + "DSC_5353.png", description: "Cadira fabricada en plàstic de color gris, lleugera i fàcil de netejar.", category: categories[12]._id });
       await Material.create({ name: "cadira alumne verda", image: url + "DSC_5355.png", description: "Cadira de color verd destinada a ús dels alumnes, còmoda i moderna.", category: categories[12]._id });
       await Material.create({ name: "taula alumne verda", image: url + "DSC_5356.png", description: "Taula de color verd destinada a ús dels alumnes, pràctica i funcional.", category: categories[11]._id });
       await Material.create({ name: "cadira professor negra", image: url + "DSC_5358.png", description: "Cadira de color negre dissenyada per al professorat, elegant i ergonòmica.", category: categories[12]._id });
       await Material.create({ name: "cadira plastic blava", image: url + "DSC_5363.png", description: "Cadira fabricada en plàstic de color blau, lleugera i fàcil de netejar.", category: categories[12]._id });
       await Material.create({ name: "taula alumne color fusta", image: url + "DSC_5365.png", description: "Taula de color fusta destinada a ús dels alumnes, pràctica i funcional.", category: categories[11]._id });
       await Material.create({ name: "cadira alumne color fusta", image: url + "DSC_5370.png", description: "Cadira de color fusta destinada a ús dels alumnes, còmoda i resistenta.", category: categories[12]._id });
       await Material.create({ name: "cadira alumne verda", image: url + "DSC_5376.png", description: "Cadira de color verd destinada a ús dels alumnes, còmoda i moderna.", category: categories[12]._id });
       await Material.create({ name: "banc verd", image: url + "DSC_5381.png", description: "Banc de color verd, ideal per a zones d'esbarjo o exteriors.", category: categories[15]._id });
       await Material.create({ name: "cadira blava amb rodes", image: url + "DSC_5383.png", description: "Cadira de color blau amb rodes per a una mobilitat fàcil i versàtil.", category: categories[12]._id });
       await Material.create({ name: "cadira professor negra", image: url + "DSC_5385.png", description: "Cadira de color negre dissenyada per al professorat, elegant i ergonòmica.", category: categories[12]._id });
       await Material.create({ name: "cadira professor blava", image: url + "DSC_5401.png", description: "Cadira de color blau dissenyada per al professorat, elegant i ergonòmica.", category: categories[12]._id });
       await Material.create({ name: "armari llarg dos portes", image: url + "DSC_5424.png", description: "Armari llarg amb dues portes per a un emmagatzemament ampli i ordenat.", category: categories[14]._id });
      
      mongoose.connection.close();

   }
   catch (error) {
       console.log(error);
   }
}  




seeder();