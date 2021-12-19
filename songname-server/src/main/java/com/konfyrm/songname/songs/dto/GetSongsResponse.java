package com.konfyrm.songname.songs.dto;

import com.konfyrm.songname.authors.model.Author;
import com.konfyrm.songname.songs.model.Song;

import java.util.LinkedList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class GetSongsResponse {

    public class SongGet {

        private UUID uuid;
        private String title;
        private List<String> authors;

        public SongGet(UUID uuid, String title, List<String> authors) {
            this.uuid = uuid;
            this.title = title;
            this.authors = authors;
        }


        public UUID getUuid() {
            return uuid;
        }

        public String getTitle() {
            return title;
        }

        public List<String> getAuthors() {
            return authors;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public void setAuthor(List<String> authors) {
            this.authors = authors;
        }
    }

    private List<SongGet> songs;

    public GetSongsResponse(List<Song> songs) {
        this.songs = new LinkedList<>();
        songs.forEach(s ->
                this.songs.add(new SongGet(
                        s.getUuid(), s.getTitle(),
                        s.getAuthors().stream().map(Author::getName).collect(Collectors.toList())
                )));
    }

    public List<SongGet> getSongs() {
        return songs;
    }

}
