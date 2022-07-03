export const paths = {
    fetch: 'fetch-constants',
    search: 'search',
    overview: 'overview',
    matchDetail: 'match-detail',
    matches: 'matches',
    pages: 'pages'
};

export const routes = {
    fetch: paths.fetch,
    search: paths.search,
    pages: {
        overview: paths.pages + '/' + paths.overview,
        matches: paths.pages + '/' + paths.matches,
        matchDetails: paths.pages + '/' + paths.matchDetail,
        search: paths.pages + '/' + paths.search
    }
};

