import {BoardGamesBasicInfoState} from "../wizards/BoardGamesStep/BoardGamesBasicInfo";
import {GameDetailsState} from "../wizards/BoardGamesStep/BoardGamesDetails";
import {IBoardGame, IVideoGame} from "../api/interfaces";
import {GamesBasicInfoState} from "../wizards/GamesStep/GamesBasicInfo";
import {VideoGameDetailsState} from "../wizards/GamesStep/GamesDetails";

export interface BoardGameDetailsCommonProps {
    players?: string;
    basicInfo: BoardGamesBasicInfoState;
    details: GameDetailsState;
    selectedGame: IBoardGame | null;
}

export interface DetailsStepContentProps {
    basicInfo: GamesBasicInfoState;
    details: VideoGameDetailsState;
    selectedGame: IVideoGame | null;
}
