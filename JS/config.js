
var friendsToMatch = [];
var missingFriends = [];
var user = new Object();
var curentFriend = new Object();
var tempDate;

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


// Find Chinese sign
function findChineseZodiac(date){
    if((new Date(1924,01,05) <= date &&  new Date(1925,00,23) >= date) 
        ||(new Date(1936,00,24) <= date &&  new Date(1937,01,10) >= date)	
        ||(new Date(1948,01,10) <= date &&  new Date(1949,00,28) >= date)	
        ||(new Date(1960,00,28) <= date &&  new Date(1961,01,14) >= date)	
        ||(new Date(1972,01,15) <= date &&  new Date(1973,01,02) >= date)	
        ||(new Date(1984,01,02) <= date &&  new Date(1985,01,19) >= date)	
        ||(new Date(1996,01,19) <= date &&  new Date(1997,01,06) >= date)	
        ||(new Date(2008,01,07) <= date &&  new Date(2009,00,25) >= date)	
        ||(new Date(2020,00,25) <= date &&  new Date(2021,01,11) >= date)	
        ||(new Date(2032,01,11) <= date &&  new Date(2033,00,30) >= date)	
    )
    {
        return 'Rat';
    }
    else if((new Date(1925,00,24) <= date &&  new Date(1926,01,12) >= date) 
        ||(new Date(1937,01,11) <= date &&  new Date(1938,00,30) >= date)	
        ||(new Date(1949,00,29) <= date &&  new Date(1950,01,16) >= date)	
        ||(new Date(1961,01,15) <= date &&  new Date(1962,01,04) >= date)	
        ||(new Date(1973,01,03) <= date &&  new Date(1974,00,24) >= date)	
        ||(new Date(1985,01,20) <= date &&  new Date(1986,01,08) >= date)	
        ||(new Date(1997,01,07) <= date &&  new Date(1998,00,27) >= date)	
        ||(new Date(2009,00,26) <= date &&  new Date(2010,01,13) >= date)	
        ||(new Date(2021,01,12) <= date &&  new Date(2022,00,31) >= date)	
        ||(new Date(2033,00,31) <= date &&  new Date(2034,01,18) >= date)	
    )
    {
        return 'Boeuf';
    }
    else if((new Date(1926,01,13) <= date &&  new Date(1927,01,01) >= date) 
        ||(new Date(1938,00,31) <= date &&  new Date(1939,01,18) >= date)	
        ||(new Date(1950,01,17) <= date &&  new Date(1951,01,05) >= date)	
        ||(new Date(1962,01,05) <= date &&  new Date(1963,00,24) >= date)	
        ||(new Date(1974,00,23) <= date &&  new Date(1975,01,10) >= date)	
        ||(new Date(1986,01,09) <= date &&  new Date(1987,00,28) >= date)	
        ||(new Date(1998,00,27) <= date &&  new Date(1999,01,15) >= date)	
        ||(new Date(2010,01,14) <= date &&  new Date(2011,01,02) >= date)	
        ||(new Date(2022,01,01) <= date &&  new Date(2023,00,21) >= date)	
        ||(new Date(2034,01,19) <= date &&  new Date(2035,01,07) >= date)	
    )
    {
        return 'Tigre';
    }
    else if((new Date(1927,01,02) <= date &&  new Date(1928,00,21) >= date) 
        ||(new Date(1939,01,19) <= date &&  new Date(1940,01,07) >= date)	
        ||(new Date(1951,01,06) <= date &&  new Date(1952,00,26) >= date)	
        ||(new Date(1963,00,25) <= date &&  new Date(1964,01,12) >= date)	
        ||(new Date(1975,01,11) <= date &&  new Date(1976,00,30) >= date)	
        ||(new Date(1987,00,29) <= date &&  new Date(1988,01,16) >= date)	
        ||(new Date(1999,01,16) <= date &&  new Date(2000,01,04) >= date)	
        ||(new Date(2011,01,03) <= date &&  new Date(2012,00,22) >= date)	
        ||(new Date(2023,00,22) <= date &&  new Date(2024,01,09) >= date)	
        ||(new Date(2035,01,08) <= date &&  new Date(2036,00,27) >= date)	
    )
    {
        return 'Lapin';
    }
    else if((new Date(1928,00,22) <= date &&  new Date(1929,01,08) >= date) 
        ||(new Date(1940,01,08) <= date &&  new Date(1941,00,26) >= date)	
        ||(new Date(1952,00,27) <= date &&  new Date(1953,01,13) >= date)	
        ||(new Date(1964,01,13) <= date &&  new Date(1965,01,01) >= date)	
        ||(new Date(1976,00,31) <= date &&  new Date(1977,01,17) >= date)	
        ||(new Date(1988,01,17) <= date &&  new Date(1989,01,05) >= date)	
        ||(new Date(2000,01,05) <= date &&  new Date(2001,00,23) >= date)	
        ||(new Date(2012,00,23) <= date &&  new Date(2013,01,09) >= date)	
        ||(new Date(2024,01,10) <= date &&  new Date(2025,00,28) >= date)	
        ||(new Date(2036,00,28) <= date &&  new Date(2037,01,14) >= date)	
    )
    {
        return 'Dragon';
    }
    else if((new Date(1929,01,09) <= date &&  new Date(1930,00,28) >= date) 
        ||(new Date(1941,00,27) <= date &&  new Date(1942,02,14) >= date)	
        ||(new Date(1953,01,14) <= date &&  new Date(1954,01,02) >= date)	
        ||(new Date(1965,01,02) <= date &&  new Date(1966,00,20) >= date)	
        ||(new Date(1977,01,18) <= date &&  new Date(1978,01,06) >= date)	
        ||(new Date(1989,01,06) <= date &&  new Date(1990,00,26) >= date)	
        ||(new Date(2001,01,24) <= date &&  new Date(2002,01,11) >= date)	
        ||(new Date(2013,01,10) <= date &&  new Date(2014,00,30) >= date)	
        ||(new Date(2025,00,29) <= date &&  new Date(2026,01,16) >= date)	
        ||(new Date(2037,01,15) <= date &&  new Date(2038,01,03) >= date)	
    )
    {
        return 'Serpent';
    }
    else if((new Date(1930,00,29) <= date &&  new Date(1931,01,16) >= date) 
        ||(new Date(1942,01,15) <= date &&  new Date(1943,01,04) >= date)	
        ||(new Date(1954,01,03) <= date &&  new Date(1955,00,23) >= date)	
        ||(new Date(1966,00,21) <= date &&  new Date(1967,01,08) >= date)	
        ||(new Date(1978,01,07) <= date &&  new Date(1979,00,27) >= date)	
        ||(new Date(1990,00,27) <= date &&  new Date(1991,01,14) >= date)	
        ||(new Date(2002,01,12) <= date &&  new Date(2003,00,31) >= date)	
        ||(new Date(2014,00,31) <= date &&  new Date(2015,01,18) >= date)	
        ||(new Date(2026,00,17) <= date &&  new Date(2027,01,05) >= date)	
        ||(new Date(2038,01,04) <= date &&  new Date(2039,00,23) >= date)	
    )
    {
        return 'Cheval';
    }
    else if((new Date(1931,01,17) <= date &&  new Date(1932,01,05) >= date) 
        ||(new Date(1943,01,05) <= date &&  new Date(1944,00,24) >= date)	
        ||(new Date(1955,00,24) <= date &&  new Date(1956,01,11) >= date)	
        ||(new Date(1967,01,09) <= date &&  new Date(1968,00,29) >= date)	
        ||(new Date(1979,00,28) <= date &&  new Date(1980,01,15) >= date)	
        ||(new Date(1991,01,14) <= date &&  new Date(1992,01,03) >= date)	
        ||(new Date(2003,01,01) <= date &&  new Date(2004,00,21) >= date)	
        ||(new Date(2015,01,19) <= date &&  new Date(2016,01,07) >= date)	
        ||(new Date(2027,01,06) <= date &&  new Date(2028,00,25) >= date)	
        ||(new Date(2039,00,24) <= date &&  new Date(2040,01,11) >= date)	
    )
    {
        return 'Chèvre';
    }
    else if((new Date(1932,01,06) <= date &&  new Date(1933,00,24) >= date) 
        ||(new Date(1944,00,25) <= date &&  new Date(1945,01,12) >= date)	
        ||(new Date(1956,01,12) <= date &&  new Date(1957,00,30) >= date)	
        ||(new Date(1968,00,30) <= date &&  new Date(1969,01,16) >= date)	
        ||(new Date(1980,01,16) <= date &&  new Date(1981,01,04) >= date)	
        ||(new Date(1992,01,04) <= date &&  new Date(1993,00,22) >= date)	
        ||(new Date(2004,00,22) <= date &&  new Date(2005,01,08) >= date)	
        ||(new Date(2016,01,08) <= date &&  new Date(2017,00,27) >= date)	
        ||(new Date(2028,00,26) <= date &&  new Date(2029,01,12) >= date)	
        ||(new Date(2040,01,12) <= date &&  new Date(2041,00,31) >= date)	
    )
    {
        return 'Singe';
    }
    else if((new Date(1933,00,25) <= date &&  new Date(1934,01,13) >= date) 
        ||(new Date(1945,01,13) <= date &&  new Date(1946,01,01) >= date)	
        ||(new Date(1957,00,30) <= date &&  new Date(1958,01,17) >= date)	
        ||(new Date(1969,01,17) <= date &&  new Date(1970,01,05) >= date)	
        ||(new Date(1981,01,05) <= date &&  new Date(1982,00,24) >= date)	
        ||(new Date(1993,00,23) <= date &&  new Date(1994,01,09) >= date)	
        ||(new Date(2005,01,09) <= date &&  new Date(2006,00,28) >= date)	
        ||(new Date(2017,00,28) <= date &&  new Date(2018,01,15) >= date)	
        ||(new Date(2029,01,13) <= date &&  new Date(2030,01,02) >= date)	
        ||(new Date(2041,01,01) <= date &&  new Date(2042,00,21) >= date)	
    )
    {
        return 'Coq';
    }
    else if((new Date(1934,01,14) <= date &&  new Date(1935,01,02) >= date) 
        ||(new Date(1946,01,02) <= date &&  new Date(1947,00,21) >= date)	
        ||(new Date(1958,01,18) <= date &&  new Date(1959,01,07) >= date)	
        ||(new Date(1970,01,06) <= date &&  new Date(1971,00,26) >= date)	
        ||(new Date(1982,00,25) <= date &&  new Date(1983,01,12) >= date)	
        ||(new Date(1994,01,10) <= date &&  new Date(1995,00,30) >= date)	
        ||(new Date(2006,00,29) <= date &&  new Date(2007,01,17) >= date)	
        ||(new Date(2018,01,16) <= date &&  new Date(2019,01,04) >= date)	
        ||(new Date(2030,01,03) <= date &&  new Date(2031,00,22) >= date)	
        ||(new Date(2042,00,22) <= date &&  new Date(2043,01,09) >= date)	
    )
    {
        return 'Chien';
    }
    else if((new Date(1935,01,03) <= date &&  new Date(1936,00,23) >= date) 
        ||(new Date(1947,00,22) <= date &&  new Date(1948,01,09) >= date)	
        ||(new Date(1959,01,08) <= date &&  new Date(1960,00,27) >= date)	
        ||(new Date(1971,00,27) <= date &&  new Date(1972,01,14) >= date)	
        ||(new Date(1983,01,13) <= date &&  new Date(1984,01,01) >= date)	
        ||(new Date(1995,00,31) <= date &&  new Date(1996,01,18) >= date)	
        ||(new Date(2007,01,18) <= date &&  new Date(2008,01,03) >= date)	
        ||(new Date(2019,01,05) <= date &&  new Date(2020,00,24) >= date)	
        ||(new Date(2031,00,23) <= date &&  new Date(2032,01,10) >= date)	
        ||(new Date(2043,01,10) <= date &&  new Date(2044,00,29) >= date)	
    )
    {
        return 'Cochon';
    }
    return null;
}

