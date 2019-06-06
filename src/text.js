import React from 'react';

/* All text below was taken from the src/article_text.md file
  Be sure to check that the following text matches the authoratative source file
*/

export function Intro() {
  return (<div>{<p>{`
  The Olympics is among the most well-known international competitions, rivaled only by
  the World Cup. The Olympics are a collection of athletic competitions that pit
  the very best from around the globe against each other to determine who among them
  are the best of the best in their respective sports. The Olympics are broken into
  two different categories, winter and summer, with both occurring every four years.
  It is interesting to note that the winter and summer games are offset by two years
  from each other i.e. if the winter games occur in 2000 then the summer games
  happen in 2002.\n`}</p>}</div>);
}

export function Para1() {
  return (<div>{<p>{`
    Countries often invest huge amounts of money into their Olympic teams with the
    hope that their athletes will bring home the coveted prizes of gold, silver,
    and bronze medals. Winning these medals gives country's bragging rights and
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
