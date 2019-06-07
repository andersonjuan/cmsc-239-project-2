import React from 'react';

/* All text below was taken from the src/article_text.md file
  Be sure to check that the following text matches the authoratative source file
*/

export function Intro() {
  return (<div>{<p style={{backgroundColor: "#e3dedb"}}>{`
  In total, the last two Olympic Games were viewed by more than 5 billion people
  worldwide. They are so popular, in fact, that my grandma knows who
  Michael Phelps is. My friends and I encountered multiple near-death
  experiences on the ski slopes attempting to imitate our collective idol, Shaun White. At
  some point in time, I also tried to pull off his hairstlye.

  In this explorable, I present a number of different ways to think about Olympic data for
  the past 50 eyars. But, before moving onto those beautiful visualizations, let's take a
  brief look at Olympic history to emphasize the importance of the event and its changing
  nature over time.

  The first Oympic games took place more than 2,700 years ago in Olympia in the south
  west of Greece. These early games were actually a religious festival, paying tribute
  to the Greek god Zeus, the king of all gods. Taking place once every four years, nearly
  50,000 people attended the first few Olympic games. Those that did in 720 BC saw, well, a little
  too much of Orspippos after he lost his shorts in a race.

  The games continued in largely the same fashion until 393-4 AD. At that point, power in the ancient world
  had shifted from the Greeks to the Romans. The games, centered around the Greeks' polytheistic
  beliefs, didn't cut the mustard for the monotheistic Romans. Therefore, in 393 or 394 AD,
  Roman Emperor Theodosius abolished the games *sigh*.

  But, alas, the games would go on! After a brief hiatus of 1503 years! The 1896 games ended
  the hiatus and were held in Athens (in the home country of the Olympics). But, instead of being
  granted only olive wreaths--as they were previously--winners were given both an olive wreath
  and a silver medal. In the 1904 games in St. Louis, the Olympics began the practice of giving
  gold, silver, and bronze medals to the first, second, and thrid place finishers, respectively.

  The 1896 games began the "Modern Era" of the Olympics, an era in which we find ourselves today.
  The most major change since then--aside from the medals--was the introduction of the Winter Olympics
  in 1924. Both events are held every four years, but are offset by two years. For example, 2008 was
  a year for the Summer Olympics while 2010 was a Winter Olympics year.

  Well, that covers most of the important history. But, like, what's happened in the Olympics recently?

  I AM GLAD YOU ASKED! The rest of the article is dedicated to exploring Olympics trends since 1975,
  Grandma's favorite years.\n`}</p>}</div>);
}

export function Para1() {
  return (<div>{<p style={{backgroundColor: "#e3dedb"}}>{`
    The first question is somewhat obvious for fans of the Olympics: which countries are good?
    In recent years, countries have invested huge amounts of money into their Olympic teams,
    hoping that their athletes will bring home the coveted prizes of gold, silver,
    and bronze medals.
    Winning these medals a country bragging rights and
    more, like tangible rights such as sway over international sports organizations.
    Knowing this, it's fairly easy to imagine that countries will do whatever it
    takes to ensure their medal count increases (who doesn't love good bragging rights?).
    So who is winning the arms' race? You can use the dropdown to select a country. You can also
    select medal type.
    `}</p>}</div>);
}

export function Para2() {
  return (<div>{<p style={{backgroundColor: "#e3dedb"}}
  >{`
    That was pretty cool, right?

    Well, you know the old saying: if some must be good, then more must be better!
    Our first graph just looked at countries broadly, but obviously some countries may specialize
    in certain sports, due to geographic climate or national interest. Meanwhile, some
    other nations are large enough and diverse enough to have be strong across the board, like
    the United States. The graphs below presents the results of
    data filtered by country and colored by sport. As before, you can also be a little
    more specific and examine what
    types of medals they won: gold, silver, or that sweet sweet bronze. Note that, if a country
    has never participated in the Olympic event, that event's data points are not included for the country.
    This makes reading the graph easier, and draws attention towards the more relevant observations.
    `}</p>}</div>);
}

export function Para3() {
  return (<div>{<p style={{backgroundColor: "#e3dedb"}}>{`
    As we can see, some countries rake in medals consistently! The dominance of some
    nations, such as the United States in Women's Gymnastics, is a well-known and
    well-documented phenomena. Other countries seem to have dominated early on
    in certain sports but have leveled off, while others have seen the reverse.

    Many people suggest that the world is moving towards increased globalization,
    so I have decided to do so as well in our next statistical glimpses.
    With countries aside, one of the more interesting questions is how do
    the ages of athletes' vary across different sports? And what is generally the
    best age for winning? So, I BREAK DOWN THOSE COUNTRY BORDERS
    and group the athletes by sport. Then I plot those points on medals won vs age.
    Feel free to toggle from sport to sport using the dropdown menu, and say hi
    to my 70-year old friend participating in Shooting on your way by!
    `}</p>}</div>);
}

export function Para4() {
  return (<div>{<p style={{backgroundColor: "#e3dedb"}}>{`
    So, that was pretty cool, huh? I'm sure you enjoyed looking at a players' success by
    in various sports. But, can we look at participants using other metrics like height
    and weight? We certainly can, and we do in the viz below!

    Note that there is a slight twist to this one. Rather than simply plotting medals won
    vs. these statistics, I take a time series look with a series of box-and-whisker plots
    after you, dear reader, select a sport and an attribute. This is meant to give you a
    better idea of the average participant in comparison to outliers, as well as the spread
    along that category. Get clicking!
    `}</p>}</div>);
}

export function Para5() {
  return (<div>{<p style={{backgroundColor: "#e3dedb"}}>{`
    Now, that was pretty cool, but I'm sure a few of you geography geeks want me to bring locations back!
    So, I did in creating the viz that is the grand-daddy of them all. To illustrate the relationship
    between geogrpahic location, age, weight, height, and medals one, I have created a multiple-axis
    plot. Simply select a sport, a year, and a summary statistic. Then, the magic of this viz will form
    a line for each continent to the continent's summary statistic of age, to the continent's summary statistic of weight, to the
    summary statistic of height, to the number of medals the continent won in that sport.`}</p>}</div>);
}

// Holds the transition from the fourth graph to the last visualization
// unwritten as it's unclear
// export function Para6(props) {
//   return (<div>{<p>{``}</p>}</div>)
// }

export function Conclusion() {
  return (<div>{<p style={{backgroundColor: "#e3dedb"}}>{`
    At this point we have a pretty good view of the Olympics and the Olympians
    who compete for their respective nations. We've tried to find a group of factors
    that could explain the amount of medal's participating nations have gotten in the
    Olympics.`}</p>}</div>);
}
