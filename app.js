// // External dependencies
// const express = require("express");
// const mongoose = require("mongoose");
//
// // Internal dependencies
// const keys = require("./config/keys");
//
// // Connect to the database
// mongoose.connect(
//   keys.mongoURL,
//   { useNewUrlParser: true }
// );
//
// // Start app with express
// const app = express();
//
// module.exports = app;


// app.get('/api/hello', Fkt)
//
// function Fkt(req,res){
//   res.json({ express: 'Backened'});
// }


// laod Modules, Frameworks ...
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");


// // General Settings

// Activate Database Mode (keyword "active" or else)
var Database_update_status = "active";

// Database saving mode (Database_saving_mode keyword: "onTime" or "onChange" )
var Database_saving_mode = "onChange";
var Interval = 30;
var Last = Date.now();

// Prepare Frameworks
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/api/hello', Fkt)

function Fkt(req,res){
  res.json({ express: 'Backened'});
}

// Load Database
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./DB');
}
var DB_Objekte = JSON.parse(localStorage.getItem('DB_Objekte'));

var Users = DB_Objekte[0];
var Verfuegbare_Skills = DB_Objekte[1];
var Verfuegbare_Skills_SE = DB_Objekte[2][0];
var Verfuegbare_Skills_PM = DB_Objekte[2][1];
var Verfuegbare_Skills_ID = DB_Objekte[2][2];
var Dict_Skills_Department = DB_Objekte[3];


// Define the Routes // Define the Routes // Define the Routes // Define the Routes // Define the Routes // Define the Routes

// Rendert Login-Startseite
app.get("/", Login);

// Rendert Searchbar
app.get("/Search", Search);

// Rendert Searchbar
app.get("/Profile/Account", Account);

// Rendert das persönliche Profil
app.get("/Profile", profile);

//
app.get("/Profile/BasicInfo", BasicInfo);

app.get("/Profile/MySkills", MySkills);


app.get("/Admin", Admin);
app.get("/Admin/UserList", UserList);
app.get("/Admin/Delete", AdminDelete);
app.post("/Admin/Delete", AdminDelete_p);


// Bekommt bestätigten Suchbegriff aus Searchbar
app.post("/Search", Search_p);

//
app.post("/Account_p_name", Account_p_name);
app.post("/Account_p_pw", Account_p_pw);

app.post("/BasicInfo_Status", BasicInfo_Status_p);
app.post("/BasicInfo_Department", BasicInfo_Department_p);
app.post("/BasicInfo_Semester", BasicInfo_Semester_p);
app.post("/BasicInfo_SlackID", BasicInfo_SlackID_p);

app.post("/Profile/MySkills/Delete", Delete_p);
app.post("/Profile/MySkills/AddSkill", AddSkill_p);
app.post("/Profile/MySkills/AddNewSkill", AddNewSkill_p);

// Checkt ob Login Daten valide sind. Bekommt LoginDaten von / Seite
app.post("/Profile", Profile_p);

// Ungültige Route
app.get("*", Nothing);



// Setup Server
app.listen(5000, function () {
    console.log("Server has started!");
});


var Name_v = null;
var Pruefung = [null, false];

// Callbacks Routes // Callbacks Routes // Callbacks Routes // Callbacks Routes // Callbacks Routes // Callbacks Routes

function Nothing(req, res) {
    console.log("Keine!");
    res.send("Here is nothing!");
}

function Login(req, res) {
    Name_v = null;
    Pruefung = [null, false];
    res.render("Login.ejs");
    console.log("Login!");
}

function profile(req, res) {
    // if (Name_v == null || !Pruefung[1]) {
    //     res.send("ACCESS NOT ALLOWED!!!");
    // }
    console.log("Profile!");
    res.json({
        User: Users[Pruefung[0]], // Ein Element aus Users, derjenige der sich erfolgreich eingeloggt hat
        Profile_Skills_mit_Department: Profile_Skills_mit_Department(Dict_Skills_Department, Users),
        Profile_Skills_mit_Department_all: Profile_Skills_mit_Department_all(Dict_Skills_Department, Users)

    });
}

