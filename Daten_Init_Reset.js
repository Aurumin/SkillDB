if (typeof localStorage === "undefined" || localStorage === null) {
	var LocalStorage = require('node-localstorage').LocalStorage;
	localStorage = new LocalStorage('./DB');
}
// localStorage.setItem('myFirstKey', JSON.stringify(Obj));
// var Aufruf0 = localStorage.getItem('myFirstKey');
// var Aufruf1 = JSON.parse(Aufruf0); // Von String in Object verwandeln


// // general settings

// Beispiels Datensatz:
var Beispiel = 1;

// //

var Users = [{
        Email: "Soyoon.Choi@code.berlin",
        Name: "",
        PW: "password",
        ID: 0,
        Skills: [
            ["Data Analysis", 0, 3],
            ["Video", 2, 2],
            ["NOSQL", 1, 3],
            ["Business Scaling", 3, 3],
            ["Functional Programming", 2, 3]
        ],
        ST: "Student",
        Department: "Interaction Desgin",
        SlackID: "",
        Semester: 0,
        Photo: ""
    },
    {
        Email: "ChungLeng.EA@code.berlin",
        Name: "",
        PW: "password",
        ID: 1,
        Skills: [
            ["Relational Database", 0, 3],
            ["NOSQL", 2, 2],
            ["Version Control", 1, 3],
            ["Mobile Development", 3, 3]
        ],
        ST: "Student",
        Department: "Product Management",
        SlackID: "",
        Semester: 0,
        Photo: ""
    },
    {
        Email: "Soeren.Groebke@code.berlin",
        Name: "",
        PW: "password",
        ID: 2,
        Skills: [
            ["Web Technology", 0, 3],
            ["Natural Language Processing", 2, 2],
            ["AR & VR", 1, 3],
            ["Animation", 3, 3]
        ],
        ST: "Student",
        Department: "Interaction Desgin",
        SlackID: "",
        Semester: 0,
        Photo: ""
    },
    {
        Email: "Philipp.Friebertshaeuser@code.berlin",
        Name: "",
        PW: "password",
        ID: 3,
        // Skills: []
        Skills: [
            ["Info Graphics", 0, 3],
            ["Cryptography", 2, 2],
            ["Interpreted Programming", 1, 3],
            ["Hardware", 3, 3],
            ["Internet of Things IoT", 3, 3]
        ],
        ST: "Student",
        Department: "Software Engineer",
        SlackID: "",
        Semester: 0,
        Photo: ""
    },
    {
        Email: "Heiko.Damaske@code.berlin",
        Name: "",
        PW: "abcde",
        ID: 4,
        Skills: [
            ["Robotics", 0, 3],
            ["Software Modeling", 2, 2],
            ["Image Processing", 1, 3],
            ["Screen Design", 3, 3],
            ["Object-Oriented Programming", 3, 3]
        ],
        ST: "Student",
        Department: "Product Management",
        SlackID: "",
        Semester: 0,
        Photo: ""
    },
    {
        Email: "Alexander.Boeckle@code.berlin",
        Name: "",
        PW: "password",
        ID: 5,
        Skills: [
            ["Animation", 0, 3],
            ["Relational Database", 2, 2],
            ["Cryptography", 1, 3],
            ["Robotics", 3, 3]
        ],
        ST: "Student",
        Department: "SE",
        SlackID: "",
        Semester: 0,
        Photo: ""
    }
];

Users = Users_initen(Users);

var Email_list = ["Soyoon.Choi@code.berlin",
"ChungLeng.EA@code.berlin",
"Soeren.Groebke@code.berlin",
"Philipp.Friebertshaeuser@code.berlin",
"Heiko.Damaske@code.berlin",
"Alexander.Boeckle@code.berlin"
];

var Verfuegbare_Skills_SE = ["Cryptography",
 "Blockchain",
 "Big Data",
 "Data Science",
 "Parallel Computing",
 "Distributed Computing Architecture",
 "Inter Process Programming",
 "Build Automation Deployment",
 "Continuous Integration",
 "Mobile Development",
 "Web Technology",
 "Image Processing",
 "2D/3D Rendering",
 "Natural Language Processing",
 "Machine Learning",
 "Robotics",
 "Internet of Things IoT",
 "Operation Systems",
 "Hardware",
 "Automated Software Testing",
 "Security Architecture",
 "Security Analysis & Testing",
 "Software Modeling",
 "Software Design Patterns",
 "Issue Management",
 "Technical Documentation",
 "Version Control",
 "NOSQL",
 "DB Architecture",
 "Relational Databases",
 "Functional Programming",
 "Interpreted Programming",
 "Multi-Paradigm Programming",
 "Object-Oriented Programming",
 "Algorithms & Linear Algebra",
 "Web, Network & Data Exchange",
 "Basic Programming & Control Structures",
 "\0"];
var Verfuegbare_Skills_PM = ["Risk Assessment & Management",
 "Financial Planning",
 "Business Scaling",
 "Consumer Psychology",
 "Negotiation",
 "Intercultural Management",
 "Application Integration Management",
 "Partnership Management",
 "Go-To-Market Strategy",
 "Leadership",
 "Product Vision & Goal Setting",
 "Portfolio & Roadmap Management",
 "Product Lifecycle Management",
 "Launch Management & Rolloutplanning",
 "Non-Agile Process Management",
 "Agile Project Management",
 "Product Definition",
 "Product Innovation",
 "Backlog Management",
 "Requirements Engineering",
 "Pricing & Revenue Modeling",
 "Performance Marketing",
 "Organic Marketing",
 "Product Communication & Positioning",
 "KPI Definition & Controlling",
 "Data Analysis",
 "Competitor Research",
 "Market Research",
 "Customer Discovery",
 "Product Presentation & Pitching",
 "Stakeholder Communication",
 "\0"];
