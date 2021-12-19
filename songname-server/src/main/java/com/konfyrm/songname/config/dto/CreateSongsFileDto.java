package com.konfyrm.songname.config.dto;

import com.konfyrm.songname.authors.model.Author;
import com.konfyrm.songname.songs.model.Song;

import java.util.LinkedList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class CreateSongsFileDto {

    public class SongGet {

        private UUID uuid;
        private String title;
        private List<UUID> authorUuids;

        public SongGet(UUID uuid, String title, List<UUID> authorUuids) {
            this.uuid = uuid;
            this.title = title;
            this.authorUuids = authorUuids;
        }

        public UUID getUuid() {
            return uuid;
        }

        public String getTitle() {
            return title;
        }

        public List<UUID> getAuthorUuids() {
            return authorUuids;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public void setAuthorUuids(List<UUID> authorUuids) {
            this.authorUuids = authorUuids;
        }
    }

    private List<SongGet> songs;

    public CreateSongsFileDto(List<Song> songs) {
        this.songs = new LinkedList<>();
        songs.forEach(s ->
                this.songs.add(new SongGet(
                        s.getUuid(), s.getTitle(),
                        s.getAuthors().stream()
                                .map(Author::getUuid)
                                .collect(Collectors.toList()))
                ));
    }

    public List<SongGet> getSongs() {
        return songs;
    }

    public void setSongs(List<SongGet> songs) {
        this.songs = songs;
    }

}