function Profile_p(req, res) {
    console.log("Profile_p!");

    var EMAIL = req.body.EMAIL;
    var PW = req.body.PW;
    console.log("_______Body_______");
    console.log(req.body);

    // Pruefung [ID,Zungang->Ja/Nein]
    Pruefung = Anmeldung_Ueberpruefen(EMAIL, PW);

    var Zugang = 1;
    if (EMAIL.toLowerCase() == "admin" && PW == "group13") {
        IDi = -1;
        Zugang = 2;
        Pruefung = [IDi, Zugang];
        Name_v = "Admin";
    }

    console.log("_______Pruefung_______");
    console.log(Pruefung);
    if (Pruefung[1] == true && Zugang != 2) {
        Name_v = Users[Pruefung[0]].Name;
        Aktueller_Nutzer_ID = Pruefung[0];
        res.redirect("http://localhost:3000/");
        console.log("Profile! Zugang gewährt");
    } else if (Zugang == 2) {
        res.redirect("/Admin");
    } else {
        console.log("Profile! Zugang NICHT! gewährt");
        res.redirect("/");
    }
}

function Search(req, res) {
    // if (Name_v == null || !Pruefung[1]) {
    //     res.send("ACCESS NOT ALLOWED!!!");
    // }
    console.log("Search!");

    var Verfuegbare_Skills_sub = JSON.parse(JSON.stringify(Verfuegbare_Skills));
    var cc = 0;
    while (Verfuegbare_Skills_sub[cc] != null) {
        if (Verfuegbare_Skills_sub[cc] == "\0" || Verfuegbare_Skills_sub[cc] == " " || Verfuegbare_Skills_sub[cc] == "  ") {
            Verfuegbare_Skills_sub.splice(cc, 1);
        }
        cc++;
    }

    res.render("Searchbar.ejs", {
        Name_v: Name_v,
        Users: Users,
        Verfuegbare_Skills: Verfuegbare_Skills_sub
    });
}

function Search_p(req, res) {
    console.log("Search_p!");
    console.log(req.body);
    var Suchbegriff = req.body.Suchbegriff;
    var Match_IDs = Search_User_Skills(Users, Suchbegriff);
    if (Suchbegriff == "*" || Suchbegriff.toLowerCase() == "all" || Suchbegriff.toLowerCase() == "alle") {
        Match_IDs = [...Array(Users.length).keys()]; // Array von 0:1:Users.length
    }
    console.log("_________________Match_IDs_____________");
    console.log(Match_IDs);

    var Namen = [];
    var P = [];
    for (var i = 0; i < Match_IDs.length; i++) {
        Namen.push(Users[Match_IDs[i]].Name);
        P.push(Users[Match_IDs[i]]);
    }

    res.render("Searchbar.ejs", {
        P: P, // Profile die mit Suchbegriff ein Match haben--> Aufbau des Objektes: siehe in "Daten_init.js"
        Users: Users,
        Namen: Namen, // Liste mit n Namen, die jeweils ein Match haben mit dem Suchbegriff ("Vorname Nachname") aus P extrahiert
        Suchbegriff: Suchbegriff, // Object: Ein String
        Name_v: Name_v,
        Verfuegbare_Skills: Verfuegbare_Skills
    });
}


function Account(req, res) {
    // if (Name_v == null || !Pruefung[1]) {
    //     res.send("ACCESS NOT ALLOWED!!!");
    // }
    console.log("Account!");
    res.render("Account.ejs", {
        User: Users[Pruefung[0]]
    });
}

function Account_p_name(req, res) {
    console.log("Account_p_name!");
    var NewName = req.body.NAME;
    Users[Pruefung[0]].Name = NewName;
    Database_update();
    res.redirect("/Profile/Account");
}

function Account_p_pw(req, res) {
    console.log("Account_p_pw!");
    var PW1 = req.body.PW1;
    var PW2 = req.body.PW2;

    if (PW1 === PW2) {
        Users[Pruefung[0]].PW = PW1;
    }
    Database_update();
    res.redirect("/Profile/Account");
}

function BasicInfo(req, res) {
    // if (Name_v == null || !Pruefung[1]) {
    //     res.send("ACCESS NOT ALLOWED!!!");
    // }
    // console.log("BasicInfo!");
    res.render("BasicInfo.ejs", {
        User: Users[Pruefung[0]]
    });
}


function BasicInfo_Status_p(req, res) {
    console.log("BasicInfo_Status_p!");
    var stat = req.body.STATUS;
    Users[Pruefung[0]].ST = stat;
    Database_update();
    res.redirect("/Profile/BasicInfo");
}

function BasicInfo_Department_p(req, res) {
    console.log("BasicInfo_Department_p!");
    var stat = req.body.DEPARTMENT;
    Users[Pruefung[0]].Department = stat;
    Database_update();
    res.redirect("/Profile/BasicInfo");
}

function BasicInfo_Semester_p(req, res) {
    console.log("BasicInfo_Semester_p!");
    var stat = req.body.SEMESTER;
    Users[Pruefung[0]].Semester = stat;
    Database_update();
    res.redirect("/Profile/BasicInfo");
}

