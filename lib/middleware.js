const flashMiddleware = (req, res, next) => {
        // if there's a flash message, transfer
        // it to the context, then clear it
        res.locals.flash = req.session.flash
        delete req.session.flash
        next()
    }

const getNewsData = () => [
    {
      heading: 'Harry Kane to leave Spurs',
      body: "We have received news that Spurs striker Harry Kane is considering leaving the London club to seek domestic success with a different club. According to our sources, it is believed that Spurs would be wiling to accept offers above £150 million for the England international.",
      Auther: 'Evan Faherty'
    },
    {
        heading: 'West Ham United to Make Champions League',
        body: "West Ham are having the season of their lives as they currently sit 5th in the Premier League table and only remian 2 points behind Chelsea as of the 26th April with only 5 gameweeks left till the end of the season.",
        Auther: 'Evan Faherty',
    }  
  ]
  
  const newsMiddleware = (req, res, next) => {
    if(!res.locals.partials) res.locals.partials = {}
    res.locals.partials.newsContext = getNewsData()
    next()
  }
    
module.exports = { flashMiddleware: flashMiddleware, newsMiddleware: newsMiddleware }