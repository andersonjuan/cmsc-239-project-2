import React from 'react';

/* All text below was taken from the src/article_text.md file
  Be sure to check that the following text matches the authoratative source file
*/

export function Intro() {
  return (<div>{<p>{`
  In total, the last two Olympics have been viewed by more than 5 billion people 
  worldwide. However, many forget the origins of the Olympics, and their original purpose.
  But, how did we get here and what was the original purpose of these games?
  
  The first Oympic games took place more than 2,700 years ago in Olympia in the south
  west of Greece. These early games were actually a religious festival, paying tribute
  to the Greek god Zeus, the king of all gods. Taking place once every four years, nearly
  50,000 people attended the first few Olympic games. Those that did in 720 BC saw, well, too much
  of Orspippos after he lost his shorts in a race.
  
  The games have developed substantically since the days of Orspippos. Now, the Olympics 
  are a collection of athletic competitions that pit
  the very best from around the globe against each other, and lack the religious compoent. 
  Moreover, the games are now broken into
  two different categories, winter and summer. Each occurrs every four years.
  The winter and summer games are offset by two years
  from each other such that 2008 was the year for the Summer Olympics while 2010 was a 
  Winter Olympics year.\n`}</p>}</div>);
}

export function Para1() {
  return (<div>{<p>{`
    In recent years, countries have invested huge amounts of money into their Olympic teams,
    hoping that their athletes will bring home the coveted prizes of gold, silver,
    and bronze medals (interestingly enough, medals weren't even introduced to the Olympics
    until 1896; before that, the winners were simply crowned with olive wreaths).
    Winning these medals a country bragging rights and
    other more, tangible rights such as sway over international sports organizations.
    Knowing this, it's fairly easy to imagine that countries will do whatever it
    takes to ensure their medal count increases (who doesn't love good bragging rights?).
    So what does the distribution of medals among countries look like?
    `}</p>}</div>);
}

export function Para2() {
  return (<div>{<p>{`
    There is a perception that certain countries are dominant in specific sports
    while others seem to be great at just about every sport they send athletes to
    compete in. Take a look at the graphs below, which presents the results of
    data filtered by sport and country that you choose. Do certain countries win
    more medals than others? But let's be a little more specific and examine what
    types of medals they won: gold, silver, or that sweet sweet bronze.
    `}</p>}</div>);
}

export function Para3() {
  return (<div>{<p>{`
    As we can see, some countries rake in medals consistently! The dominance of some
    nations, such as the United States in Women's Gymnastics, is a well-known and
    well-documented phenomena. Other countries seem to have dominated early on
    in certain sports but have leveled off, while others have seen the reverse.
    Now those results could be related to the actual competitors each nation is
    sending to the games rather to some factor about those countries.
    Age tends to be a common factor thrown around when people
    talk about the 'viability' or 'long-term prospects' for individual players.
    But is there any relationship between an athletes age and the medals they win?
    `}</p>}</div>);
}

export function Para4() {
  return (<div>{<p>{`
    Now we know that age isn't by any means the major factor that determines whether
    someone wins a medal or not, is it? Taking into account other factors that affect
    an athlete's performance, such as height and weight, may be illustrative.
    But rather than just showing some linear relationships out of the data, lets
    do a bit more of a deep dive. Examining age, height, and weight by country using
    summary statistics as a way to give us a better idea of how a specific country's
    athletes perform along those factors.
    `}</p>}</div>);
}

export function Para5() {
  return (<div>{<p>{`
    Athletes from certain countries appear to be steadily getting taller! This
    could be a result of taller athletes performing better, but also quite likely
    that the impact of wars in the mid-20th century impacted heavily the people
    available to participate (clearly taller people fight better, right?). But does
    the increasing height of athletes from certain nations actually impact the
    medal outcome? I don't know about you, but we feel there's probably some other
    factors in there that can we can dive into to get some more clarity.`}</p>}</div>);
}

// Holds the transition from the fourth graph to the last visualization
// unwritten as it's unclear
// export function Para6(props) {
//   return (<div>{<p>{``}</p>}</div>)
// }

export function Conclusion() {
  return (<div>{<p>{`
    At this point we have a pretty good view of the Olympics and the Olympians
    who compete for their respective nations. We've tried to find a group of factors
    that could explain the amount of medal's participating nations have gotten in the
    Olympics.`}</p>}</div>);
}
