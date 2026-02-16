Flex Movies App

A movie discovery app built with React, Redux-Saga, and the TMDB API. Browse popular and now-playing movies, search with debounced input, view detailed movie info, and save favorites to localStorage. The entire app is navigable via keyboard (arrow keys, Enter, Escape) with mouse scrolling disabled.

Tech Stack

React 19, TypeScript, Redux + Redux-Saga, Styled Components, React Router

Setup

1. `npm install`
2. Add your TMDB Read Access Token to `.env`:
   ```
   REACT_APP_TMDB_API_TOKEN=your_token_here
   ```
3. `npm start`