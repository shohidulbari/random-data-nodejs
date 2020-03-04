const casual = require('casual');
const Chance = require('chance');
const chance = new Chance();
const faker = require('faker');
const random = require('random');
const callfor = require('callfor');
const _ = require('lodash');


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

const sampleDataSet = () => {
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
      let resp = await callfor('http://localhost:7000/candidate', {
          method: 'POST',
          body: JSON.stringify(sampleDataSet()),
          headers: { 'Content-Type': 'application/json' }
      });
      console.log(resp);
  } 
}catch(e){
    console.log(e);
  }
})();