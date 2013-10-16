//Fake DB European sign 
var dateBelierFrom = new Date('03/21');
var dateBelierTo = new Date('04/20');
var dateTaureauFrom = new Date('04/21');
var dateTaureauTo = new Date('05/20');
var dateGemeauxFrom = new Date('05/21');
var dateGemeauxTo = new Date('06/21');
var dateCancerFrom = new Date('06/22');
var dateCancerTo = new Date('07/22');
var dateLionFrom = new Date('07/23');
var dateLionTo = new Date('08/22');
var dateViergeFrom = new Date('08/23');
var dateViergeTo = new Date('09/22');
var dateBalanceFrom = new Date('09/23');
var dateBalanceTo = new Date('10/22');
var dateScorpionFrom = new Date('10/23');
var dateScorpionTo = new Date('11/22');
var dateSagittaireFrom = new Date('11/23');
var dateSagittaireTo = new Date('12/22');
var dateCapricorneFrom = new Date('12/23');
var dateCapricorneTo = new Date('01/20');
var dateVerseauFrom = new Date('01/21');
var dateVerseauTo = new Date('02/18');
var datePoissonFrom = new Date('02/19');
var datePoissonTo = new Date('03/20');

//Birtdate with Year Regex 
var friendsToMatch = [];
var missingFriends = [];
var user;
var tempDate;

//European affinities lists
var euro5Stars = [
    ["Bélier", "Gémeaux"], ["Bélier", "Sagittaire"],
    ["Taureau","Taureau"], ["Taureau", "Cancer"], ["Taureau","Vierge"], ["Taureau","Capricorne"],
    ["Gémeaux", "Gémeaux"], ["Gémeaux","Lion"], ["Gémeaux","Balance"], ["Gémeaux","Verseau"],
    ["Cancer","Cancer"], ["Cancer","Scorpion"], ["Cancer","Poissons"],
    ["Lion","Lion"], ["Lion","Sagittaire"],
    ["Vierge","Vierge"], ["Vierge","Capricorne"],
    ["Scorpion","Scorpion"], ["Scorpion","Capricorne"], ["Scorpion","Poissons"],
    ["Sagittaire","Sagittaire"], ["Sagittaire","Verseau"],
    ["Capricorne","Capricorne"],
    ["Verseau","Verseau"]
    ];
var euro4Stars = [
    ["Bélier", "Lion"],
    ["Taureau", "Scorpion"], ["Taureau", "Poissons"],
    ["Gémeaux","Vierge"], ["Gémeaux","Sagittaire"],
    ["Cancer","Capricorne"],
    ["Lion","Vierge"],
    ["Balance","Balance"],
    ["Poissons","Poissons"]
];
var euro3Stars = [
    ["Bélier", "Balance"], ["Bélier", "Verseau"], ["Bélier", "Poissons"],
    ["Taureau", "Gémeaux"], ["Taureau", "Lion"],
    ["Gémeaux", "Scorpion"], ["Gémeaux", "Capricorne"], ["Gémeaux", "Poissons"],
    ["Cancer", "Vierge"],
    ["Lion", "Scorpion"], ["Lion", "Capricorne"],
    ["Vierge", "Scorpion"],
    ["Balance", "Sagittaire"], ["Balance", "Verseau"],
    ["Scorpion", "Sagittaire"],
    ["Verseau", "Poissons"]
];
var euro2Stars = [
    ["Bélier", "Bélier"], ["Bélier", "Cancer"],
    ["Taureau", "Balance"], ["Taureau", "Verseau"],
    ["Gémeaux", "Cancer"],
    ["Cancer", "Balance"], ["Cancer", "Verseau"],
    ["Lion", "Balance"], ["Lion", "Poissons"],
    ["Vierge", "Sagittaire"], ["Vierge", "Verseaux"],
    ["Balance", "Capricorne"], ["Balance", "Poissons"],
    ["Sagittaire", "Poissons"]
];
var euro1Star = [
    ["Bélier", "Taureau"], ["Bélier", "Vierge"], ["Bélier", "Scorpion"], ["Bélier", "Capricorne"],
    ["Taureau", "Sagittaire"],
    ["Cancer", "Sagittaire"],
    ["Lion", "Verseau"],
    ["Vierge", "Balance"], ["Vierge", "Poissons"],
    ["Balance", "Scorpion"],
    ["Scorpion", "Verseau"],
    ["Sagittaire", "Capricorne"],
    ["Capricorne", "Verseau"], ["Capricorne", "Poissons"]
];

//Chinese affinities lists
var chinese5Stars = [
    ["Rat", "Boeuf"], ["Rat", "Dragon"], ["Rat", "Singe"],
    ["Boeuf", "Lapin"], ["Boeuf", "Coq"],
    ["Tigre", "Dragon"], ["Tigre", "Cheval"], ["Tigre", "Chien"],
    ["Lapin", "Serpent"], ["Lapin", "Chèvre"],
    ["Dragon", "Serpent"], ["Dragon", "Singe"],
    ["Serpent", "Coq"],
    ["Cheval", "Chèvre"], ["Cheval", "Chien"],
    ["Chèvre", "Cochon"],
    ["Chien", "Cochon"]
];
var chinese4Stars = [
    ["Rat", "Lapin"], ["Rat", "Serpent"], ["Rat", "Chien"],
    ["Boeuf", "Serpent"],
    ["Tigre", "Lapin"], ["Tigre", "Cochon"],
    ["Lapin", "Chien"], ["Lapin", "Cochon"],
    ["Dragon", "Cochon"],
    ["Serpent", "Chèvre"],
    ["Cheval", "Coq"],
    ["Chèvre", "Chèvre"], ["Chèvre", "Singe"],
    ["Singe", "Chien"], ["Singe", "Cochon"],
    ["Coq", "Cochon"],
    ["Chien", "Chien"]
];
var chinese3Stars = [
    ["Rat", "Rat"], ["Rat", "Tigre"],
    ["Boeuf", "Boeuf"], ["Boeuf", "Singe"], ["Boeuf", "Cochon"],
    ["Tigre", "Tigre"], ["Tigre", "Chèvre"],
    ["Lapin", "Lapin"],
    ["Dragon", "Cheval"], ["Dragon", "Coq"],
    ["Serpent", "Serpent"], ["Serpent", "Chien"],
    ["Cheval", "Cheval"], ["Cheval", "Cochon"],
    ["Chèvre", "Chien"],
    ["Singe", "Coq"]
];
var chinese2Stars = [
    ["Rat", "Chèvre"], ["Rat", "Coq"],
    ["Boeuf", "Cheval"], ["Boeuf", "Chèvre"], ["Boeuf", "Chien"],
    ["Tigre", "Serpent"], ["Tigre", "Coq"],
    ["Lapin", "Dragon"], ["Lapin", "Singe"],
    ["Dragon", "Dragon"], ["Dragon", "Chèvre"],
    ["Serpent", "Cheval"],
    ["Chèvre", "Coq"],
    ["Singe", "Singe"],
    ["Coq", "Chien"],
    ["Cochon", "Cochon"]
];
var chinese1Star = [
    ["Rat", "Cheval"],
    ["Boeuf", "Tigre"], ["Boeuf", "Dragon"],
    ["Tigre", "Singe"], 
    ["Lapin", "Cheval"], ["Lapin", "Coq"],
    ["Dragon", "Chien"],
    ["Serpent", "Singe"], ["Serpent", "Cochon"],
    ["Cheval", "Singe"],
    ["Coq", "Coq"]
];