// Find European sign
function findEuropeanZodiac(date){
    if(date >= dateBelierFrom.setFullYear(date.getFullYear()) && date <= dateBelierTo.setFullYear(date.getFullYear()))
        return 'Bélier';
    else if(date >= dateTaureauFrom.setFullYear(date.getFullYear()) && date <= dateTaureauTo.setFullYear(date.getFullYear()))
        return 'Taureau';
    else if(date >= dateGemeauxFrom.setFullYear(date.getFullYear()) && date <= dateGemeauxTo.setFullYear(date.getFullYear()))
        return 'Gémeaux';
    else if(date >= dateCancerFrom.setFullYear(date.getFullYear()) && date <= dateCancerTo.setFullYear(date.getFullYear()))
        return 'Cancer';
    else if(date >= dateLionFrom.setFullYear(date.getFullYear()) && date <= dateLionTo.setFullYear(date.getFullYear()))
        return 'Lion';
    else if(date >= dateViergeFrom.setFullYear(date.getFullYear()) && date <= dateViergeTo.setFullYear(date.getFullYear()))
        return 'Vierge';
    else if(date >= dateBalanceFrom.setFullYear(date.getFullYear()) && date <= dateBalanceTo.setFullYear(date.getFullYear()))
        return 'Balance';
    else if(date >= dateScorpionFrom.setFullYear(date.getFullYear()) && date <= dateScorpionTo.setFullYear(date.getFullYear()))
        return 'Scorpion';
    else if(date >= dateSagittaireFrom.setFullYear(date.getFullYear()) && date <= dateSagittaireTo.setFullYear(date.getFullYear()))
        return 'Sagittaire';
    else if(date.getMonth() == 0 && (date >= dateCapricorneFrom.setFullYear(date.getFullYear() - 1) && date <= dateCapricorneTo.setFullYear(date.getFullYear())))
        return 'Capricorne';
    else if(date.getMonth() == 11 && (date >= dateCapricorneFrom.setFullYear(date.getFullYear()) && date <= dateCapricorneTo.setFullYear(date.getFullYear() + 1)))
        return 'Capricorne';
    else if(date >= dateVerseauFrom.setFullYear(date.getFullYear()) && date <= dateVerseauTo.setFullYear(date.getFullYear()))
        return 'Verseau';
    else if(date >= datePoissonFrom.setFullYear(date.getFullYear()) && date <= datePoissonTo.setFullYear(date.getFullYear()))
        return 'Poissons';
}