// 自定义错误码结构体
export class VisibleError extends Error {
    // 错误码
    code: string;

    constructor(code: string, message: string) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
    }
}

// 错误码定义
export const ERROR_CODES = {
    // 加锁失败
    LOCK_FAILED: "LOCK_FAILED"
};