var Verfuegbare_Skills_ID = ["Design Strategy",
 "Responsive Design",
 "Video",
 "Designing AR/VR",
 "Navigation Design",
 "Sound Design",
 "Voice Control",
 "Conversational Interfaces",
 "Ubiquitous Computing",
 "Interactive Environments",
 "Control Elements",
 "Sensors in Devices",
 "Physical Computing",
 "Sketching with Hardware",
 "Infographics",
 "3D Design",
 "Animation",
 "Brand Design",
 "Design Psychology",
 "Design Methodologies & Methods",
 "Field Research",
 "Visions and Foresight",
 "Design History",
 "Design Systems",
 "Screen Design",
 "Editorial Design",
 "Data Visualization",
 "Generative Design",
 "Photography",
 "Image Composition"];

var Dict_Skills_Department = Dict_Skills_Department_fkt(Verfuegbare_Skills_SE,Verfuegbare_Skills_PM,Verfuegbare_Skills_ID);

function Dict_Skills_Department_fkt(Verfuegbare_Skills_SE,Verfuegbare_Skills_PM,Verfuegbare_Skills_ID){
    var Dict_Skills_Department ={};
    for (var i=0; i<Verfuegbare_Skills_SE.length-1; i++){
        Dict_Skills_Department[Verfuegbare_Skills_SE[i]] = ["SE","CF"];
    }
    for (var i=0; i<Verfuegbare_Skills_PM.length-1; i++){
        Dict_Skills_Department[Verfuegbare_Skills_PM[i]] = ["PM","CF"];
    }
    for (var i=0; i<Verfuegbare_Skills_ID.length; i++){
        Dict_Skills_Department[Verfuegbare_Skills_ID[i]] = ["ID","CF"];
    }
    return Dict_Skills_Department;
}


var Verfuegbare_Skills = JOIN(Verfuegbare_Skills_SE, Verfuegbare_Skills_PM, Verfuegbare_Skills_ID);

function JOIN(Verfuegbare_Skills_SE, Verfuegbare_Skills_PM, Verfuegbare_Skills_ID) {
    var Verfuegbare_Skills = [];
    for (var i = 0; i < Verfuegbare_Skills_SE.length; i++) {
        Verfuegbare_Skills.push(Verfuegbare_Skills_SE[i]);
    }
    for (var i = 0; i < Verfuegbare_Skills_PM.length; i++) {
        Verfuegbare_Skills.push(Verfuegbare_Skills_PM[i]);
    }
    for (var i = 0; i < Verfuegbare_Skills_ID.length; i++) {
        Verfuegbare_Skills.push(Verfuegbare_Skills_ID[i]);
    }
    return Verfuegbare_Skills;
}

if (Beispiel == 0){
    var Users = Users_initen_Email(Email_list);
}
Verfuegbare_Skills_nach_Klasse= [Verfuegbare_Skills_SE,Verfuegbare_Skills_PM,Verfuegbare_Skills_ID];
var DB_Objekte = [Users, Verfuegbare_Skills, Verfuegbare_Skills_nach_Klasse, Dict_Skills_Department];

localStorage.setItem('DB_Objekte', JSON.stringify(DB_Objekte));


// Funktions
function PW_generator(ID){
    var Numberpw = String(Math.pow((ID + 5),Math.PI));
    var Password = "";
    var i = 0;
    var war = false;
    while (true){
        if (Numberpw[i-1]=="." && war == false){
            war = true;
        }
        if (war == true){
            Password=Password+Numberpw[i];
        }
        if (Password.length>=7){
            break;
        }
        i++;
    }
    return Password;
}
function Name(name) {
    Vorname = "";
    Nachname = "";
    var v = true;
    var Jetzt_punkt = 0;
    for (var i = 0; i < name.length; i++) {
        if (name[i] == ".") {
            v = false;
            Jetzt_punkt = 1;
        }
        if (name[i] == "@") {
            break;
        }

        if (v && Jetzt_punkt == 0) {
            Vorname = Vorname + name[i];
        } else if (Jetzt_punkt == 0) {
            Nachname = Nachname + name[i];
        }
        Jetzt_punkt = 0;
    }
    var Name_v_n = [];
    Vorname = replaceAt(Vorname, 0, Vorname[0].toUpperCase());
    Nachname = replaceAt(Nachname, 0, Nachname[0].toUpperCase());
    Name_v_n.push(Vorname);
    Name_v_n.push(Nachname);
    var VN_Name= Vorname+" "+Nachname;
    return VN_Name;
}

function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}

function Users_initen(Users){
    for (var i=0; i<Users.length; i++){
        Users[i].Name = Name(Users[i].Email);
        // Users[i].PW = "password";
        Users[i].PW = PW_generator(Users[i].ID);
        Users[i].ST = "Student";
        Users[i].Department = "SE";
        Users[i].SlackID = "";
        Users[i].Semester = 0;
        Users[i].Photo = "";
    }
    return Users;
}

function Users_initen_Email(Email_list){
    for (var i=0; i<Email_list.length; i++){
        Users[i].Email = Email_list[i]
        Users[i].Name = Name(Email_list[i]);
        Users[i].PW = PW_generator(i);
        // Users[i].PW = "password";
        Users[i].ID = i;
        Users[i].Skills =[];
        Users[i].ST = "Student";
        Users[i].Department = "SE";
        Users[i].SlackID = "";
        Users[i].Semester = 0;
        Users[i].Photo = "";
    }
    return Users;
}
