// 用户装备管理

import { WeaponryAttribute } from "./base";
import { WeaponryKind } from "./enum";
import { Mutex } from "../../utils/mutex";
import { getWeaponryBySerialNumber } from "./weaponry";
import { generateUUID } from "../../utils/uuid";

// 装备互斥锁ID
const weaponryMutexID = "weaponry";
// 文件中的装备ID
const storageWeaponryID = "weaponry"


export interface UserWeaponryAttribute extends WeaponryAttribute {
    // user下的装备id，解决装备重复问题
    weaponryID: string
}

// 用户装备信息
export interface UserWeaponry {
    // 武器信息
    weapons: Map<string, UserWeaponryAttribute>
}

// 用户装备管理器
export class UserWeaponryManager {
    // 装备管理器实例
    private static instance: UserWeaponryManager;
    // 用户装备缓存
    private weaponryCache: UserWeaponry;

    private constructor() {
        // 初始化缓存
        this.weaponryCache = this.getWeaponryFromStorage();
    }

    // 获取用户装备管理器的单例
    public static getInstance(): UserWeaponryManager {
        if (!UserWeaponryManager.instance) {
            UserWeaponryManager.instance = new UserWeaponryManager();
        }

        return UserWeaponryManager.instance;
    }

    // 获取装备缓存
    public getWeaponryFromCache(): UserWeaponry {
        return this.weaponryCache;
    }

    // 从存储中获取装备
    public getWeaponryFromStorage(): UserWeaponry {
        const storedData = localStorage.getItem(storageWeaponryID);
        if (storedData) {
            return JSON.parse(storedData);
        }

        console.log("not init weaponry resource, return null");
        return null;
    }

    // 创建基础装备
    public createWeaponry(serialNumber: string): void {
        try {
            Mutex.getInstance().lock(weaponryMutexID);
            console.info("create weaponry: %s", serialNumber);
            let basicWeaponry = getWeaponryBySerialNumber(serialNumber);
            // 构造装备信息
            let weaponryInfo: UserWeaponryAttribute = {
                ...basicWeaponry,
                weaponryID: generateUUID()
            }
            let currentWeaponry = this.getWeaponryFromStorage();
            switch (weaponryInfo.kind) {
                case WeaponryKind.Weapon:
                    if (currentWeaponry.weapons.has(weaponryInfo.weaponryID)) {
                        // 存在相同的uuid武器了
                        throw new Error(`Failed to create weaponry: Duplicate weaponryID ${weaponryInfo.weaponryID}`);
                    }

                    currentWeaponry.weapons.set(weaponryInfo.weaponryID, weaponryInfo);
                    break;
            }

            this.saveWeaponry(currentWeaponry);
            this.weaponryCache = currentWeaponry;
        } catch (error) {

        }
    }
    // // 更新指定货币资源，入参为增量资源
    // public updateResourceByKind(kind: CurrencyType, amount: number): void {
    //     try {
    //         Mutex.getInstance().lock(weaponryMutexID);
    //         console.info("update currency %s %s", kind, amount);
    //         let currentCurrency = this.getCurrencyFromStorage();
    //         console.info("current currency %s", JSON.stringify(currentCurrency));
    //         let tmp = currentCurrency[kind] + amount;
    //         if (tmp < 0) {
    //             console.error("Failed to update currency, %s is not enough, current:%d, need: %d",
    //                 kind, currentCurrency[kind], Math.abs(amount));
    //             throw new Error(`Failed to update currency: Insufficient resources`);
    //         }

    //         currentCurrency[kind] = tmp;
    //         // 保存更新后的资源
    //         this.saveResources(currentCurrency);
    //         // 更新缓存
    //         this.currencyCache = currentCurrency;
    //         let news = this.getCurrencyFromStorage();
    //         console.info("after set is %s", JSON.stringify(news));
    //         Mutex.getInstance().unlock(currencyMutexID);
    //     } catch (error) {
    //         console.error("Failed to update currency, err: %s", error.message);
    //         if (error instanceof VisibleError) {
    //             // 非加锁失败的错误需要解锁
    //             if (error.code != ERROR_CODES.LOCK_FAILED) {
    //                 Mutex.getInstance().unlock(currencyMutexID);
    //             }
    //         }

    //         throw new Error(`Failed to update currency: ${error.message}`);
    //     }
    // }

    // // 更新货币资源，入参为增量资源
    // public updateResource(currency: Currency): void {
    //     try {
    //         Mutex.getInstance().lock(currencyMutexID);
    //         console.info("update currency %s", JSON.stringify(currency));
    //         let currentCurrency = this.getCurrencyFromStorage();
    //         console.info("current currency %s", JSON.stringify(currentCurrency));
    //         for (const key of Object.keys(currency) as (keyof Currency)[]) {
    //             let tmp = currentCurrency[key] + currency[key];
    //             if (tmp < 0) {
    //                 console.error("Failed to update currency, %s is not enough, current:%d, need: %d",
    //                     key, currentCurrency[key], Math.abs(currency[key]));
    //                 throw new Error(`Failed to update currency: Insufficient resources`);
    //             }

    //             currentCurrency[key] = tmp;
    //         }
    //         // 保存更新后的资源
    //         this.saveResources(currentCurrency);
    //         // 更新缓存
    //         this.currencyCache = currentCurrency;
    //         let news = this.getCurrencyFromStorage();
    //         console.info("after set is %s", JSON.stringify(news));
    //         Mutex.getInstance().unlock(currencyMutexID);
    //     } catch (error) {
    //         console.error("Failed to update currency, err: %s", error.message);
    //         // 非加锁失败的错误需要解锁
    //         if (!(error instanceof VisibleError) || error.code != ERROR_CODES.LOCK_FAILED) {
    //             Mutex.getInstance().unlock(currencyMutexID);
    //         }

    //         throw new Error(`Failed to update currency: ${error.message}`);
    //     }
    // }

    // 保存资源到本地存储
    private saveWeaponry(weaponry: UserWeaponry) {
        try {
            console.info("save weaponry %s ", JSON.stringify(weaponry));
            localStorage.setItem(storageWeaponryID, JSON.stringify(weaponry));
        } catch (error) {
            console.error("save %s failed, error: %s", storageWeaponryID, error.message);
            throw new Error(`Failed to save weaponry: ${error.message}`);
        }
    }
}