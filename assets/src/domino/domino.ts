import { deepCopy } from '../utils/copy';
import { dbConvert2Hero, getHerosBasicAttMap } from './convert';
import { CharacterBasicAttribute, DBPlayerHero, getDBHerosBasicAttribute, getDBPlayerHerosInfo, updateDBPlayerHeroInfo } from './database/database';

export interface HeroInfo extends DBPlayerHero {
    // 图鉴的基础信息
    basicHeroAttribute?: CharacterBasicAttribute
}

// 获取不带基础信息的玩家英雄信息
export function getPlayerHerosNoBase(): HeroInfo[] {
    return getDBPlayerHerosInfo();
}

// 更新单个英雄信息
export function updatePlayerHeroNoBase(heroInfo: HeroInfo) {
    return updateDBPlayerHeroInfo(heroInfo);
}

// 获取英雄基础信息
export function getHerosBasicAttribute(): CharacterBasicAttribute[] {
    return getDBHerosBasicAttribute();
}

// 获取带基础信息的玩家英雄信息
export function getPlayerHeros(): HeroInfo[] {
    var playerHeros = deepCopy(getDBPlayerHerosInfo());
    var heroBasicAttMap = getHerosBasicAttMap(getDBHerosBasicAttribute());
    var heros: HeroInfo[] = [];
    playerHeros.forEach((heroTmp) => {
        let heroInfo: HeroInfo = dbConvert2Hero(heroTmp, heroBasicAttMap.get(heroTmp.seqID));
        heros.push(heroInfo);
    });

    return heros;
}
