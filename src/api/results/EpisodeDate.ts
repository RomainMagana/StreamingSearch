import {Series} from "../response/Series";

export interface EpisodeDate {
    page: number,
    pages: number,
    total: number,
    tv_shows: Series[];
}