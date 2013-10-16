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
    ["Bélier", "Gémeaux", 1], ["Bélier", "Sagittaire", 2],
    ["Taureau","Taureau", 3], ["Taureau", "Cancer", 4], ["Taureau","Vierge", 5], ["Taureau","Capricorne", 6],
    ["Gémeaux", "Gémeaux", 7], ["Gémeaux","Lion", 8], ["Gémeaux","Balance", 9], ["Gémeaux","Verseau", 10],
    ["Cancer","Cancer", 11], ["Cancer","Scorpion", 12], ["Cancer","Poissons", 13],
    ["Lion","Lion", 14], ["Lion","Sagittaire", 15],
    ["Vierge","Vierge", 16], ["Vierge","Capricorne", 17],
    ["Scorpion","Scorpion", 18], ["Scorpion","Capricorne", 19], ["Scorpion","Poissons", 20],
    ["Sagittaire","Sagittaire", 21], ["Sagittaire","Verseau", 22],
    ["Capricorne","Capricorne", 23],
    ["Verseau","Verseau", 24]
    ];
var euro4Stars = [
    ["Bélier", "Lion", 25],
    ["Taureau", "Scorpion", 26], ["Taureau", "Poissons", 27],
    ["Gémeaux","Vierge", 28], ["Gémeaux","Sagittaire", 29],
    ["Cancer", "Lion", 30], ["Cancer","Capricorne", 31],
    ["Lion","Vierge", 32],
    ["Balance","Balance", 33],
    ["Poissons","Poissons", 34]
];
var euro3Stars = [
    ["Bélier", "Balance", 35], ["Bélier", "Verseau", 36], ["Bélier", "Poissons", 37],
    ["Taureau", "Gémeaux", 38], ["Taureau", "Lion", 39],
    ["Gémeaux", "Scorpion", 40], ["Gémeaux", "Capricorne", 41], ["Gémeaux", "Poissons", 42],
    ["Cancer", "Vierge", 43],
    ["Lion", "Scorpion", 44], ["Lion", "Capricorne", 45],
    ["Vierge", "Scorpion", 46],
    ["Balance", "Sagittaire", 47], ["Balance", "Verseau", 48],
    ["Scorpion", "Sagittaire", 49],
    ["Verseau", "Poissons", 50]
];
var euro2Stars = [
    ["Bélier", "Bélier", 51], ["Bélier", "Cancer", 52],
    ["Taureau", "Balance", 53], ["Taureau", "Verseau", 54],
    ["Gémeaux", "Cancer", 55],
    ["Cancer", "Balance", 56], ["Cancer", "Verseau", 57],
    ["Lion", "Balance", 58], ["Lion", "Poissons", 59],
    ["Vierge", "Sagittaire", 60], ["Vierge", "Verseaux", 61],
    ["Balance", "Capricorne", 62], ["Balance", "Poissons", 63],
    ["Sagittaire", "Poissons", 64]
];
var euro1Star = [
    ["Bélier", "Taureau", 65], ["Bélier", "Vierge", 66], ["Bélier", "Scorpion", 67], ["Bélier", "Capricorne", 68],
    ["Taureau", "Sagittaire", 69],
    ["Cancer", "Sagittaire", 70],
    ["Lion", "Verseau", 71],
    ["Vierge", "Balance", 72], ["Vierge", "Poissons", 73],
    ["Balance", "Scorpion", 74],
    ["Scorpion", "Verseau", 75],
    ["Sagittaire", "Capricorne", 76],
    ["Capricorne", "Verseau", 77], ["Capricorne", "Poissons", 78]
];

//Chinese affinities lists
var chinese5Stars = [
    ["Rat", "Boeuf", 79], ["Rat", "Dragon", 80], ["Rat", "Singe", 81],
    ["Boeuf", "Lapin", 82], ["Boeuf", "Coq", 83],
    ["Tigre", "Dragon", 84], ["Tigre", "Cheval", 85], ["Tigre", "Chien", 86],
    ["Lapin", "Serpent", 87], ["Lapin", "Chèvre", 88], ["Lapin", "Cochon", 89],
    ["Dragon", "Serpent", 90], ["Dragon", "Singe", 91],
    ["Serpent", "Coq", 92],
    ["Cheval", "Chèvre", 93], ["Cheval", "Chien", 94],
    ["Chèvre", "Cochon", 95],
    ["Chien", "Cochon", 96]
];
var chinese4Stars = [
    ["Rat", "Lapin", 97], ["Rat", "Serpent", 98], ["Rat", "Chien", 99],
    ["Boeuf", "Serpent", 100],
    ["Tigre", "Lapin", 101], ["Tigre", "Cochon", 102],
    ["Lapin", "Chien", 103], ["Lapin", "Cochon", 104],
    ["Dragon", "Cochon", 105],
    ["Serpent", "Chèvre", 106],
    ["Cheval", "Coq", 107],
    ["Chèvre", "Chèvre", 108], ["Chèvre", "Singe", 109],
    ["Singe", "Chien", 110], ["Singe", "Cochon", 111],
    ["Coq", "Cochon", 112],
    ["Chien", "Chien", 113]
];
var chinese3Stars = [
    ["Rat", "Rat", 114], ["Rat", "Tigre", 115],
    ["Boeuf", "Boeuf", 116], ["Boeuf", "Singe", 117], ["Boeuf", "Cochon", 118],
    ["Tigre", "Tigre", 119], ["Tigre", "Chèvre", 120],
    ["Lapin", "Lapin", 121],
    ["Dragon", "Cheval", 122], ["Dragon", "Coq", 123],
    ["Serpent", "Serpent", 124], ["Serpent", "Chien", 125],
    ["Cheval", "Cheval", 126], ["Cheval", "Cochon", 127],
    ["Chèvre", "Chien", 128],
    ["Singe", "Coq", 129]
];
var chinese2Stars = [
    ["Rat", "Chèvre", 130], ["Rat", "Coq", 131],
    ["Boeuf", "Cheval", 132], ["Boeuf", "Chèvre", 133], ["Boeuf", "Chien", 134],
    ["Tigre", "Serpent", 135], ["Tigre", "Coq", 136],
    ["Lapin", "Dragon", 137], ["Lapin", "Singe", 138],
    ["Dragon", "Dragon", 139], ["Dragon", "Chèvre", 140],
    ["Serpent", "Cheval", 141],
    ["Chèvre", "Coq", 142],
    ["Singe", "Singe", 143],
    ["Coq", "Chien", 144],
    ["Cochon", "Cochon", 145]
];
var chinese1Star = [
    ["Rat", "Cheval", 146],
    ["Boeuf", "Tigre", 147], ["Boeuf", "Dragon", 148],
    ["Tigre", "Singe", 149], 
    ["Lapin", "Cheval", 150], ["Lapin", "Coq", 151],
    ["Dragon", "Chien", 152],
    ["Serpent", "Singe", 153], ["Serpent", "Cochon", 154],
    ["Cheval", "Singe", 155],
    ["Coq", "Coq", 156]
];