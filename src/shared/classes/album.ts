import { Track } from "./track";

export class Album {
    AlbumName: string = '';
    AlbumId: string = '';
    ArtistName: string = '';
    ArtistId: string = '';
    Genres: string[] = [];
    Image: string= '';
    Tracks: Track[] = [];
    ReleaseDate: string = '';

    constructor() {      
    }
}
