import { VisibleError, ERROR_CODES } from "./errors";

// 互斥锁
export class Mutex {
    // 互斥锁实例
    private static instance: Mutex;
    // 锁map
    private static locks: Map<string, boolean> = new Map();

    // 获取互斥锁单例
    public static getInstance(): Mutex {
        if (!Mutex.instance) {
            Mutex.instance = new Mutex();
        }

        return Mutex.instance;
    }

    // 锁函数，使用资源ID进行加锁
    public lock(resourceId: string): void {
        // 如果已经加锁，直接报错
        if (Mutex.locks.get(resourceId)) {
            // 锁已经被占用，抛出错误
            throw new VisibleError(ERROR_CODES.LOCK_FAILED, `Mutex lock failed: resource ${resourceId} is already locked`);
        }

        // 设置锁
        const wasLocked = Mutex.locks.set(resourceId, true).get(resourceId);
        if (!wasLocked) {
            // 如果设置锁失败，抛出错误
            throw new VisibleError(ERROR_CODES.LOCK_FAILED, `Mutex lock failed: resource ${resourceId} could not be locked`);
        }
    }

    // 解锁函数
    public unlock(resourceId: string): void {
        if (!Mutex.locks.has(resourceId)) {
            return;
        }
        Mutex.locks.set(resourceId, false);
    }
}