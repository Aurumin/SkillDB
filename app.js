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


var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");


app.use(cors());

app.get('/api/hello', Fkt)

function Fkt(req,res){
  res.json({ express: 'Backened',
            name: 'viki' });
}

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

// localStorage.setItem('myFirstKey', JSON.stringify(Obj));
// var Aufruf0 = localStorage.getItem('myFirstKey');
// var Aufruf1 = JSON.parse(Aufruf0); // Von String in Object verwandeln

app.use(bodyParser.urlencoded({
    extended: true
}));


app.get("/", Anmeldung);
app.get("/skill_list", Skill_list);
app.get("/UserList", UserList);
app.get("/Profile", Profile);
app.get("/Search", Search);
app.post("/Search", Search_p);
app.post("/Profile", Profile_p);
app.post("/Update_Skill", Update_Skill);
app.post("/Search_live_sugg", Search_live_sugg_p);
app.get("*", Keine);

app.listen(5000, function () {
    console.log("Server has started!");
});

// Callbacks zu Routen
function Keine(req, res) {
    console.log("Keine!");
    res.send("Hier ist nichts!");
}

function Anmeldung(req, res) {
    res.render("Anmeldung2.ejs");
    console.log("Anmeldung!");
}

function Skill_list(req, res) {
    // Get all Users from DB

    if (!Pruefung[1] || Pruefung[1] == null) {
        res.send("NO ACCESS ALLOWED!!!");
    }

    console.log("Skill_List!");

    var Namen = [];
    for (var i = 0; i < Users.length; i++) {
        var name_i = Name(Users[i].Email);
        Namen.push(name_i[0] + " " + name_i[1]);
    }

    res.json({Name: 'Heiko'
        // P: Users, // Object: Alle Users mit ihren Profilen: siehe "Daten_init.js" für Struktur und Inhalt
        // Namen: Namen // Liste aus allen Namen der Users, aus Users extrahiert
    });
}


function UserList(req, res) {
    if (Pruefung[0] == null || !Pruefung[1]) {
        res.send("NO ACCESS ALLOWED!!!");
    }

    console.log("UserList!");
    res.render("UserList.ejs", {
        Users: Users, // Object: Alle Users mit ihren Profilen: siehe "Daten_init.js" für Struktur und Inhalt
    });
}

function Update_Skill(req, res) {
    console.log("______________UpdateSkill____");
    console.log(req.body);
    if (req.body.New_Skill == null) {
        var Update_Skills = reqbody_Skills_pruefen(req.body);
        var init_skills = [];
        for (var dd = 0; dd < Update_Skills.length; dd++) {
            init_skills.push([0, 0, 0]);
        }
        Users[Pruefung[0]].Skills = init_skills;
        for (var d = 0; d < Update_Skills.length; d++) {
            Users[Pruefung[0]].Skills[d][0] = Update_Skills[d];
            var SkillWill = Skill_Will_level_Body(Verfuegbare_Skills, req.body, Update_Skills[d]);
            Users[Pruefung[0]].Skills[d][1] = SkillWill[0];
            Users[Pruefung[0]].Skills[d][2] = SkillWill[1];
        }
        console.log(Update_Skills);

        var Obj1 = [Users, JOIN(Verfuegbare_Skills_SE, Verfuegbare_Skills_PM, Verfuegbare_Skills_ID), [Verfuegbare_Skills_SE, Verfuegbare_Skills_PM, Verfuegbare_Skills_ID]];
        localStorage.setItem('DB_Objekte', JSON.stringify(Obj1));

        res.redirect("/Profile");
        console.log("Update_Skill! -- null");

    } else {
        var Ja = Schon_Da(req.body.New_Skill, Verfuegbare_Skills);

        if (!Ja) {
            var New_Skill = req.body.New_Skill;
            var Auswahl_Klasse = req.body.Auswahl_Klasse;
            if (Auswahl_Klasse == "SE") {
                Verfuegbare_Skills_SE[Verfuegbare_Skills_SE.length - 1] = New_Skill;
                Verfuegbare_Skills_SE.push("\0");
            } else if (Auswahl_Klasse == "PM") {
                Verfuegbare_Skills_PM[Verfuegbare_Skills_PM.length - 1] = New_Skill;
                Verfuegbare_Skills_PM.push("\0");
            } else if (Auswahl_Klasse == "ID") {
                Verfuegbare_Skills_ID[Verfuegbare_Skills_ID.length] = New_Skill;
            } else {
                console.log("IrgendeinFEhler!!!!!!!!!!");
            }

            Verfuegbare_Skills = JOIN(Verfuegbare_Skills_SE, Verfuegbare_Skills_PM, Verfuegbare_Skills_ID);
            var Obj2 = [Users, Verfuegbare_Skills, [Verfuegbare_Skills_SE, Verfuegbare_Skills_PM, Verfuegbare_Skills_ID]];
            localStorage.setItem('DB_Objekte', JSON.stringify(Obj2));
        }

        res.redirect("/Profile");
    }

}

function Profile(req, res) {
    console.log("Profile!");
    res.render("Profile2.ejs", {
        User: Users[
          [0]], // Ein Element aus Users, derjenige der sich erfolgreich eingeloggt hat
        Name_i: Name_v[0] + " " + Name_v[1], // Name des eingeloggten Users "Vorname Nachname" als String
        SV: Verfuegbare_Skills // Liste aus allen verfügbaren Skills (Standardskill und individuell hinzugefügte), siehe "Daten_init.js"
    });
}