function BasicInfo_SlackID_p(req, res) {
    console.log("BasicInfo_SlackID!");
    var stat = req.body.SLACKID;
    Users[Pruefung[0]].SlackID = stat;
    Database_update();
    res.redirect("/Profile/BasicInfo");
}

function MySkills(req, res) {
    // if (Name_v == null || !Pruefung[1]) {
    //     res.send("ACCESS NOT ALLOWED!!!");
    // }
    console.log("MySkills!");
    res.render("MySkills.ejs", {
        User: Users[Pruefung[0]],
        SV: Verfuegbare_Skills
    });
}

function Delete_p(req, res) {
    console.log("Delete_p!");
    Users[Pruefung[0]].Skills.splice(req.body.On,1);
    Database_update();
    res.redirect("/Profile/MySkills");
}

function AddSkill_p(req, res) {
    console.log("AddSkill_p!");
    var SE_Skill = req.body.SE;
    var PM_Skill = req.body.PM;
    var ID_Skill = req.body.ID;

    var Skill_level = req.body.Skill_level;
    var Will_level = req.body.Will_level;

    if (SE_Skill !== "-") {
        if (!Schon_Da_Profile(SE_Skill, Users[Pruefung[0]].Skills)) {
            Users[Pruefung[0]].Skills.push([SE_Skill, Skill_level, Will_level]);
            console.log(Users[Pruefung[0]]);
        }
    }
    if (PM_Skill !== "-") {
        if (!Schon_Da_Profile(PM_Skill, Users[Pruefung[0]].Skills)) {
            Users[Pruefung[0]].Skills.push([PM_Skill, Skill_level, Will_level]);
        }
    }
    if (ID_Skill !== "-") {
        if (!Schon_Da_Profile(ID_Skill, Users[Pruefung[0]].Skills)) {
            Users[Pruefung[0]].Skills.push([ID_Skill, Skill_level, Will_level]);
        }
    }
    Database_update();
    res.redirect("/Profile/MySkills");
}

function AddNewSkill_p(req, res) {
    console.log("AddNewSkill_p!");
    console.log(req.body.NEW_SKILL);

    var Ja = Schon_Da(req.body.NEW_SKILL, Verfuegbare_Skills);

    if (!Ja) {
        var New_Skill = req.body.NEW_SKILL;
        var Auswahl_Klasse = req.body.AUSWAHL_DEPARTMENT;
        if (Auswahl_Klasse == "SE") {
            Verfuegbare_Skills_SE[Verfuegbare_Skills_SE.length - 1] = New_Skill;
            Verfuegbare_Skills_SE.push("\0");
            Dict_Skills_Department[New_Skill] = [Auswahl_Klasse, "NEW"];
        } else if (Auswahl_Klasse == "PM") {
            Verfuegbare_Skills_PM[Verfuegbare_Skills_PM.length - 1] = New_Skill;
            Verfuegbare_Skills_PM.push("\0");
            Dict_Skills_Department[New_Skill] = [Auswahl_Klasse, "NEW"];
        } else if (Auswahl_Klasse == "ID") {
            Verfuegbare_Skills_ID[Verfuegbare_Skills_ID.length] = New_Skill;
            Dict_Skills_Department[New_Skill] = [Auswahl_Klasse, "NEW"];
        } else {
            console.log("IrgendeinFEhler!!!!!!!!!!");
        }
        Database_update();
    }
    res.redirect("/Profile/MySkills");

}


function Admin(req, res) {
    // if (Name_v == null || !Pruefung[1]) {
    //     res.send("ACCESS NOT ALLOWED!!!");
    // }
    console.log("Admin!");
    res.render("Admin.ejs");
}

function UserList(req, res) {
    // if (Name_v == null || !Pruefung[1]) {
    //     res.send("ACCESS NOT ALLOWED!!!");
    // }
    console.log("UserList!");
    res.render("UserList.ejs", {
        Users: Users
    });
}

function AdminDelete(req, res) {
    // if (Name_v == null || !Pruefung[1]) {
    //     res.send("ACCESS NOT ALLOWED!!!");
    // }
    console.log("AdminDelete!");
    console.log(Dict_Skills_Department);
    res.render("AdminDelete.ejs", {
        Users: Users,
        SV: Verfuegbare_Skills,
        Dict_Skills_Department: Dict_Skills_Department
    });
}

