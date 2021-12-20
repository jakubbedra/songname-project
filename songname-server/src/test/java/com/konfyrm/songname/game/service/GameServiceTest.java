package com.konfyrm.songname.game.service;

import com.konfyrm.songname.game.manager.AnswersManager;
import com.konfyrm.songname.game.manager.GameManager;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

public class GameServiceTest {

    private AnswersManager mockedAnswersManager;
    private GameManager mockedGameManager;
    private GameService gameService;

    public GameServiceTest() {
        this.mockedAnswersManager = Mockito.mock(AnswersManager.class);
        Mockito.when(mockedAnswersManager.compare("string1", "string1")).thenReturn(true);
        Mockito.when(mockedAnswersManager.compare("string1", "string2")).thenReturn(false);
        this.mockedGameManager = Mockito.mock(GameManager.class);
        this.gameService = new GameService(mockedGameManager, mockedAnswersManager);
    }

    @Test
    public void compareAnswersTest1() {
        //given
        List<String> stringsToCheck = List.of("string1", "string1");
        List<String> stringsCorrect = List.of("string1", "string2");
        //when
        int correctAnswers = gameService.compareAnswers(stringsToCheck, stringsCorrect);
        //then
        Assertions.assertEquals(correctAnswers, 1);
    }

    @Test
    public void compareAnswersTestAllCorrect() {
        //given
        List<String> stringsToCheck = List.of("string1", "string1");
        List<String> stringsCorrect = List.of("string1", "string1");
        //when
        int correctAnswers = gameService.compareAnswers(stringsToCheck, stringsCorrect);
        //then
        Assertions.assertEquals(correctAnswers, 2);
    }

    @Test
    public void compareAnswersTestAllWrong() {
        //given
        List<String> stringsToCheck = List.of("string1", "string1");
        List<String> stringsCorrect = List.of("string2", "string2");
        //when
        int correctAnswers = gameService.compareAnswers(stringsToCheck, stringsCorrect);
        //then
        Assertions.assertEquals(correctAnswers, 0);
    }

}
