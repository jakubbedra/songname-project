package com.konfyrm.songname.songs.service;

import com.konfyrm.songname.authors.model.Author;
import com.konfyrm.songname.authors.repository.AuthorsRepository;
import com.konfyrm.songname.songs.repository.SongFilesRepository;
import com.konfyrm.songname.songs.repository.SongsRepository;
import com.konfyrm.songname.songs.model.Song;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SongsService {

    private final SongsRepository songsRepository;
    private final AuthorsRepository authorsRepository;
    private final SongFilesRepository filesRepository;

    private final Random r;

    @Autowired
    public SongsService(
            SongsRepository songsRepository,
            AuthorsRepository authorsRepository,
            SongFilesRepository songFilesRepository
    ) {
        this.songsRepository = songsRepository;
        this.authorsRepository = authorsRepository;
        this.filesRepository = songFilesRepository;
        r = new Random();
    }

    public List<Song> getAllSongs() {
        return (List<Song>) songsRepository.findAll();
    }

    public Optional<Song> getSongById(UUID uuid) {
        return songsRepository.findById(uuid);
    }

    public List<Song> getAuthorSongs(UUID authorUuid) {
        Optional<Author> author = authorsRepository.findById(authorUuid);
        List<Song> songs = (List<Song>) songsRepository.findAll();
        return songs.stream()
                .filter(s -> authorshipExists(s, author.get()))
                .collect(Collectors.toList());
    }

    public List<Song> getRandomSongs(int count) {
        if (count < 0) {
            return Collections.emptyList();
        }
        List<Song> allSongs = getAllSongs();
        if (allSongs.size() < count) {
            throw new IllegalStateException("Not enough songs to choose from. \nSelected count: " +
                    count + "\nAvailable songs: " + allSongs.size());
        }

        return selectRandomSongs(allSongs, count);
    }

    public List<Song> getRandomSongs(int count, List<UUID> excludedAuthors) {
        if (count < 0) {
            return Collections.emptyList();
        }
        List<Song> allSongs = getAllSongs();
        if (allSongs.size() < count) {
            throw new IllegalStateException("Not enough songs to choose from. \nSelected count: " +
                    count + "\nAvailable songs: " + allSongs.size());
        }
        return selectRandomSongs(filterSongList(allSongs, excludedAuthors), count);
    }

    @Transactional
    public void addSong(Song song) {
        songsRepository.save(song);
    }

    @Transactional
    public void removeSongById(UUID uuid) {
        songsRepository.deleteById(uuid);
    }

    public void updateSong(Song song) {
        songsRepository.deleteById(song.getUuid());
        songsRepository.save(song);
    }

    public void uploadFile(UUID uuid, InputStream is) {
        songsRepository.findById(uuid).ifPresent(song -> {
            try {
                filesRepository.save(uuid, is.readAllBytes());
            } catch (IOException e) {
                throw new IllegalStateException();
            }
        });
    }

    public InputStream getFileById(UUID uuid) {
        Optional<Song> song = songsRepository.findById(uuid);
        if (song.isPresent()) {
            try {
                return filesRepository.getById(uuid);
            } catch (IOException e) {
                throw new IllegalStateException();
            }
        } else {
            throw new IllegalStateException();
        }
    }

    public void updateFile(UUID uuid, InputStream is) {
        songsRepository.findById(uuid).ifPresent(song -> {
            try {
                filesRepository.deleteById(uuid);
                filesRepository.save(uuid, is.readAllBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }

    private boolean authorshipExists(Song song, Author author) {
        return song.getAuthors().stream().anyMatch(a -> a.getUuid().equals(author.getUuid()));
    }

    private boolean authorshipExists(Song song, UUID authorUuid) {
        return song.getAuthors().stream().anyMatch(a -> a.getUuid().equals(authorUuid));
    }

    private List<Song> filterSongList(List<Song> songs, List<UUID> excludedAuthors) {
        return songs.stream().filter(s -> {
            for (UUID author : excludedAuthors) {
                if (authorshipExists(s, author)) {
                    return false;
                }
            }
            return true;
        }).collect(Collectors.toList());
    }

    private List<Song> selectRandomSongs(List<Song> songs, int count) {
        List<Song> selectedSongs = new ArrayList<>();

        for (int i = 0; i < count; i++) {
            int rand = r.nextInt(songs.size());
            selectedSongs.add(songs.get(rand));
            songs.remove(rand);
        }
        return selectedSongs;
    }

}
