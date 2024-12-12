import { Track } from "./track";

export class Album {
    AlbumName: string = '';
    AlbumId: string = '';
    ArtistName: string = '';
    ArtistId: string = '';
    Image: string= '';
    Tracks: Track[] = [];
    ReleaseDate: string = '';

    constructor() {      
    }
}
