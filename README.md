# Next Movies

## About this project

Next Movies is a web app where you can browse and search for movies and tv shows. This was purely a frontend project, all data was
fetched from the [TMDb](https://www.themoviedb.org/documentation/api) api. The design was also heavily inspired by their web app too.
I have a previous project, [Fabflix](https://jasonbugallon.com/projects/fabflix) that is the same idea as this
but it is now very dated as it was my first ever web app. It was made using jquery and the design was not very satisfactory, it also
had a small amount of features. Next Movies is a lot more than Fabflix and I chose to do this project because I believe it was a great
project to show the full capabilities of the Static Site Generation (SSG) of Next.js.

## Roadblocks

There were two big roadblocks I faced when working on this project. The first was statically generating two million pages and the second was
optimizing the web app to improve performance.

### Static Site Generation

Initially, my SSG setup was to generate every single page statically in build time. That means,
I had to generate a bit over two million different pages statically during build time. Before I tried to deploy my app, I did not think
how many pages I would create and how long it would take to do this in build time. If I were to have stuck to this setup it would have taken
hours or even days to build my app. To solve this problem, I chose to only generate the most popular pages during build time.
The rest of the pages would be generated on demand. If a user were to hit a page that was not generated yet then they would encounter
a loading state, where I would show a skeleton of the page they would see, once the page is generated the next users who visit that page would
not see the loading skeleton as the page has already been generated.

### Optimization

Optimizing performance was the largest roadblock I faced while working on this app. To be honest, in terms of optimization, the current
state of Next Movies can still be much better, however it is a lot better before I made the optimizations it has now. Before I made any
optimizations, the google lighthouse score of the home page was at a low of 64, after I implemented them it went up to a high of 84. Other pages
also increased in performance. The optimization I implemented was code splitting. There were many aspects of the UI that were invisible
to the user on initial load, such as the mobile navigation menu, or the video modal when you click on a video. Even though these things are
invisible, the components that involve these elements are still loaded and adds to the bundle size, which greatly slowed down performance.
With code splitting, I was able to relegate the loading of these components only when they are needed. For example, the trailer modal component
won't be loaded until after you click to show a video. I implemented code splitting of all components that were not intially visible on initial
load. However, there is still one thing that still needs to be addressed and that is the carousel. I use carousels in various different pages,
in my app. The carousels I use in my app is not actually something I made from scratch, it is a third party library from npm. This carousel,
does not let you lazy load the elements shown on the carousel, it only lazy loads the images of the elements but the elements are still
in the DOM, just invisible. This behavior slows down initial load times because instead of only loading the visible elements of the carousel,
it loads them all into the component tree. I wish to address this in the future, but it would take some time to do as I would have to implement
my own carousel component by scratch that solves this issue.

## Features

With Next Movies, you can browse using multiple different fields as filters, such as, genres, tv network, company, rating, release date, and more.
You can also sort movies and tv shows by popularity, rating, and release date. You can not only search for just movies and tv shows, you can
also search for tv networks, companies, keywords, and people (actors and crew). Next movies' home page displays a plethora of helpful
selection of movies and tv shows to get your started. It displays the most popular media (Movies and TV Shows), trending media with trailers, that updates daily,
top rated media, now playing/upcoming movies, and tv shows that are airing today or within this week. All this data is dynamic and updates
in the background thanks to the power of Next.js' incremental static regeneration. With this feature of Next.js, it lets you turn
static pages into dynamic pages. It does this by generating the new page with the fresh data in the background and when it is ready,
it replaces the old page with the new page. It does this every X amount of seconds, the X is configurable. If generating the new page fails, then the app
will not break, it will just continue to show the old page. This is a very powerful feature of Next.js. There are many more features
of Next Movies, these are just some notable ones. To find out more please check out the web app!

## Tech Stack

- Typescript
- React
- Next.js
- Chakra UI
- Framer Motion (animations)
- SWR