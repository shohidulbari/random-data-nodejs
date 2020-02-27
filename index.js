const pdfLib = require('pdf-lib');
const Hapi = require('hapi');
const pg = require('pg');
const casual = require('casual');
const Chance = require('chance');
const chance = new Chance();
const faker = require('faker');
const random = require('random');
const fetch = require("node-fetch");
const fs = require('fs');
const _ = require('lodash');


const server = new Hapi.Server({ 
  host: 'localhost', 
  port: 3101, 
}); const launch = async () => {
  try { 
      await server.start(); 
  } catch (err) { 
      console.error(err);
      process.exit(1); 
  }; 
  console.log(`Server running at ${server.info.uri}`);
}

const config = {
  client: 'pg',
  version: '7.12.1',
  connection: {
    host : process.env.POSTGRES_HOST,
    user : process.env.POSTGRES_USERNAME,
    password : process.env.POSTGRES_PASSWORD,
    database : process.env.POSTGRES_DATABASE
  }
}

const knex = require('knex')(config);

// const jobPayload = Joi.object().keys({
//   Name_En: Joi.string().required(),
//   Name_Bn: Joi.string().allow(null),
//   OrganizationID: Joi.number().required(),
//   Code: Joi.string().required()
// })

// const countryPayload = Joi.object().keys({
//   Code: Joi.string().length(3).required(),
//   Name_En: Joi.string().required(),
//   Name_Bn: Joi.string().required(),
//   OrganizationID: Joi.number().required()
// })

// const companyPayload = Joi.object().keys({
//   Name: Joi.string().required(),
//   OrganizationID: Joi.number().required(),
//   CountryCode: Joi.string().required()
// })

// exports.vacancyInput = Joi.object().keys({
//   VacancyName: Joi.string().required(),
//   CountryID: Joi.number().required(),
//   CompanyID: Joi.number().required(),
//   OrganizationID: Joi.number().required(),
//   VacancyJob: Joi.array().items(Joi.object().keys({
//       JobID: Joi.number().required(),
//       NumberOfVacancies: Joi.number().required(),
//       Salary: Joi.number().required()
//   })).min(1).required()
// });

const generateVacancy = () => {
  return {
    "VacancyName" : casual.title,
    "CountryID" : random.int(min=18, max=30),
    "CompanyID" : random.int(min=12, max=24),
    "OrganizationID": 1,
    "VacancyJob": [
      {
        "JobID" : random.int(min=18, max=30),
        "NumberOfVacancies": random.int(min=10, max=30),
        "Salary": random.int(min=30000, max=60000)
      },
      {
        "JobID" : random.int(min=18, max=30),
        "NumberOfVacancies": random.int(min=10, max=30),
        "Salary": random.int(min=30000, max=60000)
      },
      {
        "JobID" : random.int(min=18, max=30),
        "NumberOfVacancies": random.int(min=10, max=30),
        "Salary": random.int(min=30000, max=60000)
      }
    ]
  }
}

const generateJob = () => {
  return {
    "Name_En": casual.title,
    "Name_Bn": casual.title,
    "OrganizationID": 1,
    "Code": chance.string({length:5})
  }
}

const generateCountry = () => {
  return {
    "Code" : chance.string({length:3}),
    "Name_En": casual.country,
    "Name_Bn": casual.country,
    "OrganizationID": 1
  }
}

const generateCompany = () => {
  return {
    "Name" : casual.company_name,
    "OrganizationID" : 1,
    "CountryCode": chance.string({length:3}) 
  }
}
let genders = ['male', 'female'];
let mobile = ['01725593281', '01903701629', '01728082086', '07768473060'];
let religion = ["Islam", "Hindu", "Buddha", "Christian", "Others"];
let maritalStatus = ["Married", "Unmarried", "Devorced"];
let birthplace = ["Dhaka", "Rajshahi", "Khulna", "Chittagang", "Barishal", "Sylect", "Mymensingh"];
let birthdate = ['01-07-1992', '02-10-1994', '02-08-1995', '01-07-1993', '02-10-1993', '02-09-1990'];
let expiredate = ['01-07-2031', '02-10-2032', '02-11-2033', '01-07-2034', '02-10-2035', '02-09-2036'];
let reallyExpire = ['01-07-2017', '02-10-2018', '02-03-2019', '01-07-2018', '02-10-2015', '02-20-2017'];
let issuedate = ['01-07-2019', '02-10-2019', '02-02-2019', '01-07-2019', '02-10-2019', '02-06-2019'];
let passportNumber = ["SBR14030", "SBR14031", "SBR14032","SBR14033", "SBR14034", "SBR14035","SBR14036", "SBR14037", "SBR14038","SBR14039", "SBR14040", "SBR14041"];
let firstName = ["Rabiul", "Saleheen", "Mofidul", "Abdul", "Lingkon", "Kabir", "Indro", "Rashed", "Mir", "Snigdha"];
let lastName = ["Islam", "Khan", "Islam", "Momin", "Talukdar", "Hossen", "Jeet Chondra", "Islam", "Parvej", "Tahrim"];
let source = ["walking", "mobileweb", "agent"];
let agent = ["1", "2", "3"];

const genarateCandidate = () => {
  return {
      "FirstName": _.sample(firstName),
      "LastName": _.sample(lastName),
      "FatherName": casual.full_name,
      "MotherName": casual.full_name,
      "DateOfBirth": _.sample(birthdate),
      "NationalIdNumber": casual.card_number(),
      "PresentAddress": casual.address,
      "PermanentAddress": casual.address,
      "Religion" : _.sample(religion),
      "MaritalStatus" : _.sample(maritalStatus),
      "BirthPlace" : _.sample(birthplace),
      "ContactNumber": _.sample(mobile),
      "Gender": _.sample(genders),
      "Height": random.float(min = 1, max = 2),
      "Weight": random.float(min = 40, max = 100),
      "PresentWork": casual.title,
      "PresentWorkPlace": casual.company_name,
      "AppliedJobsList": [
        random.int(min=18, max=30)
      ],
      "ExpectedCountryList": [
        random.int(min=18, max=30)
      ],
      "PassportDetails": {
        "PassportNumber": _.sample(passportNumber),
        "IssueDate": _.sample(issuedate),
        "IssuePlace": casual.city,
        "DateOfExpiry": _.sample(expiredate),
        "ProfessionAsPassport": casual.title
      },
      "ExpectedSalary": random.int(min=10000, max = 100000),
      "ExperienceInAbroad": casual.text,
      "ExperienceDuration": casual.text,
      "Source": _.sample(source),
      "AgentID": _.sample(agent)
  };
}


(async () => {
  try{
    
    for(let i=0; i<200; i++){
    let candidateInsertUrl = "http://localhost:7001/peoplepower/api/v1/candidate";
    //   let countryInsertUrl = "http://localhost:7001/peoplepower/api/v1/country";
    //   let companyInsertUrl = "http://localhost:7001/peoplepower/api/v1/company";
    //   let jobInsertUrl = "http://localhost:7001/peoplepower/api/v1/job";
    //   let vacancyInsertUrl = "http://localhost:7001/peoplepower/api/v1/vacancy";

    let ID = await fetch(candidateInsertUrl, {
        method: 'POST',
        body: JSON.stringify(genarateCandidate()),
        headers: { 'Content-Type': 'application/json' }
    });
    
  } 
}catch(e){
    console.log(e);
  }
})();

launch();