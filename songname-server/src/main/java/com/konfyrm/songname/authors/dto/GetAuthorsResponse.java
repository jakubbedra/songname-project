package com.konfyrm.songname.authors.dto;

import com.konfyrm.songname.authors.model.Author;

import java.util.LinkedList;
import java.util.UUID;
import java.util.List;

public class GetAuthorsResponse {

    public class AuthorGet {

        private UUID uuid;
        private String name;

        public AuthorGet(UUID uuid, String name) {
            this.uuid = uuid;
            this.name = name;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public UUID getUuid() {
            return uuid;
        }

        public void setUuid(UUID uuid) {
            this.uuid = uuid;
        }

    }

    private List<AuthorGet> authors;

    public GetAuthorsResponse(List<Author> authors) {
        this.authors = new LinkedList<>();
        authors.forEach( a ->
            this.authors.add(new AuthorGet(a.getUuid(), a.getName()))
        );
    }

    public List<AuthorGet> getAuthors() {
        return authors;
    }

}