function AdminDelete_p(req, res) {
    var SE_Skill_Delete = req.body.SE;
    var PM_Skill_Delete = req.body.PM;
    var ID_Skill_Delete = req.body.ID;

    console.log("AdminDelete_p!");
    console.log(req.body);

    if (SE_Skill_Delete != "-") {
        Verfuegbare_Skills_SE.splice(Verfuegbare_Skills_SE.indexOf(SE_Skill_Delete), 1);
        Users = AdminDeleteUserSkill(SE_Skill_Delete);
    }
    if (PM_Skill_Delete != "-") {
        Verfuegbare_Skills_PM.splice(Verfuegbare_Skills_PM.indexOf(PM_Skill_Delete), 1);
        Users = AdminDeleteUserSkill(PM_Skill_Delete);
    }
    if (ID_Skill_Delete != "-") {
        Verfuegbare_Skills_ID.splice(Verfuegbare_Skills_ID.indexOf(ID_Skill_Delete), 1);
        Users = AdminDeleteUserSkill(ID_Skill_Delete);
    }

    Database_update();
    res.redirect("/Admin/Delete");
}

function AdminDeleteUserSkill(Dep_Skill_Delete) {
    for (var j=0; j<Users.length; j++) {
        var Loeschen = [];

        for (var k=0; k<Users[j].Skills.length; k++){
            if (Users[j].Skills[k][0]==Dep_Skill_Delete){
                Loeschen.push(k);

            }
        }
        Loeschen.sort(function(a, b){return b-a;});
        for (var i = 0 ; i<Loeschen.length; i++) {
            Users[j].Skills.splice(Loeschen[i],1);
        }
    }
    return Users;
}

// Nicht Callback-Funktionen // Nicht Callback-Funktionen // Nicht Callback-Funktionen // Nicht Callback-Funktionen

function Anmeldung_Ueberpruefen(EMAIL, PW) {
    var Zugang = false;
    var IDi;
    var Return = [];
    for (var i = 0; i < Users.length; i++) {

        if (Users[i].Email.toLowerCase() == EMAIL.toLowerCase() && Users[i].PW == PW) {
            Zugang = true;
            IDi = Users[i].ID;
        }
    }

    Return.push(IDi);
    Return.push(Zugang);
    return Return;
}

function Search_User_Skills(Users, Suchbegriff) {
    var Match_IDs = [];
    for (var i = 0; i < Users.length; i++) {
        var Match2 = Suche_Robust2(Users[i].Name, Suchbegriff);
        for (var k = 0; k < Users[i].Skills.length; k++) {
            var Match = Suche_Robust2(Users[i].Skills[k][0], Suchbegriff);

            if (Match || Match2) {
                Match_IDs.push(Users[i].ID);
                Match2 = false;
            }
        }
    }
    Match_IDs = Array.from(new Set(Match_IDs));
    return Match_IDs;
}


function Suche_Robust2(A, B) {
    // Leerzeichen,Sonderzeichen usw entfernen
    var Entfernen = [" ", "-", "_", "+", ",", ".", ";", "'", "#", '"', "?", "!", "%", "&"];
    var A_Alt;
    var B_Alt;
    for (var j = 0; j < Entfernen.length; j++) {
        while (true) {
            A_Alt = A;
            B_Alt = B;
            A = A.replace(Entfernen[j], "");
            B = B.replace(Entfernen[j], "");
            if (A_Alt == A && B_Alt == B) {
                break;
            }
        }
    }

    // Buchstaben ersetzen
    var Ersetzen = [
        ["ö", "oe"],
        ["ä", "ae"],
        ["ü", "ue"],
        ["ß", "ss"]
    ];
    for (var jj = 0; jj < Ersetzen.length; jj++) {
        while (true) {
            A_Alt = A;
            B_Alt = B;
            A = A.replace(Ersetzen[jj][0], Ersetzen[jj][1]);
            B = B.replace(Ersetzen[jj][0], Ersetzen[jj][1]);
            if (A_Alt == A && B_Alt == B) {
                break;
            }
        }
    }

    // alles klein
    A = A.toLowerCase();
    B = B.toLowerCase();

    // Wenn Suchbegriff Teilmenge von Begriff in Database ist dann treffer
    var zaehler = 0;
    for (var i = 0; i < A.length; i++) {
        if (A[i] == A[i - 1] && zaehler == 1) {
            zaehler = 0;
        }
        if (A[i] == B[zaehler]) {
            zaehler++;
            if (zaehler == B.length) {
                break;
            }
        } else {
            zaehler = 0;
        }
    }

    var Match;
    if (zaehler == B.length) {
        Match = true;
    } else {
        Match = false;
    }
    console.log(A);
    console.log(B);
    console.log(zaehler);
    return Match;
}