function Profile_p(req, res) {
    console.log("Profile_p!");

    var EMAIL = req.body.EMAIL;
    var PW = req.body.PW;
    console.log("_______Body_______");
    console.log(req.body);
    Pruefung = Anmeldung_Ueberpruefen(EMAIL, PW);
    console.log("_______Pruefung_______");
    console.log(Pruefung);
    if (Pruefung[1] == true) {
        Name_v = Name(EMAIL);
        res.render("Search.ejs");
        console.log("Profile! Zugang gewährt");
    } else {
        console.log("Profile! Zugang NICHT! gewährt");
        res.redirect("/");
    }
}


function Search(req, res) {
    if (Pruefung[0] == null || !Pruefung[1]) {
        res.send("NO ACCESS ALLOWED!!!");
    }
    console.log("Search!");
    res.render("Search.ejs");
}

function Search_p(req, res) {
    console.log("Search_p!");
    console.log(req.body);
    var Suchbegriff = req.body.Suchbegriff;
    var Match_IDs = Search_User_Skills(Users, Suchbegriff);
    if (Suchbegriff == "*" || Suchbegriff.toLowerCase() == "all" || Suchbegriff.toLowerCase() == "alle") {
        Match_IDs = [...Array(Users.length).keys()];
    }
    console.log("_________________Match_IDs_____________");
    console.log(Match_IDs);

    var Namen = [];
    var P = [];
    for (var i = 0; i < Match_IDs.length; i++) {
        var name_i = Name(Users[Match_IDs[i]].Email);
        Namen.push(name_i[0] + " " + name_i[1]);
        P.push(Users[Match_IDs[i]]);
    }

    res.render("skill_list_search.ejs", {
        P: P, // Profile die mit Suchbegriff ein Match haben--> Aufbau des Objektes: siehe in "Daten_init.js"
        Namen: Namen, // Liste mit n Namen, die jeweils ein Match haben mit dem Suchbegriff ("Vorname Nachname") aus P extrahiert
        Suchbegriff: Suchbegriff // Object: Ein String
    });
}

// Callback für Suggestion
function Search_live_sugg_p(req, res) {
    var Suchbegriff_aktuell = req.body.Suchbegriff_aktuell;
    var max_Anzahl_Suggestions = 5;
    var Suggestions = [];
    for (var i = 0; i < Verfuegbare_Skills.length; i++) {
        if (Suche_Robust2(Verfuegbare_Skills[i], Suchbegriff_aktuell)) {
            Suggestions.push(Verfuegbare_Skills[i]);
        }
    }

    Suggestions = Suggestions.sort(shuffle);

    while (Suggestions.length > max_Anzahl_Suggestions) {
        Suggestions.pop();
    }

    res.render("????.ejs", {
        Suggestions: Suggestions, // Liste aus Suggestions aus aktueller LiveEingabe (maximale Länge : max_Anzahl_Suggestions)
    });

}

function shuffle() {
    return Math.random() - 0.5;
}

// Nicht Callback-Funktionen // Nicht Callback-Funktionen // Nicht Callback-Funktionen // Nicht Callback-Funktionen

function Anmeldung_Ueberpruefen(EMAIL, PW) {
    var Zugang = false;
    var IDi;
    var Return = [];
    for (var i = 0; i < Users.length; i++) {
        console.log("_____________???_____________")
        console.log(Users[i].Email.toLowerCase());
        console.log(EMAIL.toLowerCase());
        if (Users[i].Email.toLowerCase() == EMAIL.toLowerCase() && Users[i].PW == PW) {
            Zugang = true;
            IDi = Users[i].ID;
        }
    }
    Return.push(IDi);
    Return.push(Zugang);
    return Return;
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
    return Name_v_n;
}

function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}


function reqbody_Skills_pruefen(Body) {

    var Neue_Skills = [];
    for (var i = 0; i < Verfuegbare_Skills.length; i++) {
        if (Body[Verfuegbare_Skills[i]] == "on") {
            Neue_Skills.push(Verfuegbare_Skills[i]);
        }
    }
    return Neue_Skills;
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

function Search_User_Skills(Users, Suchbegriff) {
    var Match_IDs = [];
    for (var i = 0; i < Users.length; i++) {
        var Name11 = Name(Users[i].Email);
        Name11 = Name11[0] + " " + Name11[1];
        var Match2 = Suche_Robust2(Name11, Suchbegriff);
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
    return Match;
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


function Skill_Will_level_Body(Verfuegbare_Skills, Body, Skill_name) {
    var minus = 0;
    for (var i = 0; i < Verfuegbare_Skills.length; i++) {
        if (Verfuegbare_Skills[i] == "\0") {
            minus++;
        }
        if (Verfuegbare_Skills[i] == Skill_name) {
            var Skill_level = Body.Skill_level[i - minus];
            var Will_level = Body.Will_level[i - minus];
            return [Skill_level, Will_level];
        }
    }
}

function Schon_Da(New_Skill, Verfuegbare_Skills) {
    var Ja = false;

    for (var i = 0; i < Verfuegbare_Skills.length; i++) {
        Ein_Standard_Vergleich(New_Skill, Verfuegbare_Skills[i])
        if (Ein_Standard_Vergleich(New_Skill, Verfuegbare_Skills[i])) {
            Ja = true;
        }
    }
    return Ja;
}
