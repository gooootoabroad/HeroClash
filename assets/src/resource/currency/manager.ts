// 资源管理模块
// 铜钱 进阶石 铁矿 战魂石 和田玉
import { CurrencyType, Currency } from "./kind";
import { Mutex } from "../../utils/mutex";
import { VisibleError, ERROR_CODES } from "../../utils/errors";

// 货币资源互斥锁ID
const currencyMutexID = "currency";
// 文件中的货币资源ID
const storageCurrencyID = "currency"

// function sleep(ms: number): Promise<void> {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// 货币资源管理器
export class CurrencyManager {
    // 货币资源管理器实例
    private static instance: CurrencyManager;
    // 货币缓存
    private currencyCache: Currency;

    private constructor() {
        // TODO 先清掉本地缓存，后续删除
        localStorage.removeItem(storageCurrencyID);
        // 初始化缓存
        this.currencyCache = this.getCurrencyFromStorage();
    }

    // 获取货币资源管理器的单例
    public static getInstance(): CurrencyManager {
        if (!CurrencyManager.instance) {
            CurrencyManager.instance = new CurrencyManager();
        }

        return CurrencyManager.instance;
    }

    // 获取货币缓存
    public getCurrencyFromCache(): Currency {
        return this.currencyCache;
    }

    // 从存储中获取货币
    public getCurrencyFromStorage(): Currency {
        const storedData = localStorage.getItem(storageCurrencyID);
        if (storedData) {
            return JSON.parse(storedData);
        }

        console.log("not init currency resource, return default currency");
        return this.getDefaultCurrency();
    }

    // 获取默认的资源数据
    private getDefaultCurrency(): Currency {
        return {
            // TODO 默认给点资源，测试用
            copper: 1000,
            evolutionStone: 1000,
            ironOre: 1000,
            battleSoulStone: 1000,
            hetianJade: 1000,
        };
    }

    // 检查指定ID的资源是否足够
    public checkResource(currency: Currency): boolean {
        for (const key of Object.keys(currency) as (keyof Currency)[]) {
            if (this.currencyCache[key] < Math.abs(currency[key])) {
                return false;
            }
        }

        return true;
    }

    // 更新指定货币资源，入参为增量资源
    public updateResourceByKind(kind: CurrencyType, amount: number): void {
        try {
            Mutex.getInstance().lock(currencyMutexID);
            console.info("update currency %s %s", kind, amount);
            let currentCurrency = this.getCurrencyFromStorage();
            console.info("current currency %s", JSON.stringify(currentCurrency));
            let tmp = currentCurrency[kind] + amount;
            if (tmp < 0) {
                console.error("Failed to update currency, %s is not enough, current:%d, need: %d",
                    kind, currentCurrency[kind], Math.abs(amount));
                throw new Error(`Failed to update currency: Insufficient resources`);
            }

            currentCurrency[kind] = tmp;
            // 保存更新后的资源
            this.saveResources(currentCurrency);
            // 更新缓存
            this.currencyCache = currentCurrency;
            let news = this.getCurrencyFromStorage();
            console.info("after set is %s", JSON.stringify(news));
            Mutex.getInstance().unlock(currencyMutexID);
        } catch (error) {
            console.error("Failed to update currency, err: %s", error.message);
            if (!(error instanceof VisibleError) || error.code != ERROR_CODES.LOCK_FAILED) {
                Mutex.getInstance().unlock(currencyMutexID);
            }

            throw new Error(`Failed to update currency: ${error.message}`);
        }
    }

    // 更新货币资源，入参为增量资源
    public updateResource(currency: Currency): void {
        try {
            Mutex.getInstance().lock(currencyMutexID);
            console.info("update currency %s", JSON.stringify(currency));
            let currentCurrency = this.getCurrencyFromStorage();
            console.info("current currency %s", JSON.stringify(currentCurrency));
            for (const key of Object.keys(currency) as (keyof Currency)[]) {
                let tmp = currentCurrency[key] + currency[key];
                if (tmp < 0) {
                    console.error("Failed to update currency, %s is not enough, current:%d, need: %d",
                        key, currentCurrency[key], Math.abs(currency[key]));
                    throw new Error(`Failed to update currency: Insufficient resources`);
                }

                currentCurrency[key] = tmp;
            }
            // 保存更新后的资源
            this.saveResources(currentCurrency);
            // 更新缓存
            this.currencyCache = currentCurrency;
            let news = this.getCurrencyFromStorage();
            console.info("after set is %s", JSON.stringify(news));
            Mutex.getInstance().unlock(currencyMutexID);
        } catch (error) {
            console.error("Failed to update currency, err: %s", error.message);
            // 非加锁失败的错误需要解锁
            if (!(error instanceof VisibleError) || error.code != ERROR_CODES.LOCK_FAILED) {
                Mutex.getInstance().unlock(currencyMutexID);
            }

            throw new Error(`Failed to update currency: ${error.message}`);
        }
    }

    // 保存资源到本地存储
    private saveResources(currency: Currency) {
        try {
            console.info("set %s resources %s", storageCurrencyID, JSON.stringify(currency));
            localStorage.setItem(storageCurrencyID, JSON.stringify(currency));
        } catch (error) {
            console.error("save %s resources failed, error: %s", storageCurrencyID, error.message);
            throw new Error(`Failed to save currency: ${error.message}`);
        }
    }
}