function Database_update() {
    var TimeStatus = false;
    if (Database_saving_mode == "onTime") {
        console.log((Date.now() - Last) / 1000);
        if (((Date.now() - Last) / 1000) > Interval) {
            TimeStatus = true;
            Last = Date.now();
        }
    }
    if (Database_saving_mode == "onChange" || TimeStatus) {
        if (Database_update_status == "active") {
            Verfuegbare_Skills = JOIN(Verfuegbare_Skills_SE, Verfuegbare_Skills_PM, Verfuegbare_Skills_ID);
            var Obj2 = [Users, Verfuegbare_Skills, [Verfuegbare_Skills_SE, Verfuegbare_Skills_PM, Verfuegbare_Skills_ID], Dict_Skills_Department];
            localStorage.setItem('DB_Objekte', JSON.stringify(Obj2));
            console.log("Saved the Data to Database, Update of Database");
        } else {
            console.log("Did not Save, No Update of Database because inactive");
        }
    } else {
        console.log("Did not Save, will Update within the Interval Time");
    }
}

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

function Schon_Da_Profile(Skill, OwnSkills) {
    var Schon_Da = false;
    for (var i = 0; i < OwnSkills.length; i++) {
        if (Skill == OwnSkills[i][0]) {
            Schon_Da = true;
        }
    }
    return Schon_Da;
}

function Ein_Standard_Vergleich(A, B) {
    // Leerzeichen,Sonderzeichen usw entfernen
    var Entfernen = [" ", "-", "_", "+", ",", ".", ";", "'", "#", '"', "?", "!", "%", "&"];
    var A_Alt;
    var B_Alt;
    for (var j = 0; j < Entfernen.length; j++) {
        while (true) {
            A_Alt = A;
            B_Alt = B;
            A = A.replace(Entfernen[j], "");
            B = B.replace(Entfernen[j], "");
            if (A_Alt == A && B_Alt == B) {
                break;
            }
        }
    }

    // Buchstaben ersetzen
    var Ersetzen = [
        ["ö", "oe"],
        ["ä", "ae"],
        ["ü", "ue"],
        ["ß", "ss"]
    ];
    for (var jj = 0; jj < Ersetzen.length; jj++) {
        while (true) {
            A_Alt = A;
            B_Alt = B;
            A = A.replace(Ersetzen[jj][0], Ersetzen[jj][1]);
            B = B.replace(Ersetzen[jj][0], Ersetzen[jj][1]);
            if (A_Alt == A && B_Alt == B) {
                break;
            }
        }
    }

    // alles klein
    A = A.toLowerCase();
    B = B.toLowerCase();
    var Match;
    if (A == B) {
        Match = true;
    } else {
        Match = false;
    }

    return Match;
}


function Schon_Da(New_Skill, Verfuegbare_Skills) {
    var Ja = false;

    for (var i = 0; i < Verfuegbare_Skills.length; i++) {
        Ein_Standard_Vergleich(New_Skill, Verfuegbare_Skills[i]);
        if (Ein_Standard_Vergleich(New_Skill, Verfuegbare_Skills[i])) {
            Ja = true;
        }
    }
    return Ja;
}

function Profile_Skills_mit_Department(Dict_Skills_Department, Users) {
    var UserSkills = Users[Pruefung[0]].Skills;
    var UserSkills_Department = [];
    for (var i = 0; i < UserSkills.length; i++) {
        UserSkills_Department.push([UserSkills[i][0], Dict_Skills_Department[UserSkills[i][0]]]);
    }
    console.log("Profile_Skills_mit_Department Profile_Skills_mit_Department Profile_Skills_mit_Department Profile_Skills_mit_Department");
    console.log(UserSkills_Department);
    return UserSkills_Department;
}

function Profile_Skills_mit_Department_all(Dict_Skills_Department, Users) {
    Users_Department = [];
    for (var k=0; k<Users.length; k++){
        var UserSkills = Users[k].Skills;
        var UserSkills_Department_all = [];
        for (var i = 0; i < UserSkills.length; i++) {
            UserSkills_Department_all.push([UserSkills[i][0], Dict_Skills_Department[UserSkills[i][0]]]);
        }
        Users_Department.push(UserSkills_Department_all);
    }
    console.log("Profile_Skills_mit_Department_all Profile_Skills_mit_Department_all Profile_Skills_mit_Department_all Profile_Skills_mit_Department_all");
    console.log(Users_Department);
    return Users_Department;
}
