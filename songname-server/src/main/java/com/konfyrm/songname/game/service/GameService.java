package com.konfyrm.songname.game.service;

import com.konfyrm.songname.game.manager.AnswersManager;
import com.konfyrm.songname.game.manager.GameManager;
import com.konfyrm.songname.game.model.Game;
import com.konfyrm.songname.players.model.Player;
import com.konfyrm.songname.songs.model.Song;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class GameService {

    private final GameManager gameManager;
    private final AnswersManager answersManager;

    @Autowired
    public GameService(
            GameManager gameManager,
            AnswersManager answersManager
    ) {
        this.gameManager = gameManager;
        this.answersManager = answersManager;
    }

    public void createGame(UUID uuid, List<Player> players, List<Song> songs, int turns) {
        Game game = gameManager.createNewGame(
                players.stream().map(Player::getUuid).collect(Collectors.toList()),
                songs.stream().map(Song::getUuid).collect(Collectors.toList()),
                turns
        );
        gameManager.addGame(uuid, game);
    }

    public void removeGame(UUID uuid) {
        gameManager.removeGame(uuid);
    }

    public Optional<Game> getGame(UUID uuid) {
        return gameManager.getGame(uuid);
    }

    public void updateGame(UUID uuid, Game game) {
        gameManager.updateGame(uuid, game);
    }

    public boolean compareAnswer(String answer, String real) {
        return answersManager.compare(answer, real);
    }

    public boolean compareAnswers(List<String> answers, List<String> real) {
        List<String> realAnswers = List.copyOf(real);
        for (String answer : answers) {
            boolean correct = false;
            String toRemove = "";
            for (String realAnswer : realAnswers) {
                if (answersManager.compare(answer, realAnswer)) {
                    correct = true;
                    toRemove = realAnswer;
                    break;
                }
            }
            if (correct) {
                realAnswers.remove(toRemove);
            }
        }
        return realAnswers.size() == 0;
    }

}
