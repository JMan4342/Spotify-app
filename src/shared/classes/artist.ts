import { Track } from "./track";

export class Artist {
    ArtistName: string = '';
    ArtistId: string = '';
    Genres: string[] = [];
    Image: string= '';
    TopTracks: Track[] = [];

    constructor() {      
    }
}
