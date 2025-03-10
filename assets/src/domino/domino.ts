import { BasicHeroAttribute } from '../resource/character/attribute';
import { DBHeroInfo, getDBPlayerHerosInfo, updateDBPlayerHeroInfo } from './database/database';

export interface HeroInfo extends DBHeroInfo {
    // 图鉴的基础信息
    basicHeroAttribute?: BasicHeroAttribute
}

// 获取不带基础信息的玩家英雄信息
export function getPlayerHerosInfo(): HeroInfo[] {
    return getDBPlayerHerosInfo();
}

// 更新单个英雄信息
export function updatePlayerHeroInfo(heroInfo: HeroInfo) {
    return updateDBPlayerHeroInfo(heroInfo);
}