// 用户装备管理

import { WeaponryAttribute } from "./base";
import { WeaponryKind } from "./enum";
import { Mutex } from "../../utils/mutex";
import { getWeaponryBySerialNumber } from "./weaponry";
import { generateUUID } from "../../utils/uuid";
import { VisibleError, ERROR_CODES } from "../../utils/errors";

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
        // TODO 后续删掉，不清理本地缓存
        localStorage.removeItem(storageWeaponryID);
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
            const parsedData = JSON.parse(storedData);
            const weaponsMap = new Map<string, UserWeaponryAttribute>(parsedData.weapons);
            return { weapons: weaponsMap };
        }

        console.log("not init weaponry resource, return null");
        return {
            // 初始化为空的 Map
            weapons: new Map<string, UserWeaponryAttribute>()
        };
    }

    // 创建基础装备
    public createWeaponry(serialNumberList: string[]): UserWeaponry {
        try {
            Mutex.getInstance().lock(weaponryMutexID);
            let currentWeaponry = this.getWeaponryFromStorage();
            let createWeaponry = { weapons: new Map<string, UserWeaponryAttribute>() };
            for (let serialNumber of serialNumberList) {
                console.info("create weaponry serial number %s", serialNumber);
                let basicWeaponry = getWeaponryBySerialNumber(serialNumber);
                // 构造装备信息
                let weaponryInfo: UserWeaponryAttribute = {
                    ...basicWeaponry,
                    weaponryID: generateUUID()
                }

                console.info("basic weaponry %s", JSON.stringify(weaponryInfo));
                switch (weaponryInfo.kind) {
                    case WeaponryKind.Weapon:
                        if (currentWeaponry.weapons.has(weaponryInfo.weaponryID)) {
                            console.error("serial number %s have duplicate id %s", serialNumber, weaponryInfo.weaponryID);
                            // 存在相同的uuid武器了
                            throw new Error(`Failed to create weaponry: Duplicate weaponryID ${weaponryInfo.weaponryID}`);
                        }

                        currentWeaponry.weapons.set(weaponryInfo.weaponryID, weaponryInfo);
                        createWeaponry.weapons.set(weaponryInfo.weaponryID, weaponryInfo);
                        break;
                }
            }

            this.saveWeaponry(currentWeaponry);
            this.weaponryCache = currentWeaponry;
            Mutex.getInstance().unlock(weaponryMutexID);
            return createWeaponry;
        } catch (error) {
            if (!(error instanceof VisibleError) || error.code != ERROR_CODES.LOCK_FAILED) {
                Mutex.getInstance().unlock(weaponryMutexID);
            }
            throw new Error(`Failed to create weaponry: ${error.message}`);
        }
    }

    // 更新指定装备
    public updateWeaponry(weaponry: UserWeaponryAttribute): void {
        try {
            Mutex.getInstance().lock(weaponryMutexID);
            console.info("update weaponry kind: %s, attribute: %s", weaponry.kind, JSON.stringify(weaponry));
            let currentWeaponry = this.getWeaponryFromStorage();
            console.info("current weaponry %s", JSON.stringify(currentWeaponry));
            switch (weaponry.kind) {
                case WeaponryKind.Weapon:
                    if (!currentWeaponry.weapons.has(weaponry.weaponryID)) {
                        // 武器不存在，报错
                        console.error("weapon: %s not exist", JSON.stringify(weaponry));
                        throw new Error(`Weapon not exist`);
                    }

                    currentWeaponry.weapons[weaponry.weaponryID] = weaponry;
                    break;
            }

            // 保存更新后的资源
            this.saveWeaponry(currentWeaponry);
            // 更新缓存
            this.weaponryCache = currentWeaponry;
            Mutex.getInstance().unlock(weaponryMutexID);
        } catch (error) {
            if (!(error instanceof VisibleError) || error.code != ERROR_CODES.LOCK_FAILED) {
                Mutex.getInstance().unlock(weaponryMutexID);
            }

            throw new Error(`Failed to update weaponry: ${error.message}`);
        }
    }

    // 删除装备
    public deleteWeaponry(weaponry: UserWeaponryAttribute): void {
        try {
            Mutex.getInstance().lock(weaponryMutexID);
            console.info("delete weaponry kind: %s, attribute: %s", weaponry.kind, JSON.stringify(weaponry));
            let currentWeaponry = this.getWeaponryFromStorage();
            switch (weaponry.kind) {
                case WeaponryKind.Weapon:
                    if (!currentWeaponry.weapons.has(weaponry.weaponryID)) {
                        // 武器不存在，直接退出
                        console.warn("weapon: %s not exist", JSON.stringify(weaponry));
                        return;
                    }

                    currentWeaponry.weapons.delete(weaponry.weaponryID);
                    break;
            }

            // 保存更新后的资源
            this.saveWeaponry(currentWeaponry);
            // 更新缓存
            this.weaponryCache = currentWeaponry;
            Mutex.getInstance().unlock(weaponryMutexID);
        } catch (error) {
            if (!(error instanceof VisibleError) || error.code != ERROR_CODES.LOCK_FAILED) {
                Mutex.getInstance().unlock(weaponryMutexID);
            }

            throw new Error(`Failed to delete weaponry: ${error.message}`);
        }
    }

    // 保存资源到本地存储
    private saveWeaponry(weaponry: UserWeaponry) {
        try {
            const weaponsArray = Array.from(weaponry.weapons.entries());
            localStorage.setItem(storageWeaponryID, JSON.stringify({ weapons: weaponsArray }));
        } catch (error) {
            console.error("save %s failed, error: %s", storageWeaponryID, error.message);
            throw new Error(`Failed to save weaponry: ${error.message}`);
        }
    }
}