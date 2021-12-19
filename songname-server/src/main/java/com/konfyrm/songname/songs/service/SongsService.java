package com.konfyrm.songname.songs.service;

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
    private final SongFilesRepository filesRepository;

    @Autowired
    public SongsService(
            SongsRepository songsRepository,
            SongFilesRepository songFilesRepository
    ) {
        this.songsRepository = songsRepository;
        this.filesRepository = songFilesRepository;
    }

    public List<Song> getAllSongs() {
        return (List<Song>) songsRepository.findAll();
    }

    public Optional<Song> getSongById(UUID uuid) {
        return songsRepository.findById(uuid);
    }

    public List<Song> getAuthorSongs(UUID authorUuid) {
        List<Song> songs = (List<Song>) songsRepository.findAll();
        return songs.stream()
                .filter(s -> s.getAuthor().getUuid().equals(authorUuid))
                .collect(Collectors.toList());
    }

    public List<Song> getRandomSongs(int count) {
        if (count < 0) {
            return Collections.emptyList();
        }
        Random r = new Random();
        List<Song> allSongs = getAllSongs();
        if (allSongs.size() < count) {
            throw new IllegalStateException("Not enough songs to choose from. \nSelected count: " +
                    count + "\nAvailable songs: " + allSongs.size());
        }
        List<Song> songs = new ArrayList<>();

        for (int i = 0; i < count; i++) {
            int rand = r.nextInt(allSongs.size());
            songs.add(allSongs.get(rand));
            allSongs.remove(rand);
        }
        return songs;
    }

    @Transactional
    public void addSong(Song song) {
        songsRepository.save(song);
    }

    @Transactional
    public void removeSongById(UUID uuid) {
        songsRepository.deleteById(uuid);
    }

    @Transactional
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

}
