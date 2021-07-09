import AnswerList from "../DataLoaders/CoinData.json"
export function MoviesData() {
    return AnswerList
}

export function renderMovieTitle(state, val) {
    return (
        state.C.toLowerCase().indexOf(val.toLowerCase()) !== -1
    );
}