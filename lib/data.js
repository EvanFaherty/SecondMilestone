var peopleData = {
    "messi": {
        "name": "messi",
        "dob": "24/06/1987",
        "Clubs": ["Barcelona", "La Liga", "Argentina"],
        "goals": "696",
        "imageurl": "/images/messiimage1.jpg"},

    "ronaldo" : { "name:": "ronaldo",
        "dob": "05/02/1985",
        "Clubs": ["Juventus", "Serie A", "Portugal"],
        "goals": "760",
       "imageurl": "/images/ronaldoimage1.jpg"},

"neymar" : { "name": "neymar",
       "dob": "05/02/1992",
       "goals": "269",
       "Clubs": ["PSG", "Ligue 1", "Brazil"],
      "imageurl": "/images/neymarimage1.jpg"},

"lewandowski" : { "name": "lewandowski",
        "dob": "21/08/1988",
        "goals": "445",
        "Clubs": ["Bayern Munich", "Bundesliga", "Poland"],
        "imageurl": "/images/lewandowskiimage1.jpg"},

"reus" : { "name": "reus",
        "dob": "31/05/1989",
        "goals": "204",
        "Clubs": ["Dortmund", "Bundesliga", "Germany"],
       "imageurl": "/images/reusimage1.jpg"},

"kane" : { "name": "kane",
       "dob": "28/07/1993",
       "goals": "237",
       "Clubs": ["Tottenham Hotspurs", "Premier League", "England"],
      "imageurl": "/images/kaneimage1.jpg"
    } 
}

module.exports = { getPeopleData: () => { return peopleData } }