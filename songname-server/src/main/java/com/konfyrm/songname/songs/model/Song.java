package com.konfyrm.songname.songs.model;

import com.konfyrm.songname.authors.model.Author;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "songs")
public class Song implements Serializable {

    @Id
    private UUID uuid;
    private String title;

    @ManyToMany
    private List<Author> authors;

    public Song() {
    }

    public Song(String title, List<Author> authors) {
        this.uuid = UUID.randomUUID();
        this.title = title;
        this.authors = authors;
    }

    public Song(UUID uuid, String title, List<Author> authors) {
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

    public List<Author> getAuthors() {
        return authors;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setAuthors(List<Author> authors) {
        this.authors = authors;
    }

    @Override
    public String toString() {
        return "Song{ uuid: " + uuid + "; title: " + title + ";}";
    }